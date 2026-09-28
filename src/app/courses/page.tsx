import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function CoursesFoundationPage() {
  return (
    <main>
      <section className="bs-route-placeholder">
        <SiteHeader activeItem="courses" />
        <Container className="grid gap-4 py-20">
          <p className="type-label-s uppercase tracking-[0.18em] text-white/70">Courses</p>
          <h1 className="type-heading-m !text-white">Course catalogue foundation route.</h1>
          <p className="type-body-m max-w-2xl text-white/80">
            The complete catalogue is built in later phases. This route exists now so shared
            navigation can be tested without a broken destination.
          </p>
        </Container>
      </section>
      <SiteFooter />
    </main>
  );
}
