-- Avatar borders: run once in Supabase → SQL Editor → New query
-- Lets players pick a decorative border for their avatar.
-- The existing "users update own profile" RLS policy already covers this column.
alter table public.profiles
  add column if not exists avatar_border text not null default 'none';
