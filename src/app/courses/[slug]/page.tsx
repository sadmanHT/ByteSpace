import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { SiteHeader } from "@/components/layout/site-header";
import { courses, getCourseBySlug } from "@/data/courses";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export default async function CourseFoundationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <main>
      <section className="bs-catalogue-hero">
        <SiteHeader activeItem="courses" />
        <Container className="grid gap-6 pb-20 pt-12">
          <p className="type-label-s uppercase tracking-[0.18em] text-white/80">
            Course route foundation
          </p>
          <h1 className="type-heading-m max-w-4xl !text-white">{course.title}</h1>
          <p className="type-body-m max-w-2xl text-white/90">
            This route verifies Phase 4 catalogue navigation. The complete Figma course-detail
            experience is implemented in Phase 8.
          </p>
          <div>
            <Link className="bs-course-back-link" href="/courses">
              Back to courses
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
