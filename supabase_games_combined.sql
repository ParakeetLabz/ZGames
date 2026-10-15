-- Z Games: FULL setup in one file — run once in Supabase → SQL Editor → New query
-- Part 1 creates the games table + RLS + storage bucket.
-- Part 2 seeds the table with the current catalog.

------------------------------ PART 1: TABLES + RULES ------------------------------

-- Z Games catalog: run once in Supabase → SQL Editor → New query
-- Creates the games table + the public game-assets bucket, with RLS.
-- Everyone can read the catalog; only the @fun account can change it.
-- After this, run supabase_games_seed.sql to copy the current games over.

-- helper: is the signed-in user the admin?
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and lower(profiles.username) = 'fun'
  );
$$;

create table if not exists public.games (
  id text primary key,
  title text not null,
  category text not null default 'Other',
  description text not null default '',
  icon text not null default '',
  kind text not null default 'url',
  url text not null,
  servers jsonb not null default '[]',
  created_at timestamptz not null default now()
);

alter table public.games enable row level security;

drop policy if exists "games readable by all" on public.games;
create policy "games readable by all"
  on public.games for select using (true);

drop policy if exists "games admin write" on public.games;
create policy "games admin write"
  on public.games for all
  using (public.is_admin())
  with check (public.is_admin());

-- public bucket for game icons + uploaded game files
insert into storage.buckets (id, name, public)
values ('game-assets', 'game-assets', true)
on conflict (id) do nothing;

drop policy if exists "game-assets public read" on storage.objects;
create policy "game-assets public read"
  on storage.objects for select using (bucket_id = 'game-assets');

drop policy if exists "game-assets admin insert" on storage.objects;
create policy "game-assets admin insert"
  on storage.objects for insert
  with check (bucket_id = 'game-assets' and public.is_admin());

drop policy if exists "game-assets admin update" on storage.objects;
create policy "game-assets admin update"
  on storage.objects for update
  using (bucket_id = 'game-assets' and public.is_admin());

drop policy if exists "game-assets admin delete" on storage.objects;
create policy "game-assets admin delete"
  on storage.objects for delete
  using (bucket_id = 'game-assets' and public.is_admin());

------------------------------ PART 2: SEED THE CATALOG ------------------------------

-- Seed the games table with the current catalog (copied from games.json).
-- Run AFTER supabase_games.sql, once, in Supabase → SQL Editor → New query.
insert into public.games (id, title, category, description, icon, kind, url, servers, created_at) values
('angry-birds', 'Angry Birds', 'Arcade', '', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPmEUzMrGwpyQ9mVdpNG2hlfuWu5FzvPDkRw&s', 'url', 'https://angry-birds-theta-jade.vercel.app/', '[]'::jsonb, now() - interval '9 minutes'),
('gust', 'GUST', 'Other', 'A Proxy', '', 'url', 'https://gust-zeta.vercel.app/', '["https://mathquiz22.vercel.app/index?cache=1736167363"]'::jsonb, now() - interval '8 minutes'),
('funtopia', 'FunTopia', 'Arcade', 'A Multiplayer blocky game', '', 'url', 'https://friendfun.onrender.com/', '[]'::jsonb, now() - interval '7 minutes'),
('funworxs', 'FunWorxs', 'Other', 'A chatting app for FunTopia', '', 'url', 'https://funworxs.onrender.com/', '[]'::jsonb, now() - interval '6 minutes'),
('snow-rider-shpn', 'Snow Rider', 'Other', '', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWKwtlpK8bpycgETENAu7hoAm2_cv26HKZaWYO4vOlfw&s', 'url', 'https://snow-rider-1.vercel.app/', '[]'::jsonb, now() - interval '5 minutes'),
('undertale-icp6', 'Undertale', 'Arcade', 'Is it Under the Tale?', 'https://static.cdnlogo.com/logos/u/65/undertale.svg', 'url', 'https://undertale-beige.vercel.app/', '[]'::jsonb, now() - interval '4 minutes'),
('gimkit-hacks-11fj', 'Gimkit Hacks', 'Other', 'Hack in gimkit', '', 'url', 'https://gim.villiansrule.xyz', '[]'::jsonb, now() - interval '3 minutes'),
('retro-bowl-vsup', 'Retro Bowl', 'Arcade', 'Football but RETRO???', 'https://upload.wikimedia.org/wikipedia/en/b/bf/Retro_Bowl_cover.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled', 'url', 'https://retro-bowl-blue.vercel.app/', '[]'::jsonb, now() - interval '2 minutes'),
('deltarune-3wh9', 'Deltarune', 'Arcade', '', 'icons/deltarune-3wh9.webp', 'url', 'https://deltarune-lilac.vercel.app/', '[]'::jsonb, now() - interval '1 minutes')
on conflict (id) do nothing;
