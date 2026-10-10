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

  fetch('games.json', { cache: 'no-store' })
    .then(r => r.json())
    .then(games => {
      const game = games.find(g => g.id === id);
      if (!game) {
        title.textContent = 'Game not found';
        stage.innerHTML = `<div class="no-results">This game no longer exists. <a href="hub.html">Back to hub</a></div>`;
        hideLoader();
        return;
      }
      title.textContent = game.title;
      frame.src = game.url;
      if (/^https?:/i.test(game.url)) { newTab.href = game.url; newTab.hidden = false; }
      more.innerHTML = games.filter(g => g.id !== game.id).slice(0, 8).map(g =>
        `<a class="card" href="play.html?id=${encodeURIComponent(g.id)}">${iconFor(g, 'card-icon')}<div class="card-title">${esc(g.title)}</div></a>`
      ).join('');
    })
    .catch(() => { title.textContent = 'Could not load game'; hideLoader(); });

  document.getElementById('fsBtn').addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (stage.requestFullscreen) stage.requestFullscreen();
  });
})();
