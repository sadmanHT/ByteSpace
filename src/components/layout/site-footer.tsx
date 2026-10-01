import Link from "next/link";

import { NewsletterForm } from "@/components/forms/newsletter-form";
import { BrandLogo } from "@/components/layout/brand-logo";

const browsePrimary = [
  ["Featured Courses", "/courses"],
  ["Featured Categories", "/courses#categories"],
  ["Business", "/courses?category=business"],
  ["IT", "/courses?category=it"],
  ["Design", "/courses?category=design"],
] as const;

const browseSecondary = [
  ["Development", "/courses?category=development"],
  ["Marketing", "/courses?category=marketing"],
  ["Photography", "/courses?category=photography"],
  ["Finance", "/courses?category=finance"],
  ["Sport", "/courses?category=sport"],
] as const;

const platform = [
  ["Become a Creator", "/register?role=creator"],
  ["Affiliate Program", "/about#affiliate"],
  ["Contact", "/contact"],
  ["Help", "/help"],
  ["About", "/about"],
] as const;

function FooterLinkList({ items }: { items: ReadonlyArray<readonly [string, string]> }) {
  return (
    <ul className="bs-footer__link-list">
      {items.map(([label, href]) => (
        <li key={label}>
          <Link className="bs-footer__link" href={href} prefetch={false}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter() {
  return (
    <footer className="bs-footer">
      <div className="bs-footer__content">
        <div className="bs-footer__main">
          <section
            className="bs-footer__newsletter-column"
            aria-labelledby="footer-newsletter-title"
          >
            <div className="bs-footer__brand-copy">
              <Link aria-label="ByteSpace home" href="/">
                <BrandLogo tone="footer" />
              </Link>
              <h2 className="sr-only" id="footer-newsletter-title">
                ByteSpace newsletter
              </h2>
              <p className="bs-footer__description">
                Stay Up to date with our latest features and releases by joining our newsletter.
              </p>
            </div>
            <NewsletterForm />
          </section>

          <nav aria-label="Footer" className="bs-footer__navigation">
            <div className="bs-footer__browse-column">
              <h2 className="bs-footer__heading">Browse</h2>
              <div className="bs-footer__browse-lists">
                <FooterLinkList items={browsePrimary} />
                <FooterLinkList items={browseSecondary} />
              </div>
            </div>
            <div className="bs-footer__platform-column">
              <h2 className="bs-footer__heading">Platform</h2>
              <FooterLinkList items={platform} />
            </div>
          </nav>
        </div>

        <div className="bs-footer__bottom">
          <p className="bs-footer__copyright">@ 2023 ByteSpace. All rights reserved.</p>
          <nav aria-label="Legal">
            <ul className="bs-footer__legal-links">
              <li>
                <Link href="/privacy" prefetch={false}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" prefetch={false}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" prefetch={false}>
                  Cookies Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
