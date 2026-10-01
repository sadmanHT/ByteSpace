import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link, { type LinkProps } from "next/link";

import type { ButtonSize, ButtonVariant } from "@/components/ui/button";
import { classNames } from "@/lib/class-names";

export type ButtonLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
    size?: ButtonSize;
    variant?: ButtonVariant;
  };

export function ButtonLink({
  children,
  className,
  size = "md",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={classNames("bs-button", `bs-button--${variant}`, `bs-button--${size}`, className)}
      {...props}
    >
      {children}
    </Link>
  );
}
