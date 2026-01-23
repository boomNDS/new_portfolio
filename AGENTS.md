# Repository Guidelines

## Project Structure & Module Organization
- `app.vue` hosts the root layout and global app shell.
- `pages/` contains route-level Vue SFCs (file-based routing).
- `components/` holds reusable UI components.
- `content/` stores Nuxt Content markdown/data; configured in `content.config.ts`.
- `public/` is for static assets served as-is (images, icons).
- `server/` contains Nitro server endpoints and server-only utilities.
- `utils/` and `types/` contain shared helpers and TypeScript types.
- `test/` contains Vitest specs (e.g., `smoke.spec.ts`).
- Build outputs are generated in `.nuxt/`, `.output/`, and `dist/`.

## Build, Test, and Development Commands
- `yarn dev` — start the local Nuxt dev server at http://localhost:3000.
- `yarn build` — build the production bundle.
- `yarn preview` — run the built app locally.
- `yarn generate` — generate a static site build.
- `yarn test` — run Vitest in CI mode.
- `yarn lint` — run ESLint and Prettier checks.
- `yarn lint:fix` — auto-fix lint and formatting issues.

## Coding Style & Naming Conventions
- Use 2-space indentation in Vue SFCs and config files (Prettier enforced).
- Favor TypeScript for new code; keep types in `types/` when shared.
- Vue component files use `PascalCase.vue`; composables/utilities use `camelCase`.
- Linting is configured in `eslint.config.mjs` and aligned with Prettier.

## Testing Guidelines
- Test runner: Vitest with Nuxt test utils (`vitest.config.ts`).
- Name tests `*.spec.ts` and place them under `test/`.
- Prefer fast, focused tests; keep smoke coverage for core routes/components.

## Commit & Pull Request Guidelines
- Commit messages follow Conventional Commits 1.0.0-beta.4 (e.g., `fix: ...`, `chore: ...`).
- PRs should include a clear description, scope of changes, and testing notes.
- For UI changes, attach before/after screenshots or a short clip.
- Link related issues (e.g., “Closes #123”) when applicable.

## Configuration & Tooling Notes
- Package manager: Yarn 4 (`packageManager` in `package.json`).
- Node version: 24.x (see README badge).
- Husky is enabled for local hooks (`.husky/`).
