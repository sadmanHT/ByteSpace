import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { MetadataBadge } from "@/components/ui/metadata-badge";
import { Rating } from "@/components/ui/rating";
import { SearchField } from "@/components/ui/search-field";

import { SharedUiDemo } from "./shared-ui-demo";

const avatars = [
  {
    alt: "Learner one",
    src: "/assets/avatars/b44979e1c98ecb3ec92ac86805fe55581fbeaa60.webp",
  },
  {
    alt: "Learner two",
    src: "/assets/avatars/3fe559181733e0fb69226caee836e40092facb44.webp",
  },
  {
    alt: "Learner three",
    src: "/assets/avatars/0577f0e9b7fca2f32639871454da0de95f951709.webp",
  },
  {
    alt: "Learner four",
    src: "/assets/avatars/d0cd3adb501c64c1b4cf766de6abb9fe8925fb5f.webp",
  },
] as const;

export default function SharedUiPage() {
  return (
    <main data-testid="shared-ui-fixture">
      <section className="bs-shared-ui-hero">
        <SiteHeader activeItem="home" />
        <Container className="grid gap-8 py-20">
          <p className="type-label-s uppercase tracking-[0.18em] text-white/70">
            Phase 3 · Shared UI fixture
          </p>
          <h1 className="type-heading-m max-w-3xl !text-white">
            Reusable shell and controls grounded in the native Figma package.
          </h1>
          <div className="max-w-[624px]">
            <SearchField placeholder="Search" />
          </div>
        </Container>
      </section>

      <Container className="grid gap-16 py-20">
        <section aria-labelledby="actions-heading" className="grid gap-6">
          <h2 className="type-heading-xs" id="actions-heading">
            Shared actions
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="accent">Accent action</Button>
            <Button variant="primary">Primary action</Button>
            <Button variant="outline">Secondary action</Button>
            <ButtonLink href="/courses" variant="accent">
              Browse courses
            </ButtonLink>
          </div>
        </section>

        <section aria-labelledby="catalogue-heading" className="grid gap-6" id="courses">
          <h2 className="type-heading-xs" id="catalogue-heading">
            Catalogue controls
          </h2>
          <SharedUiDemo />
        </section>

        <section aria-labelledby="metadata-heading" className="grid gap-6">
          <h2 className="type-heading-xs" id="metadata-heading">
            Course metadata
          </h2>
          <div className="flex flex-wrap items-center gap-6">
            <MetadataBadge variant="level">Beginner</MetadataBadge>
            <Rating value={4.8} />
            <AvatarStack avatars={avatars} overflowLabel="26+" />
          </div>
        </section>
      </Container>

      <SiteFooter />
    </main>
  );
}
