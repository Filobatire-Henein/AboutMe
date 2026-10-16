# Filobatire Henein — Portfolio

Live: https://filobatire-henein.github.io/AboutMe/

A 3D portfolio built with React, Vite, Tailwind, Three.js (react-three-fiber) and Framer Motion.
The previous version of the site is kept untouched in [`legacy/`](legacy/) and is published at `/AboutMe/legacy/`.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173/AboutMe/
npm run build    # outputs dist/
```

Pushing to `main` builds and deploys via `.github/workflows/static.yml`.

## Editing content

All text, experience, projects and skills live in `src/data.ts`.

## How the 3D intro works

The MacBook is a Spline scene (`src/mac/MacStage.tsx`, loaded with `@splinetool/runtime`).
Scroll position drives the laptop's pose (lid angle, rotation, distance). Each frame the
`SCREEN IMAGE` mesh is projected to the page and the HTML lock screen is pinned onto it
with a CSS `matrix3d`, so what you see on the laptop is real, live HTML.
Poses are tuned in `introPoses` / `outroPoses`.

Visitors with "reduce motion" turned on, or whose browser can't load the scene, get the
same content as a normal page.
