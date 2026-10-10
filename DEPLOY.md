# Deploying Z Games on Netlify

Two ways — pick one.

## Option 1: Drag & drop (fastest)

1. On github.com, open your **GameHub** repo → green **Code** button → **Download ZIP**
2. Unzip it on your device
3. Go to **app.netlify.com/drop** and drag the unzipped folder in
4. Done — Netlify gives you a public link instantly

## Option 2: Connect the repo (auto-updates)

1. Go to **app.netlify.com** → **Add new site** → **Import an existing project**
2. Choose **GitHub**, find and select **IAmTheGamer-sigma/GameHub**
   (if it asks for access, approve it — the repo is private)
3. Build settings: leave everything blank (no build command, no publish directory change —
   publish directory is already the repo root) → **Deploy**
4. Every time you push to `main` (or save via the admin panel), Netlify rebuilds automatically in ~1 minute

## Useful URLs

- Home (disguised): `your-site.netlify.app/`
- Unlock: in the calculator type `Game x Random` → `=` → then `unlock x it + please` → `=`
- Admin panel: `your-site.netlify.app/zg-admin-4173.html` (PIN: 4173)

## Custom domain (optional)

Netlify → your site → **Domain settings** → **Add custom domain**.
At your domain provider, add a **CNAME** record pointing to your Netlify subdomain.
