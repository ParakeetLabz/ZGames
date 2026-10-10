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

  function card(g) {
    return `<a class="card" href="play.html?id=${encodeURIComponent(g.id)}">
      ${iconFor(g, 'card-icon')}
      <div class="card-title">${esc(g.title)}</div>
      <div class="card-cat">${esc(g.category || '')}</div>
      ${g.description ? `<div class="card-desc">${esc(g.description)}</div>` : ''}
    </a>`;
  }

  function render() {
    const q = query.trim().toLowerCase();
    const list = games.filter(g =>
      (activeCat === 'All' || (g.category || '') === activeCat) &&
      (!q || (g.title || '').toLowerCase().includes(q) ||
        (g.description || '').toLowerCase().includes(q)));
    renderChips();
    grid.innerHTML = list.length ? list.map(card).join('')
      : `<div class="no-results">No games found.</div>`;
  }

  search.addEventListener('input', e => { query = e.target.value; render(); });

  fetch('games.json', { cache: 'no-store' })
    .then(r => r.json())
    .then(data => { games = Array.isArray(data) ? data : []; render(); })
    .catch(() => { grid.innerHTML = `<div class="no-results">Could not load games.</div>`; });
})();
