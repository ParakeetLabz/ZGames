/* Z Games accounts — Supabase Auth (username + password) with avatar uploads.
   Hidden automatically until the site owner connects Supabase (admin panel). */
(() => {
  const cfg = (window.ZG_SUPABASE || {});
  const wrap = document.getElementById('accountWrap');
  if (!cfg.url || !cfg.anonKey || !window.supabase) { if (wrap) wrap.hidden = true; return; }
  const sb = window.supabase.createClient(cfg.url, cfg.anonKey);

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const emailOf = u => u.trim().toLowerCase() + '@z-games.app'; // .app: real gTLD; GoTrue rejects reserved TLDs like .local
  const validUser = u => /^[a-zA-Z0-9_]{3,16}$/.test(u.trim());

  const BORDERS = [
    ['none', 'None'], ['gold', 'Gold'], ['neon', 'Neon'], ['fire', 'Fire'],
    ['ice', 'Ice'], ['rainbow', 'Rainbow'], ['shadow', 'Shadow']
  ];
  const safeBorder = b => BORDERS.some(([x]) => x === b) ? b : 'none';
  const avb = (inner, border) => `<span class="avb avb-${safeBorder(border)}">${inner}</span>`;

  const modal = document.getElementById('authModal');
  const authBody = document.getElementById('authBody');
  const tabs = document.getElementById('authTabs');
  const tabLogin = document.getElementById('tabLogin');
  const tabSignup = document.getElementById('tabSignup');
  const formLogin = document.getElementById('formLogin');
  const formSignup = document.getElementById('formSignup');
  const profileView = document.getElementById('profileView');
  const authMsgEl = document.getElementById('authMsg');
  const authMsg = m => { authMsgEl.textContent = m; };

  const openModal = () => { modal.hidden = false; };
  const closeModal = () => { modal.hidden = true; authMsg(''); };
  document.getElementById('authClose').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  function showTab(which) {
    const login = which === 'login';
    tabs.hidden = false;
    tabLogin.classList.toggle('active', login);
    tabSignup.classList.toggle('active', !login);
    formLogin.hidden = !login;
    formSignup.hidden = login;
    profileView.hidden = true;
    authMsg('');
  }
  tabLogin.addEventListener('click', () => showTab('login'));
  tabSignup.addEventListener('click', () => showTab('signup'));

  const APP_VERSION = 'v7';
  function showProfile(username, avatar, border, onLogout, onSaveAvatar, onSaveBorder) {
    tabs.hidden = true;
    formLogin.hidden = true;
    formSignup.hidden = true;
    profileView.hidden = false;
    authMsg('');
    const pic = avatar
      ? `<img class="acct-big" src="${esc(avatar)}" alt="">`
      : `<div class="acct-big acct-fb">${esc(username.trim().charAt(0).toUpperCase())}</div>`;
    profileView.innerHTML = `
      <div class="profile">
        <span class="avb avb-${safeBorder(border)}" id="pfBorderWrap">${pic}</span>
        <h3>${esc(username)}</h3>
        <div class="avb-pick-label">Avatar border</div>
        <div class="field"><select id="pfBorderSel">
          ${BORDERS.map(([b, label]) =>
            `<option value="${b}"${safeBorder(border) === b ? ' selected' : ''}>${label}</option>`
          ).join('')}
        </select></div>
        <div class="form-actions">
          <button id="pfBorderSave" class="btn btn-primary">Set border</button>
        </div>
        <label class="field">Change avatar<input id="pfAvatar" type="file" accept="image/*"></label>
        <div class="form-actions">
          <button id="pfSave" class="btn btn-primary">Upload image</button>
          <button id="pfLogout" class="btn btn-ghost">Log out</button>
        </div>
        <p id="pfMsg" class="hint"></p>
        <p class="hint" style="opacity:.5">version ${APP_VERSION}</p>
      </div>`;
    const saveBorderChoice = () => {
      const b = document.getElementById('pfBorderSel').value;
      const msg = $('pfMsg');
      msg.textContent = 'Saving ' + b + '…';
      $('pfBorderWrap').className = 'avb avb-' + b;
      onSaveBorder(b, msg);
    };
    document.getElementById('pfBorderSel').addEventListener('change', saveBorderChoice);
    document.getElementById('pfBorderSave').addEventListener('click', saveBorderChoice);
    document.getElementById('pfLogout').addEventListener('click', onLogout);
    document.getElementById('pfSave').addEventListener('click', () => {
      const file = document.getElementById('pfAvatar').files[0];
      onSaveAvatar(file, document.getElementById('pfMsg'));
    });
  }

  async function uploadAvatar(uid, file) {
    const path = uid + '/avatar.png';
    const { error } = await sb.storage.from('avatars').upload(path, file, { upsert: true });
    if (error) throw new Error(error.message);
    return sb.storage.from('avatars').getPublicUrl(path).data.publicUrl;
  }

  formSignup.addEventListener('submit', async e => {
    e.preventDefault();
    const username = document.getElementById('suUser').value;
    const password = document.getElementById('suPass').value;
    const file = document.getElementById('suAvatar').files[0];
    try {
      if (!validUser(username)) throw new Error('Username: 3–16 chars, letters/numbers/_ only.');
      if (password.length < 6) throw new Error('Password needs at least 6 characters.');
      authMsg('Creating account…');
      const { data, error } = await sb.auth.signUp({
        email: emailOf(username), password, options: { data: { username: username.trim() } }
      });
      if (error) throw new Error(error.message);
      if (!data.session) throw new Error('In Supabase: Auth → Providers → Email → turn OFF "Confirm email".');
      let avatar_url = null;
      if (file) avatar_url = await uploadAvatar(data.user.id, file);
      const { error: pErr } = await sb.from('profiles')
        .insert({ id: data.user.id, username: username.trim(), avatar_url });
      if (pErr) throw new Error(pErr.message);
      closeModal();
      await refresh();
    } catch (err) { authMsg(err.message || String(err)); }
  });

  formLogin.addEventListener('submit', async e => {
    e.preventDefault();
    try {
      authMsg('Logging in…');
      const { error } = await sb.auth.signInWithPassword({
        email: emailOf(document.getElementById('liUser').value),
        password: document.getElementById('liPass').value
      });
      if (error) throw new Error(error.message);
      closeModal();
      await refresh();
    } catch (err) { authMsg(err.message || String(err)); }
  });

  async function refresh() {
    const { data: { session } } = await sb.auth.getSession();
    if (!session) {
      wrap.innerHTML = `<button id="accountBtn" class="btn btn-primary">Sign in</button>`;
      document.getElementById('accountBtn').addEventListener('click', () => { showTab('login'); openModal(); });
      return;
    }
    let username = (session.user.user_metadata && session.user.user_metadata.username) || 'player';
    let avatar = null;
    let border = 'none';
    try {
      const { data } = await sb.from('profiles').select('username,avatar_url,avatar_border')
        .eq('id', session.user.id).single();
      if (data) { username = data.username || username; avatar = data.avatar_url; border = data.avatar_border || 'none'; }
    } catch (e) {}
    const pic = avb(avatar
      ? `<img class="acct-pic" src="${esc(avatar)}" alt="">`
      : `<span class="acct-fb">${esc(username.trim().charAt(0).toUpperCase())}</span>`, border);
    wrap.innerHTML = `<button id="accountBtn" class="acct-chip">${pic}<span>${esc(username)}</span></button>`;
    document.getElementById('accountBtn').addEventListener('click', () => {
      showProfile(
        username,
        avatar,
        border,
        async () => { await sb.auth.signOut(); closeModal(); await refresh(); },
        async (file, msgEl) => {
          if (!file) { msgEl.textContent = 'Pick an image first.'; return; }
          try {
            msgEl.textContent = 'Uploading…';
            const url = await uploadAvatar(session.user.id, file);
            const { error } = await sb.from('profiles').update({ avatar_url: url }).eq('id', session.user.id);
            if (error) throw new Error(error.message);
            closeModal(); await refresh();
          } catch (err) { msgEl.textContent = err.message || String(err); }
        },
        async (b, msgEl) => {
          try {
            const { error } = await sb.from('profiles').update({ avatar_border: b }).eq('id', session.user.id);
            if (error) throw new Error(error.message);
            msgEl.textContent = 'Border saved ✓';
            await refresh();
          } catch (err) { msgEl.textContent = 'Save failed: ' + (err.message || String(err)); }
        }
      );
      openModal();
    });
  }

  sb.auth.onAuthStateChange(() => refresh());
  refresh();
})();
