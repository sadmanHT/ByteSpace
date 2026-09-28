import { CourseCard } from "@/components/course/course-card";
import { Container } from "@/components/layout/container";
import { courses } from "@/data/courses";

export default function CourseCardFixturePage() {
  return (
    <main data-testid="course-card-fixture">
      <Container className="grid gap-12 py-16">
        <header className="grid max-w-3xl gap-3">
          <p className="type-label-s uppercase tracking-[0.18em] text-blue-700">
            Phase 4 visual fixture
          </p>
          <h1 className="type-heading-m">Course card states</h1>
          <p className="type-body-m text-neutral-700">
            Standard Search treatment, the longest native title, the Home success/dark variant,
            and a narrow container are isolated here for regression review.
          </p>
        </header>

        <div className="bs-course-card-fixture-grid">
          <section aria-labelledby="fixture-standard">
            <h2 className="sr-only" id="fixture-standard">
              Standard Search course card
            </h2>
            <CourseCard course={courses[0]} />
          </section>

          <section aria-labelledby="fixture-long">
            <h2 className="sr-only" id="fixture-long">
              Long title course card
            </h2>
            <CourseCard course={courses[3]} />
          </section>

          <section aria-labelledby="fixture-home">
            <h2 className="sr-only" id="fixture-home">
              Home course card variant
            </h2>
            <CourseCard course={courses[1]} levelTone="success" overflowTone="dark" />
          </section>
        </div>

        <section aria-labelledby="fixture-narrow" className="bs-course-card-fixture-narrow">
          <h2 className="sr-only" id="fixture-narrow">
            Narrow course card
          </h2>
          <CourseCard course={courses[2]} />
        </section>
      </Container>
    </main>
  );
}
