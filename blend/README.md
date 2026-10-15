# Blend and Seek 🦎

3D multiplayer hide-and-seek. Hiders paint their bodies to blend into the arena —
seekers hunt them down before time runs out. Caught hiders become seekers.

## Play
- **Hiders**: during the hide phase, pick a paint color + pattern (solid / stripes / spots)
  to match the arena, then freeze.
- **Seekers**: aim with the crosshair and click (or TAG button on mobile) to tag hiders.
- Share the 6-letter room code to play with friends. First player is host and starts the game.

## Controls
- **Desktop**: WASD / arrows to move, drag mouse to look, click to tag (seeker).
- **Mobile**: left joystick to move, drag right side of screen to look, TAG button.

## Run locally
```
npm install
npm start
```
Open http://localhost:3000

## Deploy (Render)
This project lives in the `blend/` folder of the GameHub repo.
1. New → Web Service → connect the GameHub repo
2. Set **Root Directory** to `blend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Deploy — multiplayer works immediately (no env vars needed)

Optional tuning: `HIDE_TIME` and `SEEK_TIME` (seconds) env vars.

## Tech
Node + Express + ws server (authoritative positions, tags, round timer),
Three.js client. No build step.
