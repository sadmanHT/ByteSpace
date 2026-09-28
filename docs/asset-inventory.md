# ByteSpace asset inventory

Figma source of truth:

https://www.figma.com/design/kfFdZSGAGn4TFvnKHK4qem/ByteSpace-New-Check-website--Copy-?node-id=0-1&p=f&t=gmF3WiJQh49Q4LGu-0

## Inventory policy

Every production image, logo, icon, or illustration must be traced to an exact Figma node before it is added to the project. The inventory records:

- local filename,
- Figma node/source,
- asset type,
- usage routes,
- native dimensions,
- optimization performed,
- alt-text role.

Assets are downloaded once, stored locally, reused from code, and never left as temporary Figma URLs. Exact Figma assets must not be replaced with approximate glyphs or generic imagery.

## Current status

The connected Figma Starter plan reached its MCP tool-call limit during Phase 2 before current design nodes could be reopened for trustworthy asset enumeration and export.

For that reason:

- no image/icon entry is being fabricated,
- no guessed Figma node ID is being recorded,
- no placeholder logo, photo, illustration, or approximate icon is being introduced,
- no temporary Figma asset URL is present in the Phase 2 foundation,
- exact localization remains a gated follow-up when Figma inspection access resumes.

## Verified asset inventory

| Local file | Figma node/source | Type | Usage routes | Native dimensions | Optimization | Alt-text role | Status |
| ---------- | ----------------- | ---- | ------------ | ----------------- | ------------ | ------------- | ------ |
| —          | —                 | —    | —            | —                 | —            | —             | Exact Figma export pending MCP access |

## Font dependencies

Typography is separately verified by the browser suite:

| Family | Weight | Delivery | Usage | Verification |
| ------ | ------ | -------- | ----- | ------------ |
| Poppins | 600 | Google Fonts CSS | Primary headings | Playwright font-load assertion |
| Satoshi | 400, 500 | Fontshare CSS | Body copy and labels | Playwright font-load assertion |

Font delivery is not treated as a substitute for the image/icon inventory above.

## Completion rule

This inventory must be populated only after the relevant Figma nodes can be inspected again. An asset is complete only when its local file, exact source node, dimensions, optimization, callsite, rendered geometry, and alt-text role have all been verified.
