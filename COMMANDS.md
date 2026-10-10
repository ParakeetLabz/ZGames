# Z Games — Commands & Codes

## Unlock the hub
Two steps, in the home page calculator:
1. Type `Game x Random` and press `=` → it asks "What Are You Asking?"
2. Type `unlock x it + please` and press `=` → the hub opens.
(Anything else just shows "What?".)

## Admin panel
- Open `zg-admin-4173.html` on your deployed site
- PIN: `4173`

## Connect GitHub (one-time)
1. github.com → profile → **Settings** → **Developer settings**
   → **Personal access tokens** → **Tokens (classic)**
2. **Generate new token (classic)** → name it `GameHub` → tick **repo** → Generate
3. Copy it, paste into the admin panel's token field → **Save & Load Games**
   (stored only in that browser)

## Add a game
Admin panel → Title + Category → either paste a **Game URL**
or **upload an .html file** → **Add Game**.

## Add / change an icon
In the game form: paste an **image URL**, or **upload an image**
(it's saved into the repo's `icons/` folder). No icon = letter tile.

## Edit a game
Click **Edit** next to the game → change fields → **Save Changes**.

## Delete a game
Click **Delete** → confirm. Removes it from the catalog
(and its uploaded files).

## After saving
Netlify rebuilds automatically in ~1 minute (repo-connected sites),
or re-drag the folder (manual deploys).
