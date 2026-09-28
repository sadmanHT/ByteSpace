import Image from "next/image";

import { classNames } from "@/lib/class-names";

export type AvatarItem = {
  alt: string;
  src: string;
};

export type AvatarStackProps = {
  avatars: readonly AvatarItem[];
  overflowLabel?: string;
  overflowTone?: "accent" | "dark";
};

export function AvatarStack({
  avatars,
  overflowLabel,
  overflowTone = "dark",
}: AvatarStackProps) {
  return (
    <div
      aria-label="Learners"
      className={classNames("bs-avatar-stack", `bs-avatar-stack--${overflowTone}`)}
      role="group"
    >
      {avatars.map((avatar) => (
        <Image
          alt={avatar.alt}
          className="bs-avatar-stack__image"
          height={32}
          key={avatar.src}
          src={avatar.src}
          width={32}
        />
      ))}
      {overflowLabel ? (
        <span aria-label={`${overflowLabel} more learners`} className="bs-avatar-stack__overflow">
          {overflowLabel}
        </span>
      ) : null}
    </div>
  );
}
