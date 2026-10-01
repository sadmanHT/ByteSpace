import type { ButtonHTMLAttributes } from "react";

import { classNames } from "@/lib/class-names";

export type ButtonVariant = "primary" | "accent" | "outline";
export type ButtonSize = "md" | "sm";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export function Button({
  className,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames("bs-button", `bs-button--${variant}`, `bs-button--${size}`, className)}
      type={type}
      {...props}
    />
  );
}
