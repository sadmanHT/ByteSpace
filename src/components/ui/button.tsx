import type { ButtonHTMLAttributes } from "react";

import { classNames } from "@/lib/class-names";

export type ButtonVariant = "primary" | "accent" | "outline";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({
  className,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames("bs-button", `bs-button--${variant}`, className)}
      type={type}
      {...props}
    />
  );
}
