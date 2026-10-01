import { classNames } from "@/lib/class-names";

export type BrandLogoTone = "footer" | "light";

export type BrandLogoProps = {
  className?: string;
  tone?: BrandLogoTone;
};

export function BrandLogo({ className, tone = "light" }: BrandLogoProps) {
  return (
    <span
      aria-label="ByteSpace"
      className={classNames("bs-brand-logo", `bs-brand-logo--${tone}`, className)}
      role="img"
    >
      <svg
        aria-hidden="true"
        className="bs-brand-logo__mark"
        fill="currentColor"
        focusable="false"
        viewBox="0 0 28.875 31.5"
      >
        <path d="M10.5 10.5C10.5 4.701 5.799 0 0 0V21C0 26.799 4.701 31.5 10.5 31.5V10.5Z" />
        <path d="M18.375 10.5C24.174 10.5 28.875 15.201 28.875 21H21C15.201 21 10.5 16.299 10.5 10.5H18.375Z" />
        <path d="M18.375 31.5C24.174 31.5 28.875 26.799 28.875 21H21C15.201 21 10.5 25.701 10.5 31.5H18.375Z" />
      </svg>
      <span className="bs-brand-logo__wordmark">ByteSpace</span>
    </span>
  );
}
