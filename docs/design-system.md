# ByteSpace design-system foundation

Figma source of truth:

https://www.figma.com/design/kfFdZSGAGn4TFvnKHK4qem/ByteSpace-New-Check-website--Copy-?node-id=0-1&p=f&t=gmF3WiJQh49Q4LGu-0

Native source snapshot used for this audit:

- file: `ByteSpace New Check website (Copy).fig`
- SHA-256: `a5c21e6873e4a024db448e30ad30703edc797a49bf4e1da4eaa2cc2dc8a97089`
- exported: `2026-09-28T12:18:34.725Z`
- decoded canvas format: `fig-kiwi`, version 106
- decoded design nodes: 3,658
- embedded raster files: 58

The native local copy resolves the earlier MCP read-limit problem. Design-system facts below are now grounded in the exported Figma data rather than screenshot estimation.

## Product screens

The Design page contains these top-level product frames:

- Home — `1:1067` — 1440 × 6377
- Register — `47:351` — 1440 × 1024
- Login — `49:195` — 1440 × 1024
- Search Page — `55:117` — 1440 × 3853
- Course Details — `55:4066` — 1440 × 2717
- Course Lessons — `60:102` — 1440 × 2883
- Course Reviews — `60:681` — 1440 × 3449
- Creator Profile — `60:1878` — 1440 × 2136
- 404 Not Found — `63:252` — 1440 × 1485

## Layout grid

The Style Guide contains a dedicated layout-grid frame. Its copy and the actual layout-grid records agree:

- 12 columns,
- 120px left/right margin at the 1440px reference width,
- 40px gutters,
- 1200px constrained content width.

The same 12-column stretch grid is present on core production frames including Home, Register, Search, and Course Details.

## Exact color scales

### Persian Blue

- 50 — `#E7F6FF`
- 100 — `#D3EEFF`
- 200 — `#B0DDFF`
- 300 — `#81C5FF`
- 400 — `#4F9DFF`
- 500 — `#2872FF`
- 600 — `#0445FF`
- 700 — `#0043FF`
- 800 — `#003BE2`
- 900 — `#0B36A4`
- 950 — `#071E5F`

The dominant ByteSpace brand blue is **Persian Blue 800**, not 500.

### Electric Lime

- 50 — `#FDFFE4`
- 100 — `#FAFFC5`
- 200 — `#F2FF92`
- 300 — `#E4FF54`
- 400 — `#D4FB20`
- 500 — `#CBFC01`
- 600 — `#8CB400`
- 700 — `#6A8902`
- 800 — `#546B09`
- 900 — `#465A0D`
- 950 — `#243300`

The primary lime action/accent is **Electric Lime 400**.

### Shuttle Gray

- 50 — `#F5F5F6`
- 100 — `#E5E6E8`
- 200 — `#CED0D3`
- 300 — `#ABAEB5`
- 400 — `#82868E`
- 500 — `#666973`
- 600 — `#585A62`
- 700 — `#4B4C53`
- 800 — `#424348`
- 900 — `#3A3B3F`
- 950 — `#242528`

The previous preliminary token numbering was corrected from the native Figma data.

## Formal typography styles

The Style Guide defines these exact text styles:

- Heading L — node `76:1195` — Poppins SemiBold — 72px — 120% — -1% letter spacing
- Heading M — node `76:1200` — Poppins SemiBold — 44px — 120% — -1%
- Heading S — node `77:1209` — Poppins SemiBold — 36px — 120% — -1%
- Heading XS — node `76:1202` — Poppins SemiBold — 20px — 120% — -1%
- Body L — node `76:1193` — Satoshi Regular — 18px — 160%
- Body M — node `76:1194` — Satoshi Regular — 16px — 160%
- Body S — node `76:1203` — Satoshi Regular — 14px — 160%
- Body XS — node `76:1198` — Satoshi Regular — 12px — 160%
- Label XL — node `77:1210` — Satoshi Medium — 20px — 120%
- Label L — node `76:1196` — Satoshi Medium — 18px — 120%
- Label M — node `76:1197` — Satoshi Medium — 16px — 120%
- Label S — node `76:1199` — Satoshi Medium — 14px — 120%
- Label XS — node `76:1201` — Satoshi Medium — 12px — 120%

The live Design page also contains Clash Display Bold, Poppins Medium/Regular, and Satoshi Bold text. Those faces are loaded as part of the global foundation so later screens do not silently synthesize weights.

## Observed live font usage

Across the Design page, the most frequent font/style combinations are:

- Satoshi Regular — 406 text nodes
- Satoshi Medium — 346
- Poppins SemiBold — 111
- Clash Display Bold — 16
- Poppins Medium — 16
- Satoshi Bold — 5
- Poppins Regular — 4

The formal Style Guide remains the source for core typography tokens; live-screen usage explains the additional loaded faces.

## Spacing and radii

The native node data confirms the repeated compact rhythm. The most common stack gaps include 8px, 24px, 12px, 16px, 4px, and 40px. A repeated -8px gap is used for overlap patterns such as avatar stacks.

Common horizontal padding includes 12px, 16px, 24px, and 40px. Compact controls also use 8px. Common vertical padding includes 6px, 12px, 16px, 8px, and 40px.

Corner radius frequency is dominated by:

- 24px — 324 observed nodes,
- 12px — 40,
- 16px — 15,
- 100px — 7,
- 40px — 6.

The token layer therefore retains 12/16/24/full and adds the observed 40px large radius plus compact 4px/6px spacing values.

## Accessibility use of neutrals

The raw `#82868E` neutral remains part of the exact Figma palette. Automated contrast testing measured it at approximately 3.65:1 on white, so it is not used for 12px helper, caption, or placeholder text where WCAG AA requires 4.5:1. Those small-text roles use `#4B4C53` through the `text-secondary` semantic token instead.

This is a semantic usage constraint, not a replacement of the source palette.

## Primitive policy

The foundation contains a constrained `Container`, `TwelveColumnGrid`, `Button`, `TextField`, and selectable `Chip`. These components remain intentionally small. New variants should only be introduced after repeated Figma usage proves they are true design-system variants rather than page-specific exceptions.

All interactive primitives include keyboard focus treatment, disabled behavior where applicable, and reduced-motion handling.

## Asset evidence

The native file contains 58 raster files. Canvas inspection found 39 raster hashes referenced somewhere in the file and 38 referenced by the production product screens listed above. The product-screen raster assets account for 292 fill usages across avatars, course imagery, creator/reviewer imagery, hero cutouts, and decorative 3D assets.

The generated machine-readable inventory is stored in `docs/figma-assets.json`. It records exact content hashes, native dimensions, formats, Figma node IDs, screen usage, fill scale modes, and original Unsplash source references when those metadata are embedded in the file.

No generic replacement imagery is permitted.

## Verification route

Open `/design-system` at 1440px wide. It verifies:

- exact full color scales,
- semantic token mappings,
- heading/body/label typography,
- required font faces and weights,
- 1200px container,
- 12-column grid,
- 40px gutters,
- interaction primitives,
- accessibility,
- narrow-viewport overflow safety.

The Playwright suite captures the fixture at the desktop reference width and attaches the screenshot to the CI report.
