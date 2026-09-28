import { FoundationCheck } from "@/components/ui/foundation-check";

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-neutral-950 sm:px-10 lg:px-20">
      <div className="mx-auto grid max-w-5xl gap-12">
        <header className="grid gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            ByteSpace · Phase 1
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Engineering foundation ready for the Figma implementation.
          </h1>
          <p className="max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg">
            This temporary page verifies the application shell, strict TypeScript setup, test
            tooling, accessibility checks, and CI workflow before design-system work begins.
          </p>
        </header>

        <FoundationCheck />

        <aside className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
          <p className="text-sm leading-6 text-neutral-700">
            Figma remains the visual source of truth. Product screens will replace this Phase 1
            verification surface in later phases.
          </p>
        </aside>
      </div>
    </main>
  );
}
