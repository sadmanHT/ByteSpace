# ByteSpace asset inventory

Figma source of truth:

https://www.figma.com/design/kfFdZSGAGn4TFvnKHK4qem/ByteSpace-New-Check-website--Copy-?node-id=0-1&p=f&t=gmF3WiJQh49Q4LGu-0

Native source snapshot:

- `ByteSpace New Check website (Copy).fig`
- SHA-256 `a5c21e6873e4a024db448e30ad30703edc797a49bf4e1da4eaa2cc2dc8a97089`
- export timestamp `2026-09-28T12:18:34.725Z`

## Inventory policy

Every production image, logo, icon, or illustration must be traceable to the native Figma source before it is used.

For raster imagery, the exported `.fig` file provides content-addressed image hashes. The generated inventory records:

- exact Figma image hash,
- original format,
- native dimensions,
- original byte size,
- source URL where embedded,
- paint name where embedded,
- product screens using the image,
- usage count,
- exact Figma node IDs,
- Figma scale mode.

Assets must be localized once and reused. Figma asset hashes are the canonical identity even if a production optimization later changes the file extension.

## Native-file results

The uploaded local copy is a valid Figma archive containing:

- `canvas.fig`,
- `meta.json`,
- `thumbnail.png`,
- 58 embedded raster image files.

The canvas decodes as `fig-kiwi` version 106 and contains 3,658 nodes.

Raster analysis found:

- 58 embedded raster files total,
- 39 hashes referenced by the complete canvas,
- 38 hashes referenced by production product screens,
- 292 product-screen image-fill usages.

One additional referenced image belongs to a presentation/reference canvas rather than a production web screen.

The complete generated product-screen manifest is `docs/figma-assets.json`.

## Major asset groups

The native file includes:

- recurring 200×200 and 300×300 learner/creator avatars,
- recurring 682×454 course photographs,
- Course Details preview images at 480px-class sizes,
- a 1440×960 course media image shared by Details/Lessons/Reviews,
- creator/reviewer portraits,
- Home hero cutouts,
- 2500×2500 Matcap Collection decorative assets,
- 2500×2500 Designer Tap decorative assets reused across Home, Search, course pages, and 404.

Several JPEGs retain their original Unsplash source URL in embedded metadata. Those source URLs are recorded in the generated manifest for provenance, but the implementation should use the localized project asset rather than hotlinking the external source.

## Binary localization

The exact original raster bytes were extracted from the native `.fig` file in the implementation workspace and matched back to canvas image hashes.

The GitHub connector used in this environment exposes text/Git-blob writes but no direct local-binary upload bridge. Therefore the manifest and source provenance are committed now, while binary placement into `public/` will be performed when each production screen is implemented, using the extracted source asset for that screen. No substitute image is allowed during that handoff.

This limitation is about transport into the repository, not uncertainty about the design source: the exact image hashes, dimensions, source nodes, and original bytes are available from the uploaded native file.

## Vector assets

Vector/logo/icon nodes are present directly in the decoded canvas. They are not replaced with icon-library approximations. Screen implementation phases must serialize the relevant native vector geometry or use an exact existing project match before a component is accepted.

## Font dependencies

Typography is verified independently by the browser suite:

- Poppins 400/500/600,
- Satoshi 400/500/700,
- Clash Display 700.

The core formal style guide uses Poppins SemiBold and Satoshi Regular/Medium; the additional faces are present in live design screens.

## Completion rule for a production asset

An asset is accepted only when its:

- source identity,
- native dimensions,
- product callsite,
- crop/scale behavior,
- effective rendered geometry,
- alt-text role,
- optimization output

have been verified against the native Figma record and the rendered screen.
