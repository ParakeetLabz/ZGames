/* Z Games — player page */
(() => {
  const id = new URLSearchParams(location.search).get('id');
  const title = document.getElementById('gameTitle');
  const frame = document.getElementById('frame');
  const stage = document.getElementById('stage');
  const newTab = document.getElementById('newTab');
  const more = document.getElementById('more');

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const t0 = Date.now();
  function hideLoader() {
    const el = document.getElementById('loader');
    if (!el || el.classList.contains('done')) return;
    setTimeout(() => el.classList.add('done'), Math.max(0, 900 - (Date.now() - t0)));
  }
  frame.addEventListener('load', hideLoader);

  function iconFor(g, cls) {
    if (g.icon) return `<img class="${cls}" src="${esc(g.icon)}" alt="" loading="lazy">`;
    const ch = esc((g.title || '?').trim().charAt(0).toUpperCase() || '?');
    return `<div class="${cls} icon-fallback" aria-hidden="true">${ch}</div>`;
  }

  async function loadGames() {
    // Supabase first (managed in the admin panel), games.json as fallback.
    try {
      const cfg = window.ZG_SUPABASE || {};
      if (cfg.url && cfg.anonKey && window.supabase) {
        const sb = window.supabase.createClient(cfg.url, cfg.anonKey);
        const { data, error } = await sb.from('games').select('*').order('created_at');
        if (!error && data && data.length) return data;
      }
    } catch (e) {}
    const r = await fetch('games.json', { cache: 'no-store' });
    const data = await r.json();
    return Array.isArray(data) ? data : [];
  }

  function isNew(g) {
    if (!g.created_at) return false;
    const t = new Date(g.created_at).getTime();
    return !isNaN(t) && (Date.now() - t) < 7 * 24 * 60 * 60 * 1000;
  }

  function tagPills(g) {
    const tags = String(g.tags || '').split(/[,\s]+/).map(t => t.replace(/^#+/, '').trim())
      .filter(t => t.length > 0 && t.length <= 20);
    return tags.length
      ? `<div class="tag-pills">${tags.map(t => `<span class="tag-pill">#${esc(t)}</span>`).join('')}</div>`
      : '';
  }

  loadGames()
    .then(games => {
      const game = games.find(g => g.id === id);
      if (!game) {
        title.textContent = 'Game not found';
        stage.innerHTML = `<div class="no-results">This game no longer exists. <a href="hub.html">Back to hub</a></div>`;
        hideLoader();
        return;
      }
      title.textContent = game.title;
      // remember this game for the hub's "Continue playing" row
      try {
        const k = 'zg_recent';
        const a = JSON.parse(localStorage.getItem(k) || '[]').filter(x => x !== game.id);
        a.unshift(game.id);
        localStorage.setItem(k, JSON.stringify(a.slice(0, 8)));
      } catch (e) {}
      setupLoaderIcon(game);
      frame.src = game.url;
      if (/^https?:/i.test(game.url)) { newTab.href = game.url; newTab.hidden = false; }
      setupServers(game);
      more.innerHTML = games.filter(g => g.id !== game.id).slice(0, 8).map(g =>
        `<a class="card" href="play.html?id=${encodeURIComponent(g.id)}">${isNew(g) ? '<span class="new-badge">NEW</span>' : ''}${iconFor(g, 'card-icon')}<div class="card-title">${esc(g.title)}</div>${tagPills(g)}</a>`
      ).join('');
    })
    .catch(() => { title.textContent = 'Could not load game'; hideLoader(); });

  function setupLoaderIcon(game) {
    const wrap = document.getElementById('loaderIconWrap');
    if (!wrap || wrap.dataset.done) return;
    wrap.dataset.done = '1';
    let el;
    if (game.icon) {
      el = document.createElement('img');
      el.className = 'lic-img';
      el.alt = '';
      el.src = game.icon;
    } else {
      el = document.createElement('div');
      el.className = 'lic-letter';
      el.textContent = (game.title || '?').trim().charAt(0).toUpperCase() || '?';
    }
    wrap.prepend(el);
    // wacky random loader flavor + silly loading line, picked once per visit
    const loader = document.getElementById('loader');
    if (loader && !loader.dataset.flv) {
      loader.dataset.flv = '1';
      const flavors = ['flv-spin', 'flv-orbit', 'flv-sproing', 'flv-rave'];
      loader.classList.add(flavors[Math.floor(Math.random() * flavors.length)]);
      const lines = ['LOADING', 'WARMING UP PIXELS', 'SUMMONING GAMES',
        'BRIBING THE SERVERS', 'CHARGING THE Z', 'HERDING PIXELS',
        'DEFRAGMENTING FUN', 'INFLATING SPRITES',
        'POLISHING THE CONTROLLERS', 'TEACHING Z NEW TRICKS'];
      const sub = loader.querySelector('.loader-sub');
      if (sub) sub.textContent = lines[Math.floor(Math.random() * lines.length)];
    }
  }

  function setupServers(game) {
    const list = [{ name: 'Server 1', url: game.url }];
    (game.servers || []).forEach((s, i) => {
      const url = typeof s === 'string' ? s.trim() : (s && s.url);
      if (!url) return;
      list.push({ name: (s && s.name) || ('Server ' + (list.length + 1)), url });
    });
    if (list.length < 2) return;
    const bar = document.getElementById('serverBar');
    bar.hidden = false;
    const label = document.createElement('span');
    label.className = 'srv-label';
    label.textContent = 'Servers:';
    bar.appendChild(label);
    list.forEach((sv, i) => {
      const b = document.createElement('button');
      b.className = 'chip' + (i === 0 ? ' active' : '');
      b.textContent = sv.name;
      b.onclick = () => {
        bar.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        b.classList.add('active');
        const loader = document.getElementById('loader');
        if (loader) loader.classList.remove('done');
        frame.src = sv.url;
        if (/^https?:/i.test(sv.url)) { newTab.href = sv.url; newTab.hidden = false; }
      };
      bar.appendChild(b);
    });
  }

  document.getElementById('fsBtn').addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (stage.requestFullscreen) stage.requestFullscreen();
  });
})();
