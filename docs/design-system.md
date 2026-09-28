# ByteSpace design-system foundation

Figma source of truth:

https://www.figma.com/design/kfFdZSGAGn4TFvnKHK4qem/ByteSpace-New-Check-website--Copy-?node-id=0-1&p=f&t=gmF3WiJQh49Q4LGu-0

## Confirmed foundation

The Phase 2 Figma inspection established the following reusable foundation:

- desktop reference canvas: 1440px,
- constrained content width: 1200px,
- outer margins at the desktop reference: 120px,
- 12-column grid,
- 40px grid gutters,
- primary blue: `#003BE2`,
- accent lime: `#D4FB20`,
- primary dark neutral: `#242528`,
- supporting neutrals: `#4B4C53`, `#82868E`, `#CED0D3`, `#E5E6E8`, `#F5F5F6`,
- Poppins SemiBold for primary headings,
- Satoshi Regular/Medium for body copy and labels,
- repeated spacing values: 8, 12, 16, 24, 40px,
- repeated radii: 12, 16, 24px and pill/full.

The CSS custom properties in `src/styles/tokens.css` are the single source for these repeated visual values.

## Typography scale

| Token          |          Size | Line height | Family / weight |
| -------------- | ------------: | ----------: | --------------- |
| Heading L      |          72px |        120% | Poppins 600     |
| Heading M      |          44px |        120% | Poppins 600     |
| Heading S      |          36px |        120% | Poppins 600     |
| Heading XS     |          20px |        120% | Poppins 600     |
| Body L         |          18px |        160% | Satoshi 400     |
| Body M         |          16px |        160% | Satoshi 400     |
| Body S         |          14px |        160% | Satoshi 400     |
| Body XS        |          12px |        160% | Satoshi 400     |
| Label L/M/S/XS | 18/16/14/12px |        120% | Satoshi 500     |

## Primitive policy

The foundation currently contains a constrained `Container`, `TwelveColumnGrid`, `Button`, `TextField`, and selectable `Chip`. These components are intentionally small. New variants should only be introduced after repeated Figma usage proves they are real design-system variants rather than page-specific exceptions.

All interactive primitives include keyboard focus treatment, disabled behavior where applicable, and reduced-motion handling.

## Font delivery

Poppins 600 is loaded from Google Fonts and Satoshi 400/500 from Fontshare's official CSS endpoint. Both are exercised on the isolated `/design-system` route and checked by the browser smoke suite so a missing font face is not silently accepted.

## Asset inventory status

Image/icon export is intentionally not guessed. The connected Figma Starter plan reached its MCP tool-call limit while Phase 2 was being executed, so current design nodes cannot be re-opened to produce trustworthy node IDs, native dimensions, crop rules, or downloadable originals.

No placeholder logo, illustration, photo, or approximate icon has been introduced. Screen-specific image/icon assets remain gated until Figma export access is available again. This is preferable to committing substitutes that would violate the design source of truth.

When access resumes, record every exported asset with:

- local filename,
- Figma node/source,
- type,
- usage routes,
- native dimensions,
- optimization performed,
- alt-text role.

## Verification route

Open `/design-system` at 1440px wide. It isolates:

- core colors,
- heading/body pairing,
- 1200px container,
- 12-column grid,
- 40px gutters,
- 12/24px radii,
- button variants and disabled state,
- chip selected state,
- input default/error states,
- blue surface + lime CTA pairing.

The Playwright suite captures this fixture at the desktop reference and attaches the screenshot to the HTML report while also running axe accessibility checks.
