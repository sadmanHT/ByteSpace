import type { ButtonHTMLAttributes } from "react";

import { MaterialIcon, type MaterialIconName } from "@/components/ui/material-icon";
import { classNames } from "@/lib/class-names";

export type FilterControlProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: Extract<MaterialIconName, "category" | "filter" | "level" | "sort">;
};

export function FilterControl({
  children,
  className,
  icon,
  type = "button",
  ...props
}: FilterControlProps) {
  return (
    <button className={classNames("bs-filter-control", className)} type={type} {...props}>
      <MaterialIcon height={24} name={icon} width={24} />
      <span>{children}</span>
    </button>
  );
}
