# Phase 3 shared UI native-Figma audit

Figma source reference:

https://www.figma.com/design/kfFdZSGAGn4TFvnKHK4qem/ByteSpace-New-Check-website--Copy-?node-id=0-1&p=f&t=gmF3WiJQh49Q4LGu-0

Implementation source: local native `ByteSpace New Check website (Copy).fig`.

Native source SHA-256: `a5c21e6873e4a024db448e30ad30703edc797a49bf4e1da4eaa2cc2dc8a97089`.

## Header

The repeated production header is a 1440 × 120 frame. The Home header uses:

- header frame: `1:1778`,
- center nav: `1:1779` — 210 × 26 at x 614.5 / y 47 with 24px gaps,
- account nav: `1:1783` — 174 × 24 at x 1146 / y 48 with 24px gaps,
- logo group: `1:1787` — 171 × 37 at x 122 / y 35,
- logo vector: `1:1788` — 28.875 × 31.5,
- wordmark: `1:1789` — Clash Display Bold 24,
- shopping-bag icon: `1:1786` — Material Icons Outlined 24.

The logo vector is serialized directly from native Figma geometry rather than approximated.

Home navigation text uses 16px Satoshi. The active Home item is heavier than the remaining links. Repeated search/course/creator/404 headers preserve the same geometry.

## Footer

The Home footer is node `34:1256`:

- 1440 × 525,
- white background,
- top separator,
- 1200px content frame at x 120 / y 71,
- 92px gap between the 528px newsletter column and 580px navigation area,
- 130px vertical gap before the copyright block.

Newsletter details:

- input: `34:1267` — 376 × 52, full-pill radius, 1px #D1D1D1 border,
- action: `34:1269` — 104 × 46, 24px radius, #7F30F7 fill,
- input/button gap: 24px,
- legal copy: 10px Satoshi Regular.

The footer logo uses the same exact vector geometry as the header with a #7F30F7 mark and dark wordmark.

## Search field

The Search screen field at `55:860` is:

- 461 × 52,
- white,
- 24px radius,
- 24px horizontal padding,
- 8px icon/text gap,
- 24px Material Search icon,
- 18px Satoshi Regular placeholder.

## Filters and sort

Search-page controls:

- Filter `55:170` — 96 × 48,
- Level `55:173` — 97 × 48,
- Category `55:176` — 127 × 48,
- Most relevant `55:179` — 157 × 48.

They share:

- 24px radius,
- white fill,
- 1px #D1D1D1 border,
- 16px horizontal padding,
- 4px icon/text gap,
- 24px exact Figma Material icon geometry,
- 16px Satoshi Medium label.

## Category chips

The production category tabs at `55:1819` use:

- 43px height,
- 24px radius,
- 16px horizontal / 12px vertical padding,
- 16px inter-chip gap,
- 16px Satoshi Medium,
- selected: #D4FB20 / #242528,
- unselected: #F5F5F6 / #4B4C53.

## Pagination

Pagination group `55:834` is 314 × 48 with 24px gaps.

- previous `55:835`: 56 × 48, radius 24, white + #D1D1D1 border,
- next `55:842`: same,
- page labels: Poppins SemiBold 20 / 28,
- exact back/forward vector geometry is serialized from the native icon instance.

## Avatar stack

The repeated learner stack at `13:265` is 128 × 32:

- four 32px circular Figma image fills,
- -8px layout spacing / 8px overlap,
- final 32px black overflow circle,
- 12px Satoshi Medium white overflow label.

The Phase 3 fixture uses optimized 64px derivatives of the exact four native image assets. Filenames retain the Figma content hashes for provenance.

## Metadata badge

Beginner badge `13:263` is 97 × 32:

- 24px radius,
- #DAFEE9 background,
- 12px horizontal / 6px vertical padding,
- 12px Satoshi Medium.

## Evidence policy

All values above come from the native local `.fig` package. Figma MCP is not used for Phase 3 design inspection. The browser fixture at `/shared-ui` is tested at 1440px and 390px and is captured in Playwright CI artifacts.
