import type { HTMLAttributes } from "react";

import { classNames } from "@/lib/class-names";

export type MetadataBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "level" | "neutral";
};

export function MetadataBadge({ className, variant = "neutral", ...props }: MetadataBadgeProps) {
  return (
    <span
      className={classNames("bs-metadata-badge", `bs-metadata-badge--${variant}`, className)}
      {...props}
    />
  );
}
