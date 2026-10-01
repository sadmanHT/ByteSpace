# Security Policy

## Supported scope

ByteSpace is currently a frontend-only application. It does not implement a production authentication backend, payment processing, credential storage, or server-side account persistence.

The current release requires no runtime environment variables and should not contain application secrets.

## Reporting a vulnerability

Please **do not open a public GitHub issue** for a vulnerability that could expose users, credentials, private data, deployment access, or repository security.

Use GitHub's private vulnerability reporting / Security Advisory flow for this repository when available. If that option is not available, contact the repository owner through the GitHub profile and request a private channel before sharing exploit details.

Include:

- the affected route/component,
- reproduction steps,
- impact,
- browser/runtime details when relevant,
- screenshots or proof-of-concept material if safe to share privately.

## Security expectations for contributions

- Never commit secrets or local <code>.env</code> files.
- Do not add fake credentials or realistic credential fixtures.
- Treat user-provided text as untrusted input.
- Preserve safe URL/navigation behavior.
- Keep dependencies pinned through the lockfile.
- Run the full quality gate before release.
- Prefer platform/browser APIs over custom security-sensitive implementations.

## Dependency and platform issues

If a report concerns Next.js, React, Vercel, Playwright, or another upstream dependency, include the exact affected version and whether the issue reproduces in ByteSpace specifically.

Security fixes should be released without unnecessarily publishing exploit details before remediation is available.
