/* Z Games hub — home page */
(() => {
  const grid = document.getElementById('grid');
  const chips = document.getElementById('chips');
  const search = document.getElementById('search');
  let games = [];
  let activeCat = 'All';
  let query = '';

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function iconFor(g, cls) {
    if (g.icon) return `<img class="${cls}" src="${esc(g.icon)}" alt="" loading="lazy">`;
    const ch = esc((g.title || '?').trim().charAt(0).toUpperCase() || '?');
    return `<div class="${cls} icon-fallback" aria-hidden="true">${ch}</div>`;
  }

  function categories() {
    const set = new Set(['All']);
    games.forEach(g => { if (g.category) set.add(g.category); });
    return [...set];
  }

  function renderChips() {
    chips.innerHTML = categories().map(c =>
      `<button class="chip${c === activeCat ? ' active' : ''}" data-cat="${esc(c)}">${esc(c)}</button>`
    ).join('');
    chips.querySelectorAll('.chip').forEach(b =>
      b.addEventListener('click', () => { activeCat = b.dataset.cat; render(); }));
  }

  function isNew(g) {
    if (!g.created_at) return false;
    const t = new Date(g.created_at).getTime();
    return !isNaN(t) && (Date.now() - t) < 7 * 24 * 60 * 60 * 1000;
  }

  function tagsOf(g) {
    return String(g.tags || '').split(/[,\s]+/).map(t => t.replace(/^#+/, '').trim())
      .filter(t => t.length > 0 && t.length <= 20);
  }

  function tagPills(g) {
    const tags = tagsOf(g);
    return tags.length
      ? `<div class="tag-pills">${tags.map(t => `<span class="tag-pill">#${esc(t)}</span>`).join('')}</div>`
      : '';
  }

  function card(g) {
    const fav = isFav(g.id) ? ' on' : '';
    return `<div class="cardwrap">
      <a class="card" href="play.html?id=${encodeURIComponent(g.id)}">
      ${isNew(g) ? '<span class="new-badge">NEW</span>' : ''}
      ${iconFor(g, 'card-icon')}
      <div class="card-title">${esc(g.title)}</div>
      ${tagPills(g)}
      <div class="card-cat">${esc(g.category || '')}</div>
      ${g.description ? `<div class="card-desc">${esc(g.description)}</div>` : ''}
      </a>
      <button class="favbtn${fav}" data-fav="${esc(g.id)}" aria-label="Favorite this game" type="button">♥</button>
    </div>`;
  }

  function favIds() {
    try {
      const a = JSON.parse(localStorage.getItem('zg_favs') || '[]');
      return Array.isArray(a) ? a.filter(x => typeof x === 'string') : [];
    } catch (e) { return []; }
  }

  function isFav(id) { return favIds().includes(id); }

  function toggleFav(id) {
    let a = favIds();
    a = a.includes(id) ? a.filter(x => x !== id) : [id, ...a];
    try { localStorage.setItem('zg_favs', JSON.stringify(a.slice(0, 50))); } catch (e) {}
    const on = a.includes(id);
    document.querySelectorAll('[data-fav]').forEach(b => {
      if (b.getAttribute('data-fav') === id) b.classList.toggle('on', on);
    });
    renderFavs();
  }

  function renderFavs() {
    const wrap = document.getElementById('favWrap');
    const fg = document.getElementById('favGrid');
    if (!wrap || !fg) return;
    const byId = new Map(games.map(g => [g.id, g]));
    const list = favIds().map(id => byId.get(id)).filter(Boolean);
    wrap.hidden = !list.length;
    fg.innerHTML = list.map(card).join('');
  }

  function spotlightGame() {
    if (!games.length) return null;
    return games[Math.floor(Date.now() / 86400000) % games.length];
  }

  function renderSpotlight() {
    const wrap = document.getElementById('spotWrap');
    if (!wrap) return;
    const g = spotlightGame();
    if (!g) { wrap.hidden = true; return; }
    wrap.hidden = false;
    wrap.innerHTML = `
      <div class="spot-label">🎰 DAILY SPOTLIGHT</div>
      <a class="spot-card" href="play.html?id=${encodeURIComponent(g.id)}">
        ${iconFor(g, 'spot-icon')}
        <div class="spot-info">
          <div class="spot-title">${esc(g.title)}</div>
          ${g.description ? `<div class="spot-desc">${esc(g.description)}</div>` : ''}
          ${tagPills(g)}
          <span class="spot-play">▶ Play now</span>
        </div>
      </a>`;
  }

  function recentIds() {
    try {
      const a = JSON.parse(localStorage.getItem('zg_recent') || '[]');
      return Array.isArray(a) ? a.filter(x => typeof x === 'string') : [];
    } catch (e) { return []; }
  }

  function renderRecent() {
    const wrap = document.getElementById('recentWrap');
    const rg = document.getElementById('recentGrid');
    if (!wrap || !rg) return;
    const byId = new Map(games.map(g => [g.id, g]));
    const list = recentIds().map(id => byId.get(id)).filter(Boolean).slice(0, 8);
    wrap.hidden = !list.length;
    rg.innerHTML = list.map(card).join('');
  }

  function render() {
    const q = query.trim().toLowerCase();
    const list = games.filter(g =>
      (activeCat === 'All' || (g.category || '') === activeCat) &&
      (!q || (g.title || '').toLowerCase().includes(q) ||
        (g.description || '').toLowerCase().includes(q) ||
        tagsOf(g).some(t => t.toLowerCase().includes(q))));
    renderChips();
    grid.innerHTML = list.length ? list.map(card).join('')
      : `<div class="no-results">No games found.</div>`;
  }

  search.addEventListener('input', e => { query = e.target.value; render(); });

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-fav]');
    if (!b) return;
    e.preventDefault();
    toggleFav(b.getAttribute('data-fav'));
  });

  document.getElementById('randomBtn').addEventListener('click', () => {
    if (!games.length) return;
    const g = games[Math.floor(Math.random() * games.length)];
    location.href = 'play.html?id=' + encodeURIComponent(g.id);
  });

  const t0 = Date.now();
  function hideLoader() {
    const el = document.getElementById('loader');
    if (!el || el.classList.contains('done')) return;
    setTimeout(() => el.classList.add('done'), Math.max(0, 900 - (Date.now() - t0)));
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

  function refresh() {
    loadGames()
      .then(data => { games = data; render(); renderRecent(); renderFavs(); renderSpotlight(); hideLoader(); })
      .catch(() => { grid.innerHTML = `<div class="no-results">Could not load games.</div>`; hideLoader(); });
  }
  refresh();
  window.addEventListener('zg:games-changed', refresh);
})();
