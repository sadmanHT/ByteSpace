import Link from "next/link";
import { notFound } from "next/navigation";

import { CourseAbout } from "@/components/course-detail/course-about";
import { CourseShell } from "@/components/course-detail/course-shell";
import { Container } from "@/components/layout/container";
import { SiteHeader } from "@/components/layout/site-header";
import { getCourseDetailBySlug } from "@/data/course-details";
import { courses, getCourseBySlug } from "@/data/courses";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export default async function CourseDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = getCourseDetailBySlug(slug);

  if (detail) {
    return (
      <CourseShell current="about" detail={detail}>
        <CourseAbout detail={detail} />
      </CourseShell>
    );
  }

  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <main>
      <section className="bs-catalogue-hero">
        <SiteHeader activeItem="courses" />
        <Container className="grid gap-6 pb-20 pt-12">
          <p className="type-label-s uppercase tracking-[0.18em] text-white/80">Course route foundation</p>
          <h1 className="type-heading-m max-w-4xl !text-white">{course.title}</h1>
          <p className="type-body-m max-w-2xl text-white/90">
            The supplied Phase 8 Figma detail ecosystem is defined for Build Digital Asset. This existing catalogue route remains available without inventing unsupported course-detail content.
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
