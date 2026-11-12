# jaf107.github.io

Personal academic site of Abu Jafar Saifullah: research, publications, projects and CV.
Live at **https://jaf107.github.io**.

React 18 + TypeScript, built with Vite. Pages are prerendered to static HTML at build time,
so the site reads fine without JavaScript and every page has its own title, description and
social preview. Deployed to GitHub Pages by GitHub Actions.

## Quick start

Needs Node 20+ and pnpm (the version is pinned in `package.json`; `corepack enable` picks it up).

```bash
pnpm install
pnpm dev          # http://localhost:8080
```

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server with hot reload |
| `pnpm build` | Client build, SSR build, then `scripts/prerender.mjs` writes static HTML for every route plus `sitemap.xml` |
| `pnpm preview` | Serve the built `dist/` locally |
| `pnpm lint` / `pnpm typecheck` | ESLint / TypeScript |
| `pnpm test` | Vitest: content-file checks and a server render of every route |
| `pnpm test:a11y` | axe-core WCAG 2.2 AA audit of every built page, light and dark (run `pnpm build` first) |
| `pnpm check:cv` | Fails if `resume/cv.tex` changed after the CV PDF was last rebuilt |

## Editing content

Almost everything on the site comes from JSON in `src/data/`; no component changes needed.

| File | Section |
| --- | --- |
| `profile.json` | Name, email, profile links (GitHub, LinkedIn, Scholar, ORCID). Also feeds the structured data and `rel="me"` links in the built HTML |
| `research.json`, `news.json`, `publications.json` | Research experience, News, Publications |
| `projects.json` | Project cards and the detail page at `/project/<id>/`. `"listed": false` keeps a page reachable by link but off the projects grid |
| `jobs.json`, `education.json`, `awards.json`, `skills.json` | The matching sections |

Images and PDFs go in `public/` and are referenced from the root, e.g. `/assets/projects/nava11y/architecture.webp`.
`pnpm test` fails if a referenced file is missing.

## Curriculum Vitae

`resume/cv.tex` is the master copy. After editing it:

```bash
scripts/sync-cv.sh          # needs latexmk and pdfinfo
```

This rebuilds `public/Abu_Jafar_Saifullah_CV.pdf` (served at `/cv`) and, when it finds the
Google Drive folder, copies the PDF and `.tex` there too (set `CV_DRIVE_DIR` to point it at
the folder). Commit the `.tex` and the PDF together; CI's `check:cv` step fails otherwise.

## Project layout

```
src/
  components/     Page sections (Hero, Publications, Projects, ...) and detail/ for project pages
  pages/          Routes: home, project detail, not found
  data/           Site content (JSON)
  entry-server.tsx  Server render entry used by the prerender step
scripts/
  prerender.mjs   Writes per-route HTML, metadata, JSON-LD and sitemap.xml into dist/
  sync-cv.sh      Builds the CV PDF and syncs it to the site and Google Drive
  check-cv.mjs    CV freshness check
  a11y.mjs        axe-core audit of the built site
tests/            Vitest tests
resume/cv.tex     CV source
```

## CI and deployment

`.github/workflows/deploy.yml` runs on every pull request and push to `main`: lint, typecheck,
tests, the CV check, the build, the axe audit and Lighthouse budgets (`lighthouserc.json`).
On `main` it then publishes `dist/` to the `gh-pages` branch, which GitHub Pages serves.
Dependabot opens monthly update PRs for npm packages and Actions.
