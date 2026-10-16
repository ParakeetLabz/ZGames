-- Seed the games table with the current catalog (copied from games.json).
-- Run AFTER supabase_games.sql, once, in Supabase → SQL Editor → New query.
-- Timestamps are backdated 60 days so the seed games don't all show as NEW.
insert into public.games (id, title, category, description, icon, kind, url, servers, created_at) values
('angry-birds', 'Angry Birds', 'Arcade', '', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPmEUzMrGwpyQ9mVdpNG2hlfuWu5FzvPDkRw&s', 'url', 'https://angry-birds-theta-jade.vercel.app/', '[]'::jsonb, (now() - interval '60 days') + interval '0 minutes'),
('gust', 'GUST', 'Other', 'A Proxy', '', 'url', 'https://gust-zeta.vercel.app/', '["https://mathquiz22.vercel.app/index?cache=1736167363"]'::jsonb, (now() - interval '60 days') + interval '1 minutes'),
('funtopia', 'FunTopia', 'Arcade', 'A Multiplayer blocky game', '', 'url', 'https://friendfun.onrender.com/', '[]'::jsonb, (now() - interval '60 days') + interval '2 minutes'),
('funworxs', 'FunWorxs', 'Other', 'A chatting app for FunTopia', '', 'url', 'https://funworxs.onrender.com/', '[]'::jsonb, (now() - interval '60 days') + interval '3 minutes'),
('snow-rider-shpn', 'Snow Rider', 'Other', '', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWKwtlpK8bpycgETENAu7hoAm2_cv26HKZaWYO4vOlfw&s', 'url', 'https://snow-rider-1.vercel.app/', '[]'::jsonb, (now() - interval '60 days') + interval '4 minutes'),
('undertale-icp6', 'Undertale', 'Arcade', 'Is it Under the Tale?', 'https://static.cdnlogo.com/logos/u/65/undertale.svg', 'url', 'https://undertale-beige.vercel.app/', '[]'::jsonb, (now() - interval '60 days') + interval '5 minutes'),
('gimkit-hacks-11fj', 'Gimkit Hacks', 'Other', 'Hack in gimkit', '', 'url', 'https://gim.villiansrule.xyz', '[]'::jsonb, (now() - interval '60 days') + interval '6 minutes'),
('retro-bowl-vsup', 'Retro Bowl', 'Arcade', 'Football but RETRO???', 'https://upload.wikimedia.org/wikipedia/en/b/bf/Retro_Bowl_cover.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled', 'url', 'https://retro-bowl-blue.vercel.app/', '[]'::jsonb, (now() - interval '60 days') + interval '7 minutes'),
('deltarune-3wh9', 'Deltarune', 'Arcade', '', 'icons/deltarune-3wh9.webp', 'url', 'https://deltarune-lilac.vercel.app/', '[]'::jsonb, (now() - interval '60 days') + interval '8 minutes')
on conflict (id) do nothing;
