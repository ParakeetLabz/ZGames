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
    return `<a class="card" href="play.html?id=${encodeURIComponent(g.id)}">
      ${isNew(g) ? '<span class="new-badge">NEW</span>' : ''}
      ${iconFor(g, 'card-icon')}
      <div class="card-title">${esc(g.title)}</div>
      ${tagPills(g)}
      <div class="card-cat">${esc(g.category || '')}</div>
      ${g.description ? `<div class="card-desc">${esc(g.description)}</div>` : ''}
    </a>`;
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
      .then(data => { games = data; render(); hideLoader(); })
      .catch(() => { grid.innerHTML = `<div class="no-results">Could not load games.</div>`; hideLoader(); });
  }
  refresh();
  window.addEventListener('zg:games-changed', refresh);
})();
