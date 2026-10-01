# Phase 8 native `.fig` audit

Source package: `ByteSpace New Check website (Copy).fig`  
SHA-256: `a5c21e6873e4a024db448e30ad30703edc797a49bf4e1da4eaa2cc2dc8a97089`

Native frames inspected directly from `canvas.fig`:

- `55:4066` — Course Details — `1440 × 2717`
- `60:102` — Course Lessons — `1440 × 2883`
- `60:681` — Course Reviews — `1440 × 3449`

Shared native shell facts:

- hero/shared frame is ~`1440 × 957/958`
- title group starts near `x=122, y=172`
- media preview is `x=125, y=416, 720 × 479`, radius `24`
- enrollment sidebar is `x=908, y=416, 412 × 959`, radius `24`, 1px black stroke
- title: `Build Digital Asset: A Comprehensive Guide`
- subtitle: `Unlock the Power of Digital Creation with Expert Guidance`
- metadata: `Intermediate`, `4.8 (172 reviews)`, `199 Students`
- sidebar: `112 Lessons (24 hours)`, `$25/lifetime`, `Enroll Now`
- source poster image hash: `71d7929ee0ecb2198c9955a8e842f4991dcb4655`
- creator image hash: `bfd09b20f2cf44bfa3af771f6396363d4ae67aab`

About body (`55:4116`): content starts around `x=120, y=1019`; it contains Description, four `167 × 125` Sneak Peak images, eight Key Points, and the shared route navigation.

Lessons body (`60:104`): content starts around `x=120, y=1036`; native copy includes modules 1, 2, 4, 5, 6, and 7 and static Learning Progress `55%`. Progress is implemented as fixture/display data with native `<progress>` semantics, not persistence.

Reviews body (`60:683`): aggregate rating is `4.7`; distribution source values are `720 / 120 / 21 / 12 / 16`; review filters are All rating / 5 / 4 / 3 / 2 / 1. Reviewer source names are PurePearl Studio, Albert Flores, Cody Fisher, and Brooklyn Simmons.

Behavior boundaries:

- Share uses Web Share when available and clipboard URL fallback otherwise, with accessible status feedback.
- Enrollment is interactive but explicitly stops at the missing payment/backend boundary.
- The preview play affordance is interactive and explains that no video source exists; it does not simulate playback.
- Only `build-digital-asset` has supplied Phase 8 detail content. Existing catalogue routes for the other five fixtures retain a truthful route foundation rather than fabricated detail copy.
