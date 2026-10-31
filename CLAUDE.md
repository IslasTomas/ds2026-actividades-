# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Course activity repository for a Software Development (DS) 2026 course, organized as progressive chapters under `ejercicios/`. Each chapter introduces a new technology layer.

| Chapter | Tech Stack | Build Tool |
|---------|-----------|------------|
| c02-html-css | HTML5 + CSS | None (static) |
| c03-javascript | Vanilla JS | None (browser) |
| c04-typescript | TypeScript | `tsc` (manual) |
| c05-async-await | TS + Fetch API | `tsc` (manual) |
| c06-libreria-html | HTML + CSS + JS | None (static) |
| c08-libreria-react | React 19 + TS | Vite |

Note: c07 does not exist in this repo.

## C08 React Project (the only npm project)

All npm commands run from `ejercicios/c08-libreria-react/libreria-islas/`:

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # Type-check (tsc -b) then production bundle
npm run lint      # ESLint (flat config, typescript-eslint)
npm run preview   # Serve the production build locally
```

Stack: React 19, TypeScript 6, Vite 8, React-Bootstrap 2 + Bootstrap 5, ESLint flat config.

## TypeScript Exercises (c04, c05)

Each exercise has `app.ts` → manually compile to `app.js` with:

```bash
tsc app.ts
```

No `tsconfig.json` per exercise (those are gitignored). Compiled `app.js` files are committed alongside source.

## .gitignore Quirks

`package.json`, `package-lock.json`, and `tsconfig*.json` are globally gitignored. This means:
- The React project's `package.json` is **not** tracked in git
- If cloning fresh, run `npm install` in the `libreria-islas/` directory
- TypeScript configs are local-only

## Architecture: C08 React Library App

The React project (`libreria-islas/`) is a multi-page library (bookstore) SPA:

- **Data**: Book catalog defined as a static TypeScript array in `src/data/` (or similar) — no backend
- **Routing**: Not using React Router; multi-page feel achieved via conditional rendering or URL hash
- **Styling**: React-Bootstrap components + Bootstrap 5 utility classes
- **State**: Local component state (no Redux/Zustand)
- **Build**: Vite with `@vitejs/plugin-react` (Oxc-based JSX transform, not Babel for app code)
