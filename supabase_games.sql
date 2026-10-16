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
  tags text not null default '',
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
