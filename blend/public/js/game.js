/* Blend and Seek — 3D client (Three.js). Hide-and-seek with paint-to-blend. */
import * as THREE from 'three';

const $ = id => document.getElementById(id);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const IS_TOUCH = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

const PALETTE = ['#e23b3b', '#f08c2e', '#f5d020', '#37c26a', '#2e9df0', '#8b5cf6', '#ec6fb5', '#f5f0e6', '#7a4a21'];
const TAG_RANGE = 5;

/* ---------------- network ---------------- */
let ws = null, myId = 0, myCode = '', isHost = false, myName = 'Player';
let phase = 'menu', endsAt = 0, timeLeft = 0;
const players = new Map(); // id -> {id,name,x,z,ry,color,pattern,role,host,tx,tz,try_}

function connect(room, name) {
  const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
  ws = new WebSocket(proto + '//' + location.host + '/ws');
  ws.onopen = () => ws.send(JSON.stringify({ t: 'join', room, name }));
  ws.onmessage = ev => {
    let m;
    try { m = JSON.parse(ev.data); } catch (e) { return; }
    onMsg(m);
  };
  ws.onclose = () => { $('menuMsg').textContent = 'Connection lost. Reload to rejoin.'; show('menu'); };
}

function send(o) { if (ws && ws.readyState === 1) ws.send(JSON.stringify(o)); }

function onMsg(m) {
  if (m.t === 'error') { $('menuMsg').textContent = m.msg; $('lobbyMsg').textContent = m.msg; return; }
  if (m.t === 'welcome') { myId = m.id; myCode = m.code; isHost = m.host; history.replaceState(null, '', '?room=' + m.code); }
  if (m.t === 'room') syncRoom(m);
  if (m.t === 'players') {
    for (const [id, x, z, ry, color, pattern, role] of m.p) {
      const p = players.get(id);
      if (!p) continue;
      p.tx = x; p.tz = z; p.try_ = ry;
      if (p.color !== color || p.pattern !== pattern || p.role !== role) {
        p.color = color; p.pattern = pattern; p.role = role;
        if (id !== myId) paintAvatar(p, color, pattern, role);
      }
    }
  }
  if (m.t === 'paint') {
    const p = players.get(m.id);
    if (p && m.id !== myId) { p.color = m.color; p.pattern = m.pattern; paintAvatar(p, m.color, m.pattern, p.role); }
  }
  if (m.t === 'phase') setPhase(m.phase, m.endsAt);
  if (m.t === 'tick') timeLeft = m.left;
  if (m.t === 'tagged') {
    const p = players.get(m.id);
    if (p) { p.role = 'seeker'; p.color = '#e23b3b'; p.pattern = 'solid'; if (m.id !== myId) paintAvatar(p, p.color, p.pattern, 'seeker'); }
    refreshRoleUI();
  }
  if (m.t === 'over') showOver(m.winners);
}

/* ---------------- three.js setup ---------------- */
const canvas = $('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
const scene = new THREE.Scene();
scene.background = new THREE.Color('#9fd3ff');
scene.fog = new THREE.Fog('#9fd3ff', 45, 120);
const camera = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.1, 300);

scene.add(new THREE.HemisphereLight('#eaf6ff', '#5a6b4a', 1.05));
const sun = new THREE.DirectionalLight('#ffffff', 1.6);
sun.position.set(30, 50, 20);
scene.add(sun);

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

/* ---------------- arena ---------------- */
const ARENA = 60, HALF = 28;
const ZONE_COLORS = ['#e23b3b', '#f08c2e', '#f5d020', '#37c26a', '#2e9df0', '#8b5cf6', '#ec6fb5', '#f5f0e6', '#37c26a'];
(function buildArena() {
  const T = 20;
  for (let gx = 0; gx < 3; gx++) for (let gz = 0; gz < 3; gz++) {
    const col = ZONE_COLORS[(gx * 3 + gz) % ZONE_COLORS.length];
    const tile = new THREE.Mesh(
      new THREE.BoxGeometry(T, 0.2, T),
      new THREE.MeshLambertMaterial({ color: col })
    );
    tile.position.set((gx - 1) * T, -0.1, (gz - 1) * T);
    tile.receiveShadow = false;
    scene.add(tile);
    // props in matching colors
    const n = 2 + ((gx * 7 + gz * 3) % 2);
    for (let i = 0; i < n; i++) {
      const w = 1.5 + Math.random() * 2.5, h = 1.5 + Math.random() * 3, d = 1.5 + Math.random() * 2.5;
      const geo = Math.random() < 0.4
        ? new THREE.CylinderGeometry(w / 2, w / 2, h, 12)
        : new THREE.BoxGeometry(w, h, d);
      const prop = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color: col }));
      const px = (gx - 1) * T + (Math.random() * 2 - 1) * 7;
      const pz = (gz - 1) * T + (Math.random() * 2 - 1) * 7;
      if (Math.hypot(px, pz) < 5) continue; // keep center clear
      prop.position.set(px, h / 2, pz);
      prop.rotation.y = Math.random() * Math.PI;
      scene.add(prop);
    }
  }
  // perimeter walls
  const wallMat = new THREE.MeshLambertMaterial({ color: '#3a4a63' });
  const wallGeoX = new THREE.BoxGeometry(ARENA + 2, 6, 1);
  const wallGeoZ = new THREE.BoxGeometry(1, 6, ARENA + 2);
  [[0, -ARENA / 2, wallGeoX], [0, ARENA / 2, wallGeoX], [-ARENA / 2, 0, wallGeoZ], [ARENA / 2, 0, wallGeoZ]]
    .forEach(([x, z, g]) => {
      const w = new THREE.Mesh(g, wallMat);
      w.position.set(x, 3, z);
      scene.add(w);
    });
})();

/* ---------------- avatars ---------------- */
function patternTexture(color, pattern) {
  if (pattern === 'solid') return null;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = '#ffffff';
  g.fillRect(0, 0, 128, 128);
  g.fillStyle = color;
  if (pattern === 'stripes') {
    for (let i = -128; i < 256; i += 32) {
      g.save(); g.translate(i, 64); g.rotate(Math.PI / 4);
      g.fillRect(-8, -160, 16, 320); g.restore();
    }
  } else {
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 26; i++) {
      g.beginPath();
      g.arc(rnd() * 128, rnd() * 128, 5 + rnd() * 11, 0, 7);
      g.fill();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function nameSprite(name) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 64;
  const g = c.getContext('2d');
  g.font = 'bold 30px system-ui, sans-serif';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.lineWidth = 6; g.strokeStyle = 'rgba(0,0,0,.55)';
  g.strokeText(name, 128, 32);
  g.fillStyle = '#fff';
  g.fillText(name, 128, 32);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: true, transparent: true }));
  sp.scale.set(2.6, 0.65, 1);
  sp.position.y = 2.45;
  return sp;
}

function makeAvatar(p) {
  const grp = new THREE.Group();
  const mat = new THREE.MeshLambertMaterial({ color: p.color });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.45, 0.9, 6, 14), mat);
  body.position.y = 1.05;
  body.userData.pid = p.id;
  grp.add(body);
  if (p.id !== myId) grp.add(nameSprite(p.name));
  grp.position.set(p.x, 0, p.z);
  scene.add(grp);
  p.grp = grp; p.body = body;
  paintAvatar(p, p.color, p.pattern, p.role);
}

function paintAvatar(p, color, pattern, role) {
  if (!p.body) return;
  const mat = p.body.material;
  if (mat.map) { mat.map.dispose(); mat.map = null; }
  mat.map = patternTexture(color, pattern);
  mat.color.set(role === 'seeker' ? '#e23b3b' : color);
  mat.needsUpdate = true;
}

function removeAvatar(p) {
  if (p.grp) { scene.remove(p.grp); p.grp = null; p.body = null; }
}

function syncRoom(m) {
  const seen = new Set();
  for (const s of m.players) {
    seen.add(s.id);
    let p = players.get(s.id);
    if (!p) {
      p = { ...s, tx: s.x, tz: s.z, try_: s.ry };
      players.set(s.id, p);
      makeAvatar(p);
    } else {
      Object.assign(p, { name: s.name, color: s.color, pattern: s.pattern, role: s.role, host: s.host });
      p.tx = s.x; p.tz = s.z; p.try_ = s.ry;
      if (s.id !== myId) paintAvatar(p, s.color, s.pattern, s.role);
      else paintAvatar(p, s.color, s.pattern, s.role);
    }
  }
  for (const [id, p] of players) if (!seen.has(id)) { removeAvatar(p); players.delete(id); }
  renderLobby(m.players);
  refreshRoleUI();
}

/* ---------------- input ---------------- */
const keys = {};
addEventListener('keydown', e => { keys[e.key.toLowerCase()] = true; });
addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

let camYaw = 0, camPitch = 0.42;
let dragging = false, lastPX = 0, lastPY = 0;
canvas.addEventListener('pointerdown', e => {
  if (phase !== 'seek' && phase !== 'hide') return;
  dragging = true; lastPX = e.clientX; lastPY = e.clientY;
});
addEventListener('pointermove', e => {
  if (!dragging) return;
  camYaw -= (e.clientX - lastPX) * 0.005;
  camPitch = clamp(camPitch + (e.clientY - lastPY) * 0.004, 0.08, 1.1);
  lastPX = e.clientX; lastPY = e.clientY;
});
addEventListener('pointerup', () => dragging = false);
canvas.oncontextmenu = e => e.preventDefault();

// desktop click = tag attempt (seekers)
canvas.addEventListener('click', () => {
  const me = players.get(myId);
  if (me && me.role === 'seeker' && phase === 'seek' && !IS_TOUCH) tryTag();
});

// mobile joystick + look-drag
const joy = { x: 0, y: 0, id: null };
const draggingLook = { id: null, x: 0, y: 0 };
if (IS_TOUCH) {
  const joyEl = $('joy'), stick = $('stick');
  joyEl.hidden = false;
  $('lookHint').hidden = false;
  const R = 44;
  joyEl.addEventListener('touchstart', e => { joy.id = e.changedTouches[0].identifier; e.preventDefault(); }, { passive: false });
  addEventListener('touchmove', e => {
    for (const t of e.changedTouches) {
      if (t.identifier === joy.id) {
        const r = joyEl.getBoundingClientRect();
        let dx = t.clientX - (r.left + r.width / 2), dy = t.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / R);
        dx = dx / d * k; dy = dy / d * k;
        joy.x = dx; joy.y = dy;
        stick.style.transform = `translate(calc(-50% + ${dx * R}px), calc(-50% + ${dy * R}px))`;
      } else if (t.identifier === draggingLook.id) {
        camYaw -= (t.clientX - draggingLook.x) * 0.007;
        camPitch = clamp(camPitch + (t.clientY - draggingLook.y) * 0.006, 0.08, 1.1);
        draggingLook.x = t.clientX; draggingLook.y = t.clientY;
      }
    }
  }, { passive: true });
  addEventListener('touchend', e => {
    for (const t of e.changedTouches) {
      if (t.identifier === joy.id) { joy.id = null; joy.x = joy.y = 0; stick.style.transform = 'translate(-50%,-50%)'; }
      if (t.identifier === draggingLook.id) draggingLook.id = null;
    }
  });
  // look = touch starting on right side of screen (not on joystick/buttons)
  canvas.addEventListener('touchstart', e => {
    for (const t of e.changedTouches) {
      if (t.clientX > innerWidth * 0.4 && draggingLook.id === null) {
        draggingLook.id = t.identifier; draggingLook.x = t.clientX; draggingLook.y = t.clientY;
      }
    }
  }, { passive: true });
}

/* ---------------- tagging ---------------- */
const ray = new THREE.Raycaster();
function tryTag() {
  const me = players.get(myId);
  if (!me || me.role !== 'seeker' || phase !== 'seek') return;
  ray.setFromCamera({ x: 0, y: 0 }, camera);
  const meshes = [];
  for (const p of players.values()) {
    if (p.id !== myId && p.role === 'hider' && p.body) meshes.push(p.body);
  }
  const hits = ray.intersectObjects(meshes, false);
  if (hits.length && hits[0].distance <= TAG_RANGE + 1.5) send({ t: 'tag' });
}
$('tagBtn').addEventListener('click', tryTag);

/* ---------------- paint UI ---------------- */
let myColor = '#ffffff', myPattern = 'solid';
(function buildSwatches() {
  const box = $('swatches');
  for (const c of PALETTE) {
    const d = document.createElement('div');
    d.className = 'sw' + (c === myColor ? ' sel' : '');
    d.style.background = c;
    d.onclick = () => setPaint(c, myPattern);
    box.appendChild(d);
  }
  $('customColor').oninput = e => setPaint(e.target.value, myPattern);
  document.querySelectorAll('.patbtn').forEach(b =>
    b.onclick = () => setPaint(myColor, b.dataset.pat));
})();
function setPaint(color, pattern) {
  myColor = color; myPattern = pattern;
  document.querySelectorAll('.sw').forEach(s => s.classList.toggle('sel', s.style.background === '' || rgbToHex(s.style.background) === color));
  document.querySelectorAll('.patbtn').forEach(b => b.classList.toggle('active', b.dataset.pat === pattern));
  const me = players.get(myId);
  if (me) { me.color = color; me.pattern = pattern; paintAvatar(me, color, pattern, me.role); }
  send({ t: 'paint', color, pattern });
}
function rgbToHex(rgb) {
  const m = rgb.match(/\d+/g);
  if (!m) return rgb;
  return '#' + m.slice(0, 3).map(n => (+n).toString(16).padStart(2, '0')).join('');
}

/* ---------------- screens & HUD ---------------- */
function show(id) {
  for (const s of ['menu', 'lobby', 'over']) $(s).hidden = s !== id;
  if (id) $('hud').hidden = true;
}
function setPhase(ph, ends) {
  phase = ph; endsAt = ends || 0;
  timeLeft = ends ? Math.max(0, Math.ceil((ends - Date.now()) / 1000)) : 0;
  const me = players.get(myId);
  if (ph === 'lobby') { show('lobby'); $('over').hidden = true; }
  else {
    show(null);
    $('hud').hidden = false;
    const msg = $('phaseMsg');
    if (ph === 'hide') {
      if (me && me.role === 'seeker') {
        msg.hidden = false;
        msg.innerHTML = '🔍 <b>Hiders are hiding…</b><br>Stay sharp — you move soon.';
      } else {
        msg.hidden = false;
        msg.innerHTML = '🖌️ <b>HIDE!</b> Paint yourself to match the arena, then freeze.';
        setTimeout(() => { if (phase === 'hide') msg.hidden = true; }, 5000);
      }
    } else if (ph === 'seek') {
      msg.hidden = false;
      msg.innerHTML = me && me.role === 'seeker' ? '🔍 <b>Find them!</b> Aim + click / TAG.' : '🏃 <b>Run / blend in!</b> Don\'t get tagged.';
      setTimeout(() => { if (phase === 'seek') msg.hidden = true; }, 4000);
    }
  }
  refreshRoleUI();
}
function refreshRoleUI() {
  const me = players.get(myId);
  const banner = $('roleBanner');
  if (!me || $('hud').hidden) return;
  const seeker = me.role === 'seeker';
  banner.textContent = seeker ? '🔍 SEEKER' : '🖌️ HIDER';
  banner.className = 'role-banner ' + (seeker ? 'seeker' : 'hider');
  $('crosshair').hidden = !(seeker && phase === 'seek');
  $('tagBtn').hidden = !(seeker && phase === 'seek' && IS_TOUCH);
  $('paintPanel').hidden = seeker || phase === 'lobby' || phase === 'menu';
}
function renderLobby(list) {
  $('lobbyCode').textContent = myCode;
  $('lobbyList').innerHTML = list.map(p =>
    `<div class="prow"><span class="pdot" style="background:${p.color}"></span>${escapeHtml(p.name)}${p.host ? '<span class="host">HOST</span>' : ''}</div>`
  ).join('');
  $('startBtn').hidden = !isHost;
  $('lobbyMsg').textContent = isHost ? 'You are the host — start when ready.' : 'Waiting for the host to start…';
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function showOver(winners) {
  $('overTitle').textContent = winners === 'seekers' ? '🔍 Seekers win!' : '🖌️ Hiders win!';
  $('overSub').textContent = winners === 'seekers' ? 'Every hider got found.' : 'They stayed hidden till the end.';
  $('over').hidden = false;
  $('hud').hidden = true;
}

$('joinBtn').onclick = () => {
  myName = $('nameInput').value.trim() || 'Player';
  const room = $('roomInput').value.trim().toUpperCase();
  $('menuMsg').textContent = 'Connecting…';
  show(null);
  connect(room, myName);
  setTimeout(() => { if (phase === 'menu') { show('lobby'); } }, 600);
};
$('startBtn').onclick = () => send({ t: 'start' });
$('againBtn').onclick = () => { $('over').hidden = true; };
// prefill room from URL
try {
  const r = new URLSearchParams(location.search).get('room');
  if (r) $('roomInput').value = r.toUpperCase();
} catch (e) {}

/* ---------------- main loop ---------------- */
const clock = new THREE.Clock();
let sendAcc = 0;
const SPEED = { hider: 6, seeker: 6.6 };

function meFrozen() {
  const me = players.get(myId);
  return !me || phase === 'lobby' || phase === 'over' || phase === 'menu' || (phase === 'hide' && me.role === 'seeker');
}

function update(dt) {
  // menu backdrop: slow orbit over the arena
  if (phase === 'menu' && !players.get(myId)) {
    const t = performance.now() / 1000 * 0.12;
    camera.position.set(Math.sin(t) * 42, 24, Math.cos(t) * 42);
    camera.lookAt(0, 1, 0);
    return;
  }
  const me = players.get(myId);
  if (me && me.grp) {
    // input direction (camera-relative)
    let ix = 0, iz = 0;
    if (keys['w'] || keys['arrowup']) iz -= 1;
    if (keys['s'] || keys['arrowdown']) iz += 1;
    if (keys['a'] || keys['arrowleft']) ix -= 1;
    if (keys['d'] || keys['arrowright']) ix += 1;
    ix += joy.x; iz += joy.y;
    const len = Math.hypot(ix, iz);
    if (len > 1) { ix /= len; iz /= len; }
    if (!meFrozen() && len > 0.05) {
      const sp = (me.role === 'seeker' ? SPEED.seeker : SPEED.hider) * dt;
      const sin = Math.sin(camYaw), cos = Math.cos(camYaw);
      me.x = clamp(me.x + (ix * cos - iz * sin) * sp, -HALF, HALF);
      me.z = clamp(me.z + (ix * sin + iz * cos) * sp, -HALF, HALF);
      me.ry = Math.atan2(ix * cos - iz * sin, ix * sin + iz * cos);
      me.grp.position.set(me.x, 0, me.z);
      me.grp.rotation.y = me.ry;
    }
    // camera follow
    const cd = 7.5, ch = 3.4;
    const cx = me.x - Math.sin(camYaw) * Math.cos(camPitch) * cd;
    const cz = me.z - Math.cos(camYaw) * Math.cos(camPitch) * cd;
    const cy = ch + Math.sin(camPitch) * cd;
    camera.position.set(clamp(cx, -HALF - 1, HALF + 1), cy, clamp(cz, -HALF - 1, HALF + 1));
    camera.lookAt(me.x, 1.6, me.z);
    // send movement
    sendAcc += dt;
    if (sendAcc > 0.066 && !meFrozen()) {
      sendAcc = 0;
      send({ t: 'move', x: +me.x.toFixed(2), z: +me.z.toFixed(2), ry: +me.ry.toFixed(2) });
    }
  }
  // interpolate remotes
  for (const p of players.values()) {
    if (p.id === myId || !p.grp) continue;
    p.x += (p.tx - p.x) * Math.min(1, dt * 10);
    p.z += (p.tz - p.z) * Math.min(1, dt * 10);
    let dr = p.try_ - p.ry;
    while (dr > Math.PI) dr -= Math.PI * 2;
    while (dr < -Math.PI) dr += Math.PI * 2;
    p.ry += dr * Math.min(1, dt * 10);
    p.grp.position.set(p.x, 0, p.z);
    p.grp.rotation.y = p.ry;
  }
  // timer
  if (endsAt) {
    const left = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
    if (Math.abs(left - timeLeft) > 1) timeLeft = left;
    const mm = (timeLeft / 60) | 0, ss = ('' + (timeLeft % 60)).padStart(2, '0');
    $('timer').textContent = mm + ':' + ss;
    $('timer').style.color = timeLeft <= 10 ? '#ff7b7b' : '';
  }
}

renderer.setAnimationLoop(() => {
  const dt = Math.min(0.05, clock.getDelta());
  update(dt);
  renderer.render(scene, camera);
});
