import Image from "next/image";

export type AvatarItem = {
  alt: string;
  src: string;
};

export type AvatarStackProps = {
  avatars: readonly AvatarItem[];
  overflowLabel?: string;
};

export function AvatarStack({ avatars, overflowLabel }: AvatarStackProps) {
  return (
    <div aria-label="Learners" className="bs-avatar-stack" role="group">
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
