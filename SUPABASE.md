# Connect Supabase for Z Games

Z Games uses Supabase for **player accounts** and the **game catalog**.
You wire your own Supabase project — one-time setup:

## 1. Create the project
1. Go to **supabase.com** → **New project**
2. Name it `ZGames` (any name works), set a database password, pick a region
3. Wait ~2 minutes for it to spin up

## 2. Create the tables
1. Left sidebar → **SQL Editor** → **New query**
2. Copy everything from **`supabase-setup.sql`** in this repo, paste it in, **Run**
3. **New query** again → copy everything from **`supabase_games.sql`**, paste, **Run**
4. You should see "Success" both times

## 3. Copy the current games over (one time)
1. **New query** → copy everything from **`supabase_games_seed.sql`**, paste, **Run**
2. The 9 games from `games.json` are now in the database

## 4. Turn off email confirmation
Usernames are used as login (no real emails), so:
1. Left sidebar → **Authentication** → **Providers** → **Email**
2. Turn **OFF** "Confirm email" → Save

## 5. Get your keys
1. Left sidebar → **Project Settings** (gear) → **API**
2. Copy **Project URL** and the **anon public** key
3. They go in `js/supabase-config.js` in the repo (already filled in if
   you set them up before — the admin panel no longer manages this)

## 6. Admin access
1. On the hub, **sign up** with the username `fun` (if you haven't already)
2. Open `zg-admin-4173.html` on your site and sign in as `fun`
3. Add/edit/delete games — changes go live instantly, on any device,
   with no GitHub token needed

## Notes
- The anon key is public by design; the database rules (RLS) keep
  players to their own profiles, and only `@fun` can change the catalog.
- Never use the `service_role` key in the site.
- `games.json` in the repo is now just a fallback — the database is the
  source of truth once the tables exist.
