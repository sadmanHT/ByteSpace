import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function CreatorsFoundationPage() {
  return (
    <main>
      <section className="bs-route-placeholder">
        <SiteHeader activeItem="creators" />
        <Container className="grid gap-4 py-20">
          <p className="type-label-s uppercase tracking-[0.18em] text-white/70">Creators</p>
          <h1 className="type-heading-m !text-white">Creator foundation route.</h1>
          <p className="type-body-m max-w-2xl text-white/80">
            The complete creator profile experience is built in Phase 7. This route keeps the
            shared navigation testable now without inventing final page content.
          </p>
        </Container>
      </section>
      <SiteFooter />
    </main>
  );
}
