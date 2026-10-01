# ByteSpace

ByteSpace is a capstone-quality frontend implementation of the supplied ByteSpace learning-platform design. The application reproduces the native Figma screens with a reusable Next.js/React architecture, typed course and creator domain models, deterministic frontend interactions, accessibility coverage, cross-browser QA, and production-oriented CI.

## Design source

The supplied design is the visual source of truth:

https://www.figma.com/design/kfFdZSGAGn4TFvnKHK4qem/ByteSpace-New-Check-website--Copy-?node-id=0-1&p=f&t=gmF3WiJQh49Q4LGu-0

Implementation and visual verification use the native local package `ByteSpace New Check website (Copy).fig` directly rather than Figma MCP.

Recorded native package SHA-256:

`a5c21e6873e4a024db448e30ad30703edc797a49bf4e1da4eaa2cc2dc8a97089`

## Live deployment

Production deployment is currently pending because this automation session can read the connected Vercel account but cannot create/import a new Vercel project or invoke a working deploy action. No unrelated Vercel project was modified. See `docs/phase10-release-audit.md` for the exact release blocker and completed validation evidence.

## Implemented routes

- `/` — Home
- `/register` — Register
- `/login` — Login
- `/courses` — Search/Courses
- `/courses/[slug]` — Course details
- `/courses/[slug]/lessons` — Course lessons/modules
- `/courses/[slug]/reviews` — Course reviews
- `/creators/[slug]` — Creator profile
- `/404` — explicit 404 experience
- unknown routes — framework custom not-found experience

The canonical fully designed course-detail route is `/courses/build-digital-asset`, and the canonical creator profile is `/creators/purepearl-studio`.

## Stack

- Next.js App Router
- React
- TypeScript in strict mode
- Tailwind CSS plus Figma-specific CSS where exact layout fidelity benefits from it
- pnpm
- ESLint + Prettier
- Vitest + React Testing Library
- Playwright
- axe-core accessibility scanning
- GitHub Actions CI
- Vercel deployment

## Architecture

The project keeps concerns deliberately separated:

- `src/app` — route composition and metadata
- `src/components/ui` — reusable UI primitives
- `src/components/layout` — shared shell
- `src/components/course` — reusable catalogue/course-card presentation
- `src/components/course-detail` — shared About/Lessons/Reviews course ecosystem
- `src/components/discovery` — search/filter/sort/pagination experience
- `src/components/creator` — creator profile presentation and local interaction
- `src/data` — immutable frontend fixture/domain data
- `src/lib` — deterministic filtering, sorting, pagination, route, review, and share helpers
- `src/types` — typed course, course-detail, and creator contracts
- `src/styles` — semantic tokens and screen-specific layout layers
- `tests/e2e` — runtime, visual, responsive, accessibility, and cross-browser coverage
- `docs` — native-Figma evidence and phase audits

Static/server-rendered content stays server-side by default. Client components are isolated to interactions such as forms, filters, follow state, category selection, sharing, and review filtering.

## Prerequisites

- Node.js `>=22.14.0 <23`
- pnpm `>=12.7.0 <13`

The exact package manager is pinned through `packageManager` in `package.json`.

## Install

```bash
pnpm install --frozen-lockfile
```

## Development

```bash
pnpm dev
```

Then open http://localhost:3000.

## Quality commands

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

The GitHub Actions Quality Gate runs these checks in a pinned Playwright `v1.63.0-noble` container for reproducible Chromium, Firefox, and WebKit behavior.

To run the Playwright suite against an already deployed environment instead of starting a local Next.js server:

```bash
PLAYWRIGHT_TEST_BASE_URL=https://your-deployment.example pnpm test:e2e
```

## Testing and QA

The final Phase 9 gate includes:

- 23 Vitest/RTL test files
- 50 unit/component tests
- 34 Playwright tests
- production build validation
- Chromium route coverage across 1440, 1280, 1024, 768, 390, and 320px
- Firefox and WebKit route smoke at desktop and narrow widths
- axe WCAG A/AA scanning
- keyboard reachability checks
- 200% zoom-equivalent layout stress
- direct-route, refresh, navigation, console, network, and overflow checks
- retained 1440px visual captures for all major routes

See `docs/phase9-responsive-accessibility-performance-audit.md` for the complete evidence record.

## Frontend-only behavior and backend boundaries

No backend contract was supplied, so the frontend does not fabricate production services.

- **Authentication:** accessible frontend validation only; no fake JWT, session, or credential persistence.
- **Enrollment/payment:** interactive boundary only; no payment details or simulated checkout success.
- **Follow:** local-only `aria-pressed` state; no persistence claim.
- **Search/filter/sort/pagination:** deterministic local behavior based on supplied fixture data.
- **Most relevant:** preserves curated fixture order instead of inventing a ranking algorithm.
- **Learning progress:** static display fixture where the Figma shows progress.
- **Newsletter:** frontend-only interaction.
- **Media preview:** accessible poster/play affordance; no playback is claimed without a supplied video source.
- **Share:** Web Share API when available with clipboard URL fallback.

The data/domain/presentation separation is intentionally REST-ready so fixture data can later be replaced by a real API without rewriting presentation components.

## Accessibility

Accessibility is treated as correctness. Coverage includes semantic landmarks, route titles, labels, accessible validation, status announcements, focus behavior, keyboard reachability, rating/progress semantics, pagination state, image alt text, contrast, narrow layouts, and axe scanning.

Where the source Figma contained a genuine WCAG contrast failure, the implementation keeps the layout and semantic intent while making the smallest foreground adjustment required for practical AA compliance.

## Assets and typography

Real raster assets were extracted/localized from the native `.fig` package and are served locally as optimized WebP files. The implementation does not depend on temporary Figma asset URLs.

Public/legal web-font loading is used for the design typography. Font files are not committed or redistributed.

## Environment variables

There are no required runtime environment variables.

Future variables must be documented in `.env.example`, and local secret files must not be committed.

## Repository workflow

- Default branch: `main`
- Implementation branch: `feature/bytespace-new`
- Feature work is not implemented directly on `main`.
- Final delivery is submitted as a Pull Request from `feature/bytespace-new` into `main`.
- The PR must not be merged unless explicitly requested.

## Design and engineering evidence

Notable audit files include:

- `docs/design-system.md`
- `docs/figma-source-audit.json`
- `docs/figma-assets.json`
- `docs/asset-inventory.md`
- `docs/shared-ui-audit.md`
- `docs/course-catalog-audit.md`
- `docs/home-page-audit.md`
- `docs/phase6-auth-404-audit.md`
- `docs/phase7-search-creator-audit.md`
- `docs/phase8-course-detail-audit.md`
- `docs/phase9-responsive-accessibility-performance-audit.md`

The isolated design-system/shared-UI/course-card fixture routes are retained as automated visual verification surfaces and are not part of the product route list above.
