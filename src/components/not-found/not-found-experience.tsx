import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export function NotFoundExperience() {
  return (
    <div className="bs-not-found-page" data-testid="not-found-experience">
      <section className="bs-not-found__blue">
        <div className="bs-not-found__grid" aria-hidden="true" />
        <SiteHeader />

        <div className="bs-not-found__content">
          <p className="bs-not-found__code" aria-hidden="true">
            404
          </p>
          <h1>The page you are looking for doesn&apos;t exist</h1>
          <p>
            Try to use a correct url or go back to homepage to start again
          </p>
          <Link className="bs-not-found__cta" href="/">
            Back to Home
          </Link>
        </div>

        <div className="bs-not-found__decor" aria-hidden="true">
          <Image className="bs-not-found__shape bs-not-found__shape--ring" alt="" width={190} height={190} src="/assets/not-found/24321b8894c48b04befaa9e71f204daacc40bbc4.webp" />
          <Image className="bs-not-found__shape bs-not-found__shape--cone" alt="" width={180} height={180} src="/assets/not-found/6be36b89bfec399afb445a39d9bf4cb181332d48.webp" />
          <Image className="bs-not-found__shape bs-not-found__shape--spring" alt="" width={200} height={200} src="/assets/not-found/d5e9c4dc379dbf3d1f6679a4423483f6766a7931.webp" />
          <Image className="bs-not-found__shape bs-not-found__shape--tube" alt="" width={180} height={180} src="/assets/not-found/f1057d714a93edf29b02a9dbdb4fc552fd7ab847.webp" />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
