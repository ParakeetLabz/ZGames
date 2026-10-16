/* Z Games — admin sidebar (add/edit/remove games, admin only) */
(() => {
  const cfg = window.ZG_SUPABASE || {};
  if (!cfg.url || !cfg.anonKey || !window.supabase) return;
  const sb = window.supabase.createClient(cfg.url, cfg.anonKey);

  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const setStatus = m => { $('asbStatus').textContent = m; };

  const btn = $('adminBtn'), overlay = $('asbOverlay'), panel = $('asbPanel');
  let isAdmin = false, catalog = [], editingId = null;

  /* ---------- admin gate ---------- */
  async function checkAdmin() {
    isAdmin = false;
    try {
      const { data: { session } } = await sb.auth.getSession();
      if (session) {
        const { data } = await sb.from('profiles').select('username').eq('id', session.user.id).single();
        if (data && (data.username || '').toLowerCase() === 'fun') isAdmin = true;
      }
    } catch (e) {}
    btn.hidden = !isAdmin;
    if (!isAdmin) close();
  }
  sb.auth.onAuthStateChange(() => checkAdmin());
  checkAdmin();

  /* ---------- open/close ---------- */
  function open() {
    if (!isAdmin) return;
    overlay.classList.add('open');
    panel.classList.add('open');
    document.body.style.overflow = 'hidden';
    refresh();
  }
  function close() {
    overlay.classList.remove('open');
    panel.classList.remove('open');
    document.body.style.overflow = '';
  }
  btn.addEventListener('click', open);
  $('asbClose').addEventListener('click', close);
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  /* ---------- storage ---------- */
  async function uploadAsset(path, file) {
    const { error } = await sb.storage.from('game-assets')
      .upload(path, file, { upsert: true, contentType: file.type || undefined });
    if (error) throw new Error(error.message);
    return sb.storage.from('game-assets').getPublicUrl(path).data.publicUrl;
  }
  function storagePath(url) {
    const m = String(url || '').match(/\/storage\/v1\/object\/public\/game-assets\/(.+)$/);
    return m ? m[1] : null;
  }

  /* ---------- games ---------- */
  async function refresh() {
    try {
      setStatus('Loading games…');
      const { data, error } = await sb.from('games').select('*').order('created_at');
      if (error) throw new Error(error.message);
      catalog = data || [];
      setStatus('');
    } catch (e) {
      catalog = [];
      setStatus('Error: ' + (e.message || String(e)));
    }
    renderList();
  }

  function resetForm() {
    $('asbForm').reset();
    editingId = null;
    $('asbFormTitle').textContent = '➕ Add a game';
    $('asbSave').textContent = 'Add Game';
    $('asbCancel').hidden = true;
  }
  $('asbCancel').addEventListener('click', resetForm);

  $('asbForm').addEventListener('submit', async e => {
    e.preventDefault();
    const title = $('asbTitle').value.trim();
    if (!title) return alert('Title needed');
    const url = $('asbUrl').value.trim();
    const gameFile = $('asbGameFile').files[0];
    const iconFile = $('asbIconFile').files[0];
    if (!url && !gameFile) return alert('Add a game URL or upload an .html file.');
    const id = editingId || (title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') +
      '-' + Math.random().toString(36).slice(2, 6));
    try {
      setStatus('Working…');
      let icon = $('asbIconUrl').value.trim();
      let kind = 'url', finalUrl = url;
      if (iconFile) {
        const ext = (iconFile.name.split('.').pop() || 'png').toLowerCase().replace(/[^a-z0-9]/g, '') || 'png';
        icon = await uploadAsset(`icons/${id}.${ext}`, iconFile);
      }
      if (gameFile) {
        finalUrl = await uploadAsset(`games/${id}.html`, gameFile);
        kind = 'file';
      }
      const servers = $('asbServers').value.split('\n').map(s => s.trim()).filter(Boolean)
        .map((u, i) => ({ name: 'Server ' + (i + 2), url: u }));
      const tags = $('asbTags').value.trim().split(/[,\s]+/).map(t => t.replace(/^#+/, ''))
        .filter(t => t.length > 0 && t.length <= 20).join(' ');
      const entry = {
        id, title,
        category: $('asbCat').value.trim() || 'Other',
        description: $('asbDesc').value.trim(),
        icon, kind, url: finalUrl, servers, tags
      };
      const { error } = await sb.from('games').upsert(entry, { onConflict: 'id' });
      if (error) throw new Error(error.message);
      setStatus('Saved ✓');
      resetForm(); refresh();
      window.dispatchEvent(new CustomEvent('zg:games-changed'));
    } catch (err) { setStatus('Error: ' + (err.message || String(err))); }
  });

  function thumb(g) {
    if (g.icon) return `<img src="${esc(g.icon)}" alt="" loading="lazy">`;
    const ch = esc((g.title || '?').trim().charAt(0).toUpperCase() || '?');
    return `<div class="asb-fb">${ch}</div>`;
  }

  function renderList() {
    const list = $('asbList');
    if (!catalog.length) { list.innerHTML = '<p class="hint">No games yet.</p>'; return; }
    list.innerHTML = catalog.map(g => `
      <div class="asb-row">${thumb(g)}
        <div class="asb-info">
          <div class="asb-title">${esc(g.title)}</div>
          <div class="asb-sub">${esc(g.category || '')} · ${g.kind === 'file' ? 'uploaded' : 'link'}${(g.servers || []).length ? ' · ' + g.servers.length + ' servers' : ''}</div>
        </div>
        <div class="asb-actions">
          <button class="btn btn-ghost" data-edit="${g.id}">Edit</button>
          <button class="btn btn-ghost" data-del="${g.id}" style="color:#ff5470;border-color:rgba(255,84,112,.4)">Delete</button>
        </div>
      </div>`).join('');
    list.querySelectorAll('[data-edit]').forEach(b =>
      b.addEventListener('click', () => startEdit(b.dataset.edit)));
    list.querySelectorAll('[data-del]').forEach(b =>
      b.addEventListener('click', async () => {
        const g = catalog.find(x => x.id === b.dataset.del);
        if (!g || !confirm(`Delete "${g.title}"?`)) return;
        try {
          setStatus('Deleting…');
          const paths = [storagePath(g.icon), storagePath(g.url)].filter(Boolean);
          if (paths.length) {
            const { error } = await sb.storage.from('game-assets').remove(paths);
            if (error) throw new Error(error.message);
          }
          const { error } = await sb.from('games').delete().eq('id', g.id);
          if (error) throw new Error(error.message);
          setStatus('Deleted ✓'); refresh();
          window.dispatchEvent(new CustomEvent('zg:games-changed'));
        } catch (err) { setStatus('Error: ' + (err.message || String(err))); }
      }));
  }

  function startEdit(id) {
    const g = catalog.find(x => x.id === id);
    if (!g) return;
    editingId = id;
    $('asbTitle').value = g.title;
    $('asbCat').value = g.category || '';
    $('asbDesc').value = g.description || '';
    $('asbTags').value = g.tags || '';
    $('asbIconUrl').value = g.icon || '';
    $('asbUrl').value = g.url || '';
    $('asbServers').value = (g.servers || []).map(s => typeof s === 'string' ? s : s.url).join('\n');
    $('asbFormTitle').textContent = '✏️ Edit game';
    $('asbSave').textContent = 'Save Changes';
    $('asbCancel').hidden = false;
    panel.querySelector('.asb-body').scrollTo({ top: 0, behavior: 'smooth' });
  }
})();
