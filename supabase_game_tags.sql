-- Z Games: game tags — run once in Supabase → SQL Editor → New query
-- Adds a free-text tags column (space-separated, e.g. "beta multiplayer").
-- Safe to run more than once.

alter table public.games
  add column if not exists tags text not null default '';
