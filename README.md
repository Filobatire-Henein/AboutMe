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

## Spline scenes (optional)

Design or remix a scene at https://spline.design (free plan), then **Export → Code → React** and paste the
`https://prod.spline.design/.../scene.splinecode` URL into `splineScenes` in `src/data.ts`:

- `about` — replaces the avatar card in the About section
- `contact` — replaces the rotating Earth in the Contact section

## 3D model credits

`public/desktop_pc` and `public/planet` are Sketchfab models; see the `license.txt` in each folder.
