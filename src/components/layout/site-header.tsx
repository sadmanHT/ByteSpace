import Link from "next/link";

import { BrandLogo } from "@/components/layout/brand-logo";
import { MaterialIcon } from "@/components/ui/material-icon";
import { classNames } from "@/lib/class-names";

export type HeaderNavigationItem = "courses" | "creators" | "home";

const navigation = [
  { id: "home" as const, href: "/", label: "Home" },
  { id: "courses" as const, href: "/courses", label: "Courses" },
  { id: "creators" as const, href: "/creators", label: "Creators" },
];

export type SiteHeaderProps = {
  activeItem?: HeaderNavigationItem;
  className?: string;
};

export function SiteHeader({ activeItem, className }: SiteHeaderProps) {
  return (
    <header className={classNames("bs-site-header", className)}>
      <div className="bs-site-header__inner">
        <Link aria-label="ByteSpace home" className="bs-site-header__logo" href="/">
          <BrandLogo />
        </Link>

        <nav aria-label="Primary" className="bs-site-header__nav">
          {navigation.map((item) => (
            <Link
              aria-current={activeItem === item.id ? "page" : undefined}
              className="bs-site-header__nav-link"
              href={item.href}
              key={item.id}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Account" className="bs-site-header__account">
          <Link className="bs-site-header__account-link" href="/login" prefetch={false}>
            Sign In
          </Link>
          <Link className="bs-site-header__account-link" href="/register" prefetch={false}>
            Join Us
          </Link>
          <Link aria-label="Shopping bag" className="bs-site-header__bag" href="/courses">
            <MaterialIcon height={24} name="shopping-bag" width={24} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
