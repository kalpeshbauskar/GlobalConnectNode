# Global Connect AI4All — React version

This is the React (Vite) conversion of the original single-file HTML/CSS/JS site.

## Structure

- `src/main.jsx` — React entry point
- `src/App.jsx` — top-level app, page routing, auth gate
- `src/pages/` — one component per page (Login, Home, Courses, Videos, Simulations, Games, Code Lab, Dashboard, About)
- `src/components/` — reusable pieces (Header, NeuralNetLab, PromptBuilder, PixelVision)
- `src/data/sessions.js` — all session/course/game/template data
- `src/styles.css` — original stylesheet, unchanged
- `public/images/` — the 10 course thumbnail images (extracted from the old base64 blobs into real PNG files)
- `public/games/` — the 10 embedded mini-games/quizzes (extracted from base64 into real standalone HTML files, loaded via `<iframe>` exactly like before)

## Why games/quizzes are still iframes

The mini-games (Prompt Detective, Train the Robot, HTML Debugger, quizzes, etc.) were already self-contained
HTML/CSS/JS documents in the original site, sandboxed in iframes with `postMessage` height syncing. That
architecture is kept as-is — it's the correct pattern for embedding fully independent widgets, and rewriting
each one as deeply nested React internals would add risk without benefit. Everything else (login, navigation,
courses, videos, the Neural Network Lab, Prompt Builder, Pixel Vision, Code Lab, Dashboard) is real React with
hooks and state, ported 1:1 from the original vanilla JS logic.

## Setup

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
```

## Deploying to GitHub Pages

**Do not upload this source folder as-is to GitHub Pages** — it will show a blank page, because
GitHub Pages only serves plain files and cannot compile JSX or resolve `import react from 'react'`
in the browser. You must build it first:

```bash
npm install
npm run build
```

This creates a `dist/` folder containing plain HTML/CSS/JS. **Upload the *contents* of `dist/`**
(not the source folder) to GitHub Pages — e.g. push them to a `gh-pages` branch, or set your repo's
Pages source to a `docs/` folder and copy `dist/*` into it.

The project is already configured (`vite.config.js` → `base: './'`, plus a `withBase()` helper used
for every image/game/logo path) so it works correctly whether it's hosted at a domain root or in a
GitHub Pages subfolder like `username.github.io/repo-name/`.

## Notes

- Student profile and progress are still stored in `localStorage` under the same keys as before, so no data model changed.
- School sign-up passwords live in `src/data/sessions.js` (`schoolPasswords`) — same caveat as before: this is a client-side gate, not real security, since there's no backend.
