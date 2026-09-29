import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { AuthCoursePreview } from "@/components/auth/auth-course-preview";
import { BrandLogo } from "@/components/layout/brand-logo";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { courses } from "@/data/courses";

export type AuthMode = "login" | "register";

const editorialCopy: Record<AuthMode, { heading: string; body: string }> = {
  register: {
    heading: "Sign up and come in",
    body: "The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost",
  },
  login: {
    heading: "Sign in with ease",
    body: "Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge.",
  },
};

const learnerAvatars = [
  { alt: "", src: "/assets/avatars/9ef8cb329b949267cc8214b6727067c4a13af4b4.webp" },
  { alt: "", src: "/assets/avatars/b44979e1c98ecb3ec92ac86805fe55581fbeaa60.webp" },
  { alt: "", src: "/assets/avatars/83fb3e04056cc892636460bee5791aa3f243854c.webp" },
  { alt: "", src: "/assets/avatars/f3cf29a8fed39589ceb38423e65b26b8d6c93123.webp" },
] as const;

export type AuthLayoutProps = {
  children: ReactNode;
  mode: AuthMode;
};

export function AuthLayout({ children, mode }: AuthLayoutProps) {
  const copy = editorialCopy[mode];
  const previewPrimary = courses[2];
  const previewSecondary = courses[1];

  return (
    <main className="bs-auth-page" data-auth-mode={mode}>
      <div className="bs-auth-grid" aria-hidden="true" />

      <Link aria-label="ByteSpace home" className="bs-auth-logo" href="/">
        <BrandLogo />
      </Link>

      <section className="bs-auth-editorial" aria-labelledby="auth-editorial-heading">
        <div className="bs-auth-editorial__copy">
          <h1 id="auth-editorial-heading">{copy.heading}</h1>
          <p>{copy.body}</p>
        </div>

        <div className="bs-auth-art" aria-hidden="true">
          {previewSecondary ? <AuthCoursePreview course={previewSecondary} position="back" /> : null}
          {previewPrimary ? <AuthCoursePreview course={previewPrimary} position="front" /> : null}

          <Image
            alt=""
            className="bs-auth-art__shape bs-auth-art__shape--ring"
            height={180}
            src="/assets/auth/8670b841eac7883ecb790f84eb349c6c01db588b.webp"
            width={180}
          />
          <Image
            alt=""
            className="bs-auth-art__shape bs-auth-art__shape--cone"
            height={170}
            src="/assets/auth/f9c0e0fd05db48405aa72287b20d04b9a01feb51.webp"
            width={170}
          />
          <Image
            alt=""
            className="bs-auth-art__shape bs-auth-art__shape--spring"
            height={180}
            src="/assets/auth/e3b55902d605bfc37a0809e6dc6dfe61b6701897.webp"
            width={180}
          />
        </div>

        <aside className="bs-auth-students-card" aria-label="Happy students">
          <div>
            <strong>Happy Students</strong>
            <span>4.5 (240)</span>
          </div>
          <AvatarStack avatars={learnerAvatars} overflowLabel="2K+" overflowTone="dark" />
        </aside>
      </section>

      <section className="bs-auth-panel" aria-label={mode === "register" ? "Create an account" : "Sign in"}>
        {children}
      </section>
    </main>
  );
}
