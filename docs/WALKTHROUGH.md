# ByteSpace Production Walkthrough

This document provides a route-by-route tour of the deployed ByteSpace frontend.

**Production:** https://bytespace-seven-neon.vercel.app  
**Verified release SHA:** <code>ef5829c1caa076d61c00e6014a84dc2be3821cd3</code>

The screenshots in this walkthrough are captured from the public Vercel deployment by <code>.github/workflows/docs-screenshots.yml</code>. That workflow uses Playwright so the documentation can be refreshed after a release instead of depending on manually edited images.

## 1. Home

**Route:** https://bytespace-seven-neon.vercel.app/

The Home experience introduces ByteSpace through a high-impact hero, course search, featured categories, reusable course cards, learning-path discovery, learner/creator editorial sections, and the shared footer.

![Home](screenshots/home.jpg)

Key implementation points:

- direct search submits to the courses route,
- category chips expose pressed state,
- repeated course UI is driven by shared domain records,
- visual assets are localized from the native design package,
- long editorial sections retain desktop composition while collapsing safely at narrow widths.

## 2. Course catalogue

**Route:** https://bytespace-seven-neon.vercel.app/courses

The catalogue demonstrates the reusable discovery system: query handling, filtering, sorting, pagination, and course cards.

![Courses](screenshots/courses.jpg)

The six canonical course records are stored once and reused across discovery, Home, and creator surfaces. “Most relevant” preserves curated fixture order rather than inventing an opaque ranking algorithm.

## 3. Course overview

**Route:** https://bytespace-seven-neon.vercel.app/courses/build-digital-asset

![Course overview](screenshots/course-about.jpg)

The course ecosystem shares media, metadata, creator information, price/enrollment presentation, and route-backed tabs across About, Lessons, and Reviews.

The enrollment/payment surface is intentionally an interaction boundary only; no backend/payment contract was supplied, so the UI does not collect payment data or simulate successful purchase.

## 4. Lessons

**Route:** https://bytespace-seven-neon.vercel.app/courses/build-digital-asset/lessons

![Lessons](screenshots/course-lessons.jpg)

Lessons are represented as their own URL rather than a hidden client-only tab. Direct linking, refresh, browser history, and back/forward navigation therefore behave predictably.

## 5. Reviews

**Route:** https://bytespace-seven-neon.vercel.app/courses/build-digital-asset/reviews

![Reviews](screenshots/course-reviews.jpg)

The reviews route includes summary information, individual review content, and accessible filtering/state while preserving the shared course-detail shell.

## 6. Creator profile

**Route:** https://bytespace-seven-neon.vercel.app/creators/purepearl-studio

![Creator profile](screenshots/creator-profile.jpg)

The creator profile reuses course catalogue primitives and adds local follow-state interaction. Follow state is intentionally not persisted because no creator-account backend contract exists.

## 7. Registration

**Route:** https://bytespace-seven-neon.vercel.app/register

![Register](screenshots/register.jpg)

The registration form implements persistent labels, keyboard-friendly controls, validation feedback, and safe frontend-only behavior. It does not fabricate an account/session.

## 8. Login

**Route:** https://bytespace-seven-neon.vercel.app/login

![Login](screenshots/login.jpg)

The sign-in experience mirrors the registration quality bar while keeping authentication semantics honest: validation is real, authentication success is not simulated.

## 9. Not found

**Example:** https://bytespace-seven-neon.vercel.app/this-route-does-not-exist

![Not found](screenshots/not-found.jpg)

Unknown routes render the branded not-found experience and return HTTP 404.

## 10. Responsive example

A narrow production capture of the canonical course route:

<img src="screenshots/mobile-course.jpg" alt="ByteSpace course overview at a narrow mobile viewport" width="390" />

Responsive verification covers 1440, 1280, 1024, 768, 390, and 320px, plus a 720 CSS-pixel viewport used as a 200% zoom-equivalent stress case.

## Release verification

At production handoff the following direct routes were fetched successfully:

- <code>/</code>
- <code>/register</code>
- <code>/login</code>
- <code>/courses</code>
- <code>/courses/build-digital-asset</code>
- <code>/courses/build-digital-asset/lessons</code>
- <code>/courses/build-digital-asset/reviews</code>
- <code>/creators/purepearl-studio</code>

Each returned HTTP 200. A random unknown path returned HTTP 404. Vercel reported no runtime error clusters during the verification window.

For implementation evidence, see <code>docs/README.md</code>.
