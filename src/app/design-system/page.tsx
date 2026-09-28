import { Container, TwelveColumnGrid } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { TextField } from "@/components/ui/text-field";

const colors = [
  ["Brand primary", "#003BE2", "var(--bs-brand-primary)"],
  ["Brand accent", "#D4FB20", "var(--bs-brand-accent)"],
  ["Text primary", "#242528", "var(--bs-text-primary)"],
  ["Text secondary", "#4B4C53", "var(--bs-text-secondary)"],
  ["Text muted", "#82868E", "var(--bs-text-muted)"],
  ["Border default", "#CED0D3", "var(--bs-border-default)"],
  ["Border subtle", "#E5E6E8", "var(--bs-border-subtle)"],
  ["Surface muted", "#F5F5F6", "var(--bs-surface-muted)"],
] as const;

export default function DesignSystemPage() {
  return (
    <main className="py-16 sm:py-20" data-testid="design-system-fixture">
      <Container className="grid gap-16">
        <header className="grid max-w-4xl gap-4">
          <p
            className="type-label-s uppercase tracking-[0.18em]"
            style={{ color: "var(--bs-brand-primary)" }}
          >
            ByteSpace · Design system fixture
          </p>
          <h1 className="type-heading-m">Visual foundations before page composition.</h1>
          <p className="type-body-l" style={{ color: "var(--bs-text-secondary)" }}>
            This isolated route exercises the shared palette, typography, layout grid, radii,
            spacing, inputs, chips, and button states used by later ByteSpace screens.
          </p>
        </header>

        <section aria-labelledby="palette-heading" className="grid gap-6">
          <h2 className="type-heading-xs" id="palette-heading">
            Core palette
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {colors.map(([name, value, background]) => (
              <article className="overflow-hidden rounded-3xl border border-neutral-200" key={name}>
                <div
                  aria-hidden="true"
                  className="h-28"
                  data-color-token={name}
                  style={{ background }}
                />
                <div className="grid gap-1 p-4">
                  <p className="type-label-s">{name}</p>
                  <p className="type-body-xs" style={{ color: "var(--bs-text-secondary)" }}>
                    {value}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="type-heading" className="grid gap-8">
          <h2 className="type-heading-xs" id="type-heading">
            Typography
          </h2>
          <div className="grid gap-8">
            <div className="grid gap-3">
              <p className="type-label-xs" style={{ color: "var(--bs-text-secondary)" }}>
                Poppins SemiBold · Heading M · 44 / 120%
              </p>
              <p className="type-heading-m">Learn without limits.</p>
            </div>
            <div className="grid gap-3">
              <p className="type-label-xs" style={{ color: "var(--bs-text-secondary)" }}>
                Satoshi Regular · Body L · 18 / 160%
              </p>
              <p className="type-body-l max-w-3xl" style={{ color: "var(--bs-text-secondary)" }}>
                ByteSpace pairs expressive geometric headings with highly readable body copy so
                course content stays clear at every level of the interface.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="layout-heading" className="grid gap-6">
          <div className="grid gap-2">
            <h2 className="type-heading-xs" id="layout-heading">
              12-column desktop grid
            </h2>
            <p className="type-body-s" style={{ color: "var(--bs-text-secondary)" }}>
              At the 1440px reference viewport this container is 1200px wide with 120px outer
              margins and 40px gutters.
            </p>
          </div>
          <TwelveColumnGrid data-testid="reference-grid">
            {Array.from({ length: 12 }, (_, index) => (
              <div
                aria-hidden="true"
                className="h-24 rounded-xl"
                key={index}
                style={{ background: "var(--bs-surface-muted)" }}
              />
            ))}
          </TwelveColumnGrid>
        </section>

        <section aria-labelledby="controls-heading" className="grid gap-8">
          <h2 className="type-heading-xs" id="controls-heading">
            Interaction primitives
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button>Primary action</Button>
            <Button variant="accent">Accent action</Button>
            <Button variant="outline">Secondary action</Button>
            <Button disabled>Disabled action</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Chip selected>Design</Chip>
            <Chip selected={false}>Development</Chip>
            <Chip disabled selected={false}>
              Unavailable
            </Chip>
          </div>
          <div className="grid max-w-xl gap-6">
            <TextField
              hint="Use the email address associated with your account."
              label="Email address"
              placeholder="you@example.com"
              type="email"
            />
            <TextField
              error="This field demonstrates the accessible error state."
              label="Field with error"
              placeholder="Required value"
            />
          </div>
        </section>

        <section
          aria-labelledby="surface-heading"
          className="grid gap-6 rounded-3xl p-8 sm:p-10"
          style={{ background: "var(--bs-brand-primary)", color: "var(--bs-white)" }}
        >
          <h2 className="type-heading-s !text-white" id="surface-heading">
            Blue surface + lime CTA
          </h2>
          <p className="type-body-m max-w-2xl text-white">
            This pairing is deliberately isolated here so brand contrast and component states can be
            verified before the same tokens spread across product screens.
          </p>
          <div>
            <Button variant="accent">Explore courses</Button>
          </div>
        </section>
      </Container>
    </main>
  );
}
