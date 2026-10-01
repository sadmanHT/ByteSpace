# ByteSpace Engineering Documentation

The documentation in this directory records design provenance, implementation decisions, visual evidence, QA, and release handoff.

## Start here

| Document                                                                                           | Purpose                                                                  |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [Production walkthrough](WALKTHROUGH.md)                                                           | Route-by-route tour of the deployed application with screenshots         |
| [Design system](design-system.md)                                                                  | Visual tokens and native-Figma-derived design rules                      |
| [Asset inventory](asset-inventory.md)                                                              | Localized image provenance and asset-handling policy                     |
| [Shared UI audit](shared-ui-audit.md)                                                              | Shared shell and reusable UI verification                                |
| [Course catalogue audit](course-catalog-audit.md)                                                  | Course cards, domain data, discovery behavior                            |
| [Home page audit](home-page-audit.md)                                                              | Home composition and fidelity notes                                      |
| [Auth + 404 audit](phase6-auth-404-audit.md)                                                       | Authentication surfaces and not-found route                              |
| [Search + creator audit](phase7-search-creator-audit.md)                                           | Search/discovery and creator profile                                     |
| [Course detail audit](phase8-course-detail-audit.md)                                               | About/Lessons/Reviews ecosystem                                          |
| [Responsive/accessibility/performance audit](phase9-responsive-accessibility-performance-audit.md) | Final cross-browser, responsive, a11y, console/network and overflow gate |
| [Release audit](phase10-release-audit.md)                                                          | CI, PR, Vercel production deployment and post-deploy verification        |

## Native design evidence

The supplied native Figma package is the design source of truth.

- Package: <code>ByteSpace New Check website (Copy).fig</code>
- SHA-256: <code>a5c21e6873e4a024db448e30ad30703edc797a49bf4e1da4eaa2cc2dc8a97089</code>
- Figma design: https://www.figma.com/design/kfFdZSGAGn4TFvnKHK4qem/ByteSpace-New-Check-website--Copy-?node-id=0-1&p=f&t=gmF3WiJQh49Q4LGu-0

Generated native-source records such as <code>figma-assets.json</code> and <code>figma-source-audit.json</code> are retained so visual decisions remain traceable.

## Screenshot policy

Production documentation screenshots live in <code>docs/screenshots/</code>. They are generated from the public Vercel deployment by the <code>Production Screenshots</code> GitHub Actions workflow rather than manually redrawn.

The workflow can be run manually after future production releases.
