/* Blend and Seek — multiplayer hide-and-seek server.
   Static client in public/. Rooms with 6-char codes, host-started rounds:
   lobby -> hide (30s, hiders paint+hide, seekers frozen) -> seek (150s)
   -> over. Tagged hiders become seekers. */
'use strict';
const express = require('express');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.get('/health', (req, res) => res.send('ok'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const ARENA_HALF = 28;
const HIDE_TIME = +(process.env.HIDE_TIME || 30);
const SEEK_TIME = +(process.env.SEEK_TIME || 150);
const TAG_RANGE = 5;
const TAG_COS = Math.cos(Math.PI / 3); // ~60 degree cone
const TICK_MS = 66;
const MAX_SPEED = 14; // m/s anti-teleport cap

const rooms = new Map();
let nextId = 1;

function makeCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let c;
  do {
    c = Array.from({ length: 6 }, () => chars[(Math.random() * chars.length) | 0]).join('');
  } while (rooms.has(c));
  return c;
}

function spawn() {
  return { x: (Math.random() * 2 - 1) * 20, z: (Math.random() * 2 - 1) * 20, ry: Math.random() * Math.PI * 2 };
}

function snap(room) {
  return {
    t: 'room',
    code: room.code,
    phase: room.phase,
    endsAt: room.endsAt,
    players: [...room.players.values()].map(p => ({
      id: p.id, name: p.name, x: +p.x.toFixed(2), z: +p.z.toFixed(2), ry: +p.ry.toFixed(2),
      color: p.color, pattern: p.pattern, role: p.role, host: p.host
    }))
  };
}

function broadcast(room, msg, except) {
  const s = JSON.stringify(msg);
  for (const p of room.players.values()) {
    if (p.ws !== except && p.ws.readyState === WebSocket.OPEN) p.ws.send(s);
  }
}

function setPhase(room, phase, secs) {
  if (room.timer) { clearTimeout(room.timer); room.timer = null; }
  room.phase = phase;
  room.endsAt = secs ? Date.now() + secs * 1000 : 0;
  if (phase === 'hide') {
    // freeze seekers, scatter everyone
    for (const p of room.players.values()) {
      const s = spawn();
      p.x = s.x; p.z = s.z; p.ry = s.ry;
    }
    room.timer = setTimeout(() => setPhase(room, 'seek', SEEK_TIME), HIDE_TIME * 1000);
  } else if (phase === 'seek') {
    room.timer = setTimeout(() => endRound(room, 'hiders'), SEEK_TIME * 1000);
  }
  broadcast(room, { t: 'phase', phase, endsAt: room.endsAt });
  broadcast(room, snap(room));
}

function startRound(room) {
  const ps = [...room.players.values()];
  if (ps.length < 2) return;
  // assign roles: 1 seeker per 4 players, at least 1
  const shuffled = ps.slice().sort(() => Math.random() - 0.5);
  const nSeekers = Math.max(1, Math.floor(ps.length / 4));
  shuffled.forEach((p, i) => {
    p.role = i < nSeekers ? 'seeker' : 'hider';
    p.color = p.role === 'seeker' ? '#e23b3b' : '#ffffff';
    p.pattern = 'solid';
  });
  setPhase(room, 'hide', HIDE_TIME);
}

function endRound(room, winners) {
  if (room.timer) { clearTimeout(room.timer); room.timer = null; }
  room.phase = 'over';
  room.endsAt = 0;
  broadcast(room, { t: 'over', winners });
  broadcast(room, snap(room));
  // back to lobby after a breather
  room.timer = setTimeout(() => {
    room.timer = null;
    room.phase = 'lobby';
    for (const p of room.players.values()) { p.role = 'hider'; p.color = '#ffffff'; p.pattern = 'solid'; }
    broadcast(room, { t: 'phase', phase: 'lobby', endsAt: 0 });
    broadcast(room, snap(room));
  }, 8000);
}

function checkWin(room) {
  if (room.phase !== 'seek') return;
  const hiders = [...room.players.values()].filter(p => p.role === 'hider');
  if (hiders.length === 0) endRound(room, 'seekers');
}

function handleTag(room, seeker) {
  if (room.phase !== 'seek' || seeker.role !== 'seeker') return;
  let best = null, bestD = TAG_RANGE;
  const fx = Math.sin(seeker.ry), fz = Math.cos(seeker.ry);
  for (const p of room.players.values()) {
    if (p.role !== 'hider' || p.id === seeker.id) continue;
    const dx = p.x - seeker.x, dz = p.z - seeker.z;
    const d = Math.hypot(dx, dz);
    if (d > bestD || d < 0.5) continue;
    const dot = (dx * fx + dz * fz) / (d || 1);
    if (dot < TAG_COS) continue;
    best = p; bestD = d;
  }
  if (best) {
    best.role = 'seeker';
    best.color = '#e23b3b';
    best.pattern = 'solid';
    broadcast(room, { t: 'tagged', id: best.id, by: seeker.id });
    broadcast(room, snap(room));
    checkWin(room);
  }
}

function cleanupRoom(room) {
  if (room.timer) clearTimeout(room.timer);
  if (room.tick) clearInterval(room.tick);
  rooms.delete(room.code);
}

wss.on('connection', ws => {
  let player = null, room = null;
  let lastMove = 0;

  ws.on('message', raw => {
    let m;
    try { m = JSON.parse(raw); } catch (e) { return; }

    if (m.t === 'join') {
      const code = (m.room || '').toUpperCase().trim();
      const name = String(m.name || 'Player').slice(0, 16) || 'Player';
      room = code ? rooms.get(code) : null;
      if (code && !room) { ws.send(JSON.stringify({ t: 'error', msg: 'Room not found' })); return; }
      if (!room) {
        room = { code: makeCode(), players: new Map(), phase: 'lobby', endsAt: 0, timer: null, tick: null };
        rooms.set(room.code, room);
        room.tick = setInterval(() => {
          if (room.phase === 'hide' || room.phase === 'seek') {
            broadcast(room, { t: 'tick', left: Math.max(0, Math.ceil((room.endsAt - Date.now()) / 1000)) });
          }
          // position sync
          broadcast(room, {
            t: 'players',
            p: [...room.players.values()].map(p => [p.id, +p.x.toFixed(2), +p.z.toFixed(2), +p.ry.toFixed(2), p.color, p.pattern, p.role])
          });
        }, TICK_MS);
      }
      if (room.players.size >= 12) { ws.send(JSON.stringify({ t: 'error', msg: 'Room is full' })); return; }
      const s = spawn();
      player = {
        id: nextId++, name, ws, x: s.x, z: s.z, ry: s.ry,
        color: '#ffffff', pattern: 'solid', role: 'hider',
        host: room.players.size === 0, lastX: s.x, lastZ: s.z, lastT: Date.now()
      };
      room.players.set(player.id, player);
      ws.send(JSON.stringify({ t: 'welcome', id: player.id, code: room.code, host: player.host }));
      broadcast(room, snap(room));
      return;
    }

    if (!player || !room) return;

    if (m.t === 'move') {
      if (room.phase === 'hide' && player.role === 'seeker') return; // seekers frozen while hiders hide
      if (room.phase !== 'hide' && room.phase !== 'seek') return;
      const now = Date.now();
      let x = +m.x, z = +m.z;
      if (!isFinite(x) || !isFinite(z)) return;
      x = Math.max(-ARENA_HALF, Math.min(ARENA_HALF, x));
      z = Math.max(-ARENA_HALF, Math.min(ARENA_HALF, z));
      // anti-teleport: cap speed
      const dt = Math.max(1, now - player.lastT) / 1000;
      const dx = x - player.lastX, dz = z - player.lastZ;
      const dist = Math.hypot(dx, dz);
      if (dist > MAX_SPEED * dt) {
        const k = (MAX_SPEED * dt) / dist;
        x = player.lastX + dx * k;
        z = player.lastZ + dz * k;
      }
      player.x = x; player.z = z;
      if (isFinite(+m.ry)) player.ry = +m.ry;
      player.lastX = x; player.lastZ = z; player.lastT = now;
      lastMove = now;
      return;
    }

    if (m.t === 'paint') {
      if (player.role !== 'hider') return;
      const c = String(m.color || '#ffffff');
      if (!/^#[0-9a-fA-F]{6}$/.test(c)) return;
      const pat = ['solid', 'stripes', 'spots'].includes(m.pattern) ? m.pattern : 'solid';
      player.color = c; player.pattern = pat;
      broadcast(room, { t: 'paint', id: player.id, color: c, pattern: pat });
      return;
    }

    if (m.t === 'tag') { handleTag(room, player); return; }

    if (m.t === 'start') {
      if (!player.host || room.phase !== 'lobby') return;
      if (room.players.size < 2) { ws.send(JSON.stringify({ t: 'error', msg: 'Need at least 2 players' })); return; }
      startRound(room);
      return;
    }
  });

  ws.on('close', () => {
    if (!room || !player) return;
    room.players.delete(player.id);
    // host passes to someone else
    if (player.host && room.players.size) {
      const next = [...room.players.values()][0];
      next.host = true;
      next.ws.send(JSON.stringify({ t: 'welcome', id: next.id, code: room.code, host: true }));
    }
    if (room.players.size === 0) { cleanupRoom(room); return; }
    if (room.phase === 'seek' || room.phase === 'hide') {
      // if no hiders left, seekers win; if <2 players, back to lobby
      if (room.players.size < 2) {
        if (room.timer) { clearTimeout(room.timer); room.timer = null; }
        room.phase = 'lobby'; room.endsAt = 0;
        broadcast(room, { t: 'phase', phase: 'lobby', endsAt: 0 });
      } else checkWin(room);
    }
    broadcast(room, snap(room));
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('Blend and Seek on :' + PORT));
