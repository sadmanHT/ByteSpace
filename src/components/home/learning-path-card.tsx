import Link from "next/link";

import { MaterialIcon } from "@/components/ui/material-icon";

export type LearningPathCardProps = {
  href: string;
  label: string;
};

export function LearningPathCard({ href, label }: LearningPathCardProps) {
  return (
    <Link className="bs-home-path-card" href={href} prefetch={false}>
      <span aria-hidden="true" className="bs-home-path-card__icon">
        <MaterialIcon height={36} name="category" width={36} />
      </span>
      <span>{label}</span>
    </Link>
  );
}
