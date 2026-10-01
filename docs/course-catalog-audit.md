# Phase 4 course catalogue native-Figma audit

Figma source reference:

https://www.figma.com/design/kfFdZSGAGn4TFvnKHK4qem/ByteSpace-New-Check-website--Copy-?node-id=0-1&p=f&t=gmF3WiJQh49Q4LGu-0

Implementation source: local native `ByteSpace New Check website (Copy).fig`.

Native source SHA-256: `a5c21e6873e4a024db448e30ad30703edc797a49bf4e1da4eaa2cc2dc8a97089`.

## Repeated course card

The native Search screen uses the repeated `Course_Card_1` component. The reference card `78:1907` is:

- 373 × 384,
- 24px outer radius,
- white fill,
- 1px inside Shuttle Gray 200 / `#CED0D3` stroke,
- 16px internal outer inset.

The Search card grid is 1199px wide and uses three 373px cards with 40px horizontal and vertical gaps.

## Media

Reference media node `78:1908`:

- 341 × 195.145,
- 12px radius,
- Figma image scale mode `FILL`,
- three metadata pills positioned over the lower-left of the image.

The metadata row is 315 × 26 with 12px gaps. The pill text uses Satoshi Medium 12 / 20 and 12px horizontal padding; the translucent fill is `#F6F6F6` at 60% opacity.

Reference values:

- `17 Lessons`,
- `2 hours 16 mins`,
- `59 Comments`.

## Typography and metadata

Reference Search card copy:

- title: Poppins SemiBold 20 / 28, -1% letter spacing,
- creator: Satoshi Regular 12 / 18,
- creator name: Persian Blue 800 / `#003BE2`,
- level: Satoshi Medium 12 / 20,
- price: Poppins SemiBold 20 / 28, Persian Blue 800,
- billing label: Satoshi Regular 12 / 18,
- rating value: Satoshi Regular 18 / 27,
- rating icon: 24px outlined Material star.

The Search-page Beginner badge is 97 × 32 with a 24px radius, Shuttle Gray 50 background, and Shuttle Gray 700 text. The reusable card also supports the green Home variant from the native component source without duplicating markup.

## Learners

The repeated stack is 128 × 32 with four 32px circular Figma image fills and -8px stack spacing. The Search overflow circle is Electric Lime 400 with dark text and shows `26+`. The Home component source also contains the dark overflow treatment.

The four learner images are the exact localized Phase 3 assets and remain content-addressed by their native Figma hashes.

## Canonical course data

The native file contains six unique course-card designs repeated across Home, Search, and Creator screens:

1. Learn Figma from Basic — node `78:1907` — image `93ad9f9e6bdb3c7f3c478820624ee19ad7320072`.
2. Build Digital Asset — node `78:1938` — image `c88264191d691ba3300ad4f82a942429bb912fa5`.
3. the Power of Big Data — node `78:1969` — image `4f3bdea5688b1a654db7a29b0bc5dd3563059d11`.
4. Balancing Productivity and Self-Care — node `78:2000` — image `72e18d90fb9ddac1944e3483a501f3cdae505f57`.
5. Mastering Money Management — node `78:2031` — image `a89789455304dbf5cadc8e011bc26c97145aa56c`.
6. From Idea to Startup Success — node `78:2062` — image `69362b026219ac3eb8b4e77e8bbe4e18c4464b44`.

All six visible reference cards use the same creator and card metadata:

- purepearl studio,
- Beginner,
- 17 lessons,
- 2 hours 16 mins,
- 59 comments,
- 4.5 rating,
- $25,
- /lifetime,
- 26+ learner overflow.

The Search canvas visibly repeats the same six records in three six-card groups. The application stores the six domain records once instead of manufacturing duplicate Course identities.

## Categories

The exact native Search category labels are:

- Featured,
- Music,
- Drawing & Painting,
- Marketing,
- Animation,
- Social Media,
- UI/UX Design,
- Creative Marketing,
- Cooking.

The visible reference catalogue has Featured selected, so the six canonical cards are grounded as `featured`. No unshown category assignment is invented for them. The filter helper still accepts the full visible category vocabulary and is tested with explicit fixture overrides.

## Asset treatment

Each course image is extracted from the native `.fig` raster bytes and converted to a 512 × 293 WebP derivative using the same centered `FILL` crop intent as the 341 × 195.145 media frame. Filenames preserve the Figma image hashes.

The derivatives are deliberately larger than the rendered card media at standard CSS pixel density while keeping the Phase 4 repository footprint small. Later performance QA can introduce responsive source sets if production measurements justify them.

## Behaviour

- query matching is case-insensitive,
- category and level filters compose,
- `Most relevant` preserves the source order unchanged,
- alternate sorts are stable and operate on copied arrays,
- pagination clamps boundaries,
- filtering never mutates fixture data,
- page state resets when query/category/level changes,
- empty results have an explicit status/heading state.

## Visual evidence

The `/course-card-fixture` route isolates the standard Search treatment, the longest native title, the Home success/dark variant, and a 320px narrow container. Playwright captures the fixture and the catalogue at the 1440px reference viewport and also runs a 390px overflow/focus smoke test.
