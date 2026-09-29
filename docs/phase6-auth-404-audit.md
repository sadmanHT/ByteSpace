# Phase 6 — Auth and 404 native-Figma audit

Figma source reference:

https://www.figma.com/design/kfFdZSGAGn4TFvnKHK4qem/ByteSpace-New-Check-website--Copy-?node-id=0-1&p=f&t=gmF3WiJQh49Q4LGu-0

Implementation source: local native `ByteSpace New Check website (Copy).fig`.

Native source SHA-256: `a5c21e6873e4a024db448e30ad30703edc797a49bf4e1da4eaa2cc2dc8a97089`.

Figma MCP is not used for Phase 6 inspection.

## Frames

- Register — `47:351` — 1440 × 1024
- Login — `49:195` — 1440 × 1024
- 404 Not Found — `63:252` — 1440 × 1485

The native file thumbnail and embedded assets were inspected locally before implementation. The auth frames share the same blue grid composition and right-side white form panel. The 404 frame uses the shared ByteSpace header/footer treatment with a blue error hero.

## Register

Confirmed copy:

- Sign up and come in
- The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost
- Create an Account
- Welcome to ByteSpace
- Full Name / Jamie Davis
- Email / designer@example.com
- Password
- Continue
- Already have an account? Login

Desktop reference geometry:

- full frame: 1440 × 1024,
- form panel: x 741 / y 120 / w 579 / h 784,
- 24px rounded white panel,
- left editorial starts at the 120px layout margin.

## Login

Confirmed copy:

- Sign in with ease
- Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge.
- Sign In
- Welcome Back
- Email
- Password
- Sign In
- or
- New user? Create an account

The Login implementation reuses the same auth shell and field styling rather than duplicating the page.

## Native auth imagery

The local `.fig` package contains and references the auth decorative Matcap assets:

- `8670b841eac7883ecb790f84eb349c6c01db588b` — ring,
- `f9c0e0fd05db48405aa72287b20d04b9a01feb51` — faceted cone,
- `e3b55902d605bfc37a0809e6dc6dfe61b6701897` — spring.

The editorial composition also uses real localized course imagery and the shared ByteSpace learner avatars. Optimized WebP derivatives preserve transparency and the native source identity.

## 404

Confirmed copy:

- 404
- The page you are looking for doesn’t exist
- Try to use a correct url or go back to homepage to start again
- Back to Home

The source frame is 1440 × 1485. The implementation uses a 960px blue header/error region plus the existing 525px shared footer so the desktop frame height remains 1485px.

Native 404 decorative Designer Tap assets are localized from these source hashes:

- `24321b8894c48b04befaa9e71f204daacc40bbc4`,
- `6be36b89bfec399afb445a39d9bf4cb181332d48`,
- `d5e9c4dc379dbf3d1f6679a4423483f6766a7931`,
- `f1057d714a93edf29b02a9dbdb4fc552fd7ab847`.

## Frontend-only auth boundary

No authentication backend contract is supplied. Phase 6 therefore implements only:

- required-field validation,
- email-shape validation,
- password input privacy,
- accessible inline errors,
- a valid-form boundary announced to assistive technology.

The implementation does not create tokens, persist credentials, log passwords, or display a fake authenticated state.

## Verification

Playwright verifies:

- 1440 × 1024 auth frames,
- exact form-panel geometry,
- empty and invalid form states,
- valid frontend-only submit boundary,
- no credential console leakage,
- unknown-route custom 404,
- explicit `/404` route,
- working Back to Home navigation,
- 1440 × 1485 desktop 404 geometry,
- axe WCAG checks,
- 390px horizontal-overflow safety.

CI captures Register, Login, and 404 screenshots in the retained Playwright report.
