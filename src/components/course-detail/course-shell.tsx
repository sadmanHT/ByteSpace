import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { CoursePreviewAction, CourseShareButton } from "@/components/course-detail/course-actions";
import { CourseIcon } from "@/components/course-detail/course-icons";
import { CourseRouteNav } from "@/components/course-detail/course-route-nav";
import { EnrollmentCard } from "@/components/course-detail/enrollment-card";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import type { CourseDetail, CourseDetailRoute } from "@/types/course-detail";

const decorations = [
  [
    "/assets/not-found/6be36b89bfec399afb445a39d9bf4cb181332d48.webp",
    "bs-course-hero__decoration--left",
  ],
  [
    "/assets/not-found/d5e9c4dc379dbf3d1f6679a4423483f6766a7931.webp",
    "bs-course-hero__decoration--top",
  ],
  [
    "/assets/not-found/24321b8894c48b04befaa9e71f204daacc40bbc4.webp",
    "bs-course-hero__decoration--right",
  ],
] as const;

export function CourseShell({
  children,
  current,
  detail,
}: {
  children: ReactNode;
  current: CourseDetailRoute;
  detail: CourseDetail;
}) {
  return (
    <main className={`bs-course-detail-page bs-course-detail-page--${current}`}>
      <section className="bs-course-hero">
        <div aria-hidden="true" className="bs-discovery-grid" />
        <SiteHeader activeItem="courses" />

        {decorations.map(([src, className]) => (
          <Image
            alt=""
            aria-hidden="true"
            className={`bs-course-hero__decoration ${className}`}
            height={360}
            key={src}
            src={src}
            width={360}
          />
        ))}

        <div className="bs-course-hero__summary">
          <div className="bs-course-hero__copy">
            <div>
              <h1>{detail.title}</h1>
              <p className="bs-course-hero__subtitle">{detail.subtitle}</p>
            </div>
            <p className="bs-course-hero__creator-line">
              by{" "}
              <Link href={`/creators/${detail.instructor.slug}`} prefetch={false}>
                purepearl studio
              </Link>
            </p>
            <div aria-label="Course summary" className="bs-course-hero__metrics">
              <span>
                <CourseIcon height={24} name="check" width={24} />
                {detail.levelLabel}
              </span>
              <span>
                <CourseIcon height={24} name="star" width={24} />
                {detail.rating} ({detail.reviewCount} reviews)
              </span>
              <span>
                <CourseIcon height={24} name="group" width={24} />
                {detail.learnerCount} Students
              </span>
            </div>
          </div>
          <CourseShareButton title={detail.title} />
        </div>

        <div className="bs-course-media">
          <Image
            alt={detail.media.alt}
            className="bs-course-media__image"
            fill
            priority
            sizes="(max-width: 900px) calc(100vw - 32px), 720px"
            src={detail.media.src}
          />
          <CoursePreviewAction />
        </div>

        <EnrollmentCard detail={detail} />
      </section>

      <section className="bs-course-body">
        <div className="bs-course-body__content">
          <CourseRouteNav current={current} slug={detail.courseSlug} />
          {children}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
