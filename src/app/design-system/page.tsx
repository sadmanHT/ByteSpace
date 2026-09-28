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

const blueScale = [
  ["50", "#E7F6FF"],
  ["100", "#D3EEFF"],
  ["200", "#B0DDFF"],
  ["300", "#81C5FF"],
  ["400", "#4F9DFF"],
  ["500", "#2872FF"],
  ["600", "#0445FF"],
  ["700", "#0043FF"],
  ["800", "#003BE2"],
  ["900", "#0B36A4"],
  ["950", "#071E5F"],
] as const;

const limeScale = [
  ["50", "#FDFFE4"],
  ["100", "#FAFFC5"],
  ["200", "#F2FF92"],
  ["300", "#E4FF54"],
  ["400", "#D4FB20"],
  ["500", "#CBFC01"],
  ["600", "#8CB400"],
  ["700", "#6A8902"],
  ["800", "#546B09"],
  ["900", "#465A0D"],
  ["950", "#243300"],
] as const;

const neutralScale = [
  ["50", "#F5F5F6"],
  ["100", "#E5E6E8"],
  ["200", "#CED0D3"],
  ["300", "#ABAEB5"],
  ["400", "#82868E"],
  ["500", "#666973"],
  ["600", "#585A62"],
  ["700", "#4B4C53"],
  ["800", "#424348"],
  ["900", "#3A3B3F"],
  ["950", "#242528"],
] as const;

function ScaleRow({
  label,
  scale,
  variablePrefix,
}: {
  label: string;
  scale: ReadonlyArray<readonly [string, string]>;
  variablePrefix: "blue" | "lime" | "neutral";
}) {
  return (
    <div className="grid gap-3">
      <h3 className="type-label-m">{label}</h3>
      <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
        {scale.map(([step, value]) => (
          <div className="grid gap-2" key={step}>
            <div
              aria-hidden="true"
              className="aspect-square rounded-xl border border-black/5"
              style={{ background: `var(--bs-${variablePrefix}-${step})` }}
            />
            <div>
              <p className="type-label-xs">{step}</p>
              <p className="type-body-xs" style={{ color: "var(--bs-text-secondary)" }}>
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
          <h1 className="type-heading-m" data-testid="heading-m-sample">
            Visual foundations before page composition.
          </h1>
          <p className="type-body-l" style={{ color: "var(--bs-text-secondary)" }}>
            This isolated route exercises the exact palette, typography, layout grid, radii,
            spacing, inputs, chips, and button states extracted from the native ByteSpace Figma
            file.
          </p>
        </header>

        <section aria-labelledby="palette-heading" className="grid gap-8">
          <h2 className="type-heading-xs" id="palette-heading">
            Semantic palette
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

          <div className="grid gap-8">
            <ScaleRow label="Persian Blue" scale={blueScale} variablePrefix="blue" />
            <ScaleRow label="Electric Lime" scale={limeScale} variablePrefix="lime" />
            <ScaleRow label="Shuttle Gray" scale={neutralScale} variablePrefix="neutral" />
          </div>
        </section>

        <section aria-labelledby="type-heading" className="grid gap-8">
          <h2 className="type-heading-xs" id="type-heading">
            Typography
          </h2>
          <div className="grid gap-8">
            <div className="grid gap-3">
              <p className="type-label-xs" style={{ color: "var(--bs-text-secondary)" }}>
                Poppins SemiBold · Heading M · 44 / 120% · -1% tracking
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
            <div className="grid gap-3">
              <p className="type-label-xs" style={{ color: "var(--bs-text-secondary)" }}>
                Satoshi Medium · Label XL · 20 / 120%
              </p>
              <p className="type-label-xl">Clear labels support compact product controls.</p>
            </div>
            <div className="grid gap-3">
              <p className="type-label-xs" style={{ color: "var(--bs-text-secondary)" }}>
                Clash Display Bold · observed in live design screens
              </p>
              <p
                className="text-4xl font-bold"
                style={{ fontFamily: "var(--bs-font-display)", letterSpacing: "-0.01em" }}
              >
                Expressive display moments.
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
              The native Figma grid is 12 stretched columns with 120px outer margins and 40px
              gutters on the 1440px reference screens.
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
            This pairing is isolated so brand contrast and component states are verified before the
            same tokens spread across production screens.
          </p>
          <div>
            <Button variant="accent">Explore courses</Button>
          </div>
        </section>
      </Container>
    </main>
  );
}
