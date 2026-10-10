# Connect Supabase for Z Games accounts

Players sign up with a **username + password** (+ optional avatar).
You wire your own Supabase project — one-time setup:

## 1. Create the project
1. Go to **supabase.com** → **New project**
2. Name it `ZGames` (any name works), set a database password, pick a region
3. Wait ~2 minutes for it to spin up

## 2. Create the tables
1. Left sidebar → **SQL Editor** → **New query**
2. Copy everything from **`supabase-setup.sql`** in this repo, paste it in, **Run**
3. You should see "Success"

## 3. Turn off email confirmation
Usernames are used as login (no real emails), so:
1. Left sidebar → **Authentication** → **Providers** → **Email**
2. Turn **OFF** "Confirm email" → Save

## 4. Get your keys
1. Left sidebar → **Project Settings** (gear) → **API**
2. Copy **Project URL** and the **anon public** key

## 5. Paste them into the hub
1. Open `zg-admin-4173.html` on your site → PIN `4173`
2. Scroll to **Supabase (accounts)** → paste URL + anon key → **Save**
3. Done — an **Account** button appears in the hub header

## Notes
- The anon key is public by design; the database rules (RLS) keep
  players to their own profiles and avatar folders.
- Never use the `service_role` key in the site.
