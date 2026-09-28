import type { ButtonHTMLAttributes } from "react";

import { classNames } from "@/lib/class-names";

export type ChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-pressed"> & {
  selected: boolean;
};

export function Chip({ className, selected, type = "button", ...props }: ChipProps) {
  return (
    <button
      aria-pressed={selected}
      className={classNames("bs-chip", className)}
      type={type}
      {...props}
    />
  );
}
