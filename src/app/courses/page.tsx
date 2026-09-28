import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { courses } from "@/data/courses";

import { CourseCatalogue } from "./course-catalogue";

export default function CoursesPage() {
  return (
    <main data-testid="course-catalogue-page">
      <section className="bs-catalogue-hero">
        <SiteHeader activeItem="courses" />
        <Container className="grid gap-4 pb-16 pt-10">
          <p className="type-label-s uppercase tracking-[0.18em] text-white/80">
            ByteSpace courses
          </p>
          <h1 className="type-heading-m max-w-3xl !text-white">
            Explore the course-card system from the native Figma design.
          </h1>
        </Container>
      </section>

      <Container className="py-20">
        <CourseCatalogue courses={courses} />
      </Container>

      <SiteFooter />
    </main>
  );
}
