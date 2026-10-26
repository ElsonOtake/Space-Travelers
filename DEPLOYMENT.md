# Space Travelers' Hub deployment

The app uses Vite to build a client-side React application. Express serves the generated files and falls back to `index.html` for client-side routes.

## Requirements

- Node.js 22.13 or newer within Node 22, matching `package.json`.
- npm 10 or newer.
- Development dependencies available during the build (Vite is a development dependency).

## Local development

```sh
npm ci
npm run dev
```

Vite serves the app at `http://localhost:3000` with hot reloading.

## Production build and server

```sh
npm ci
npm run build
npm start
```

The build goes into `build/`. This generated directory is ignored by Git and must be created during deployment. The Express server reads `PORT`, defaulting to 3000. Deep links such as `/launches`, `/crew`, and `/my_profile` serve the application entry point.

For a local preview of the production assets:

```sh
npm run preview
```

## Heroku

Use the Node.js buildpack (`heroku/nodejs`). The existing `heroku-postbuild` script runs `npm run build`, and `Procfile` starts `node server.js`. Ensure development dependencies are installed for the build before any production pruning.

## Static hosting

Configure the build command as `npm run build` and the publish directory as `build`. Rewrite application routes to `/index.html` so direct links work with React Router. Public files such as the favicon are copied from `public/`; Vite's generated bundles live under `build/assets/`.

## Client environment variables

Vite exposes variables prefixed with `VITE_` through `import.meta.env` at build time. The current catalog base URL is defined in `src/redux/api.js`; setting an environment variable does not override it automatically.

## Verification

```sh
npm test
npm run lint
npm run lint:css
npm run build
```

GitHub Actions runs these checks on pull requests. Tests mock catalog requests; loading live catalog data still requires access to Pipeworx.
