# Phase 5 Home page native-Figma audit

Figma source reference:
https://www.figma.com/design/kfFdZSGAGn4TFvnKHK4qem/ByteSpace-New-Check-website--Copy-?node-id=0-1&p=f&t=gmF3WiJQh49Q4LGu-0

Implementation source: local native ByteSpace New Check website (Copy).fig.
Native source SHA-256: a5c21e6873e4a024db448e30ad30703edc797a49bf4e1da4eaa2cc2dc8a97089.

## Home frame

Home is node 1:1067, 1440 x 6377, on the same 12-column / 120px margin / 40px gutter system established in Phase 2.

Major sections are:

- Hero 1:1695, 1440 x 1024.
- Partner strip 1:1794, 1440 x 202.
- Discovery intro 12:101.
- Category rows 21:33, 21:56 and 21:63.
- Featured course grid 33:683, 1199 x 808.
- Learning-path intro 34:684.
- Learning-path cards 34:725, 1202 x 167.
- Editorial/growth frame 34:1159, 1440 x 1460.
- Creator CTA 34:1161, 1440 x 488.
- Testimonials 34:1175, 1440 x 784.
- Footer 34:1256, 1440 x 525.

## Hero

Heading: Get Access to Hundreds Courses Available.
Supporting copy: Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses.

The native search group is 581 x 52 with placeholder Course, topic, creator. The person image is node 1:1796 and image hash 29a52a24e51266edcd7d57d73392ee5fc4833220.

## Discovery

The native heading is Discover Your Passion, Build Your Skills. All three Figma category rows are implemented. Featured is selected at first render; alternate chip state remains local because the native Home source does not define alternate course records for every Home category.

The exact Phase 4 CourseCard system and six canonical records are reused for the 3 x 2 Home grid.

## Learning paths

The six visible cards are Design, Development, IT & Software, Business, Marketing and Photography.

## Editorial frame

The first composition uses Your Path to Professional Growth Starts Here!, with 12K Students, 70+ Courses and 16 Creators. It reuses the native learner image and the Phase 4 card.

The second composition uses Create & Manage Courses Easily. and the native creator image hash 0d6596fb1df66aaf843ee85722f439fada233946. Native bullets are Share Your Expertise, Monetize Your Passion, Flexibility and Autonomy, and Build a Community.

## Creator CTA

The native heading is Unlock Your Potential as a Creator with ByteSpace and the action label is Join as Creator. The current target is the existing /creators foundation route so Phase 5 remains functional without pretending later authentication or creator-profile work is already complete.

## Testimonials

The native author/content associations are preserved for Sarah M. (Enthusiastic Learner), James L. (Lifelong Learner), and Alex B. (Inspired Creator).

## Asset and performance treatment

The native hero learner is priority-loaded. Below-fold imagery remains lazy by default. Existing Phase 4 course derivatives are reused. Home image filenames preserve native Figma hashes. Decorative geometric layers are CSS and pointer-inert.

## Accessibility fidelity

The native Home course-card success badge uses #18CF6D text on #DAFEE9. At the native 12px label size that foreground is below WCAG AA contrast. Phase 5 preserves the #DAFEE9 Figma background and success semantics but uses #166534 for the text/icon foreground so the repeated Home cards remain readable without changing their structure or hierarchy.

## Verification

The Home E2E suite captures the full page plus hero, course grid, editorial section, creator CTA, testimonials, and footer at 1440px. It also runs axe, console/network monitoring, interaction/navigation checks, and a 390px overflow/focus smoke test.
