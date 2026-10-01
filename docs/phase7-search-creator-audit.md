# Phase 7 — Search/Courses and Creator Profile native-Figma audit

Figma source reference:

https://www.figma.com/design/kfFdZSGAGn4TFvnKHK4qem/ByteSpace-New-Check-website--Copy-?node-id=0-1&p=f&t=gmF3WiJQh49Q4LGu-0

Implementation source: local native `ByteSpace New Check website (Copy).fig`.

Native source SHA-256: `a5c21e6873e4a024db448e30ad30703edc797a49bf4e1da4eaa2cc2dc8a97089`.

Figma MCP is not used for Phase 7 inspection.

## Search Page

Source frame: `55:117` — 1440 × 3853.

Native geometry:

- blue hero: y 0 / h 360,
- heading: x 523.5 / y 164 / 393 × 43,
- search group: x 408 / y 239 / 624 × 52,
- search field: 461 × 52,
- purple Courses scope: 147 × 48,
- filter row: x 119 / y 432 / 1201 × 48,
- category tabs: x 120 / y 512 / 1200 × 43,
- course grid: x 121 / y 632 / 1199 × 2504,
- pagination: x 588 / y 3208 / 314 × 48,
- footer: y 3328 / h 525.

The native grid contains 18 placements in six rows. Only six canonical course records are present; the source repeats those six course designs. Phase 7 therefore repeats canonical view placements for the pristine search state instead of inventing new course metadata. The five visible pagination states deterministically rotate those canonical placements.

Confirmed Search copy includes:

- Find Your Next Course
- Search
- Courses
- Filter
- Level
- Category
- Most relevant
- Featured
- Music
- Drawing & Painting
- Marketing
- Animation
- Social Media
- UI/UX Design
- Creative Marketing
- Cooking
- pagination 1–5.

Filtering operates over the canonical course records. Because the source fixtures only classify these six courses as Featured/Beginner, selecting an unsupported category or level honestly produces the empty state rather than fabricating metadata.

## Creator Profile

Source frame: `60:1878` — 1440 × 2136.

Native geometry:

- hero: y 0 / h 592,
- profile content: x 122 / y 172 / 1198 × 338,
- avatar: x 122 / y 172 / 96 × 96,
- name: x 242 / y 180,
- role: x 242 / y 231,
- biography: x 122 / y 308 / 1197 × 116,
- metrics/follow row: x 122 / y 464 / 1198 × 46,
- catalogue body: y 592 / h 1019,
- filter row: x 119 / y 654 / 1201 × 48,
- six-card grid: x 119 / y 742 / 1199 × 808,
- footer: y 1611 / h 525.

Creator identity is sourced exactly from the native file:

- PurePearl Studio
- Creator
- Passionate UI/UX, Web designer
- 3 Products
- 12 Followers
- Follow.

The source biography contains the literal placeholder `[Creator's Name]` and the second source line begins `ive into my creative portfolio...`. Those strings are preserved instead of silently correcting the supplied design copy.

The native profile avatar is Figma image hash `b44979e1c98ecb3ec92ac86805fe55581fbeaa60`, already localized in the shared avatar assets.

## Follow behavior

No persistence/backend contract exists. Follow is therefore a local `aria-pressed` toggle only. Reloading the page returns to the source `Follow` state. It does not update a database, create a token, or claim persistence.

## Verification

Phase 7 automated checks cover:

- exact 1440 × 3853 Search geometry,
- exact 18-card pristine Search grid,
- search filtering,
- category filtering and stable empty state,
- pagination,
- deterministic sorting,
- opening a course,
- exact 1440 × 2136 Creator geometry,
- source creator identity and metrics,
- local follow/unfollow semantics,
- creator filters/sort,
- shared CourseCard reuse,
- course navigation,
- footer reachability,
- axe WCAG checks,
- console/network cleanliness,
- 390px horizontal-overflow safety.

CI retains full-page Search and Creator screenshots for visual review.
