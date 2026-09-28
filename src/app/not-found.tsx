import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-16 text-neutral-950">
      <section className="grid max-w-xl gap-5 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">404</p>
        <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
        <p className="text-base leading-7 text-neutral-600">
          The final ByteSpace 404 design will be implemented in Phase 6. This accessible fallback
          keeps unknown routes safe during foundation work.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
