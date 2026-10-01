import type { HTMLAttributes } from "react";

import { classNames } from "@/lib/class-names";

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={classNames("bs-container", className)} {...props} />;
}

export function TwelveColumnGrid({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={classNames("bs-grid", className)} {...props} />;
}
