"use client";

import { useState } from "react";

export function FoundationCheck() {
  const [ready, setReady] = useState(false);

  return (
    <section aria-labelledby="foundation-check-title" className="grid gap-4">
      <div className="grid gap-2">
        <h2 id="foundation-check-title" className="text-xl font-semibold">
          Runtime interaction check
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-neutral-600">
          This small control exists only to prove that the Phase 1 client runtime, keyboard
          interaction, and test harness are wired correctly before product UI is introduced.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          className="rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => setReady(true)}
          disabled={ready}
        >
          {ready ? "Interaction verified" : "Run interaction check"}
        </button>
        <p role="status" aria-live="polite" className="text-sm font-medium text-neutral-700">
          {ready ? "Client-side interaction is working." : "Waiting for interaction check."}
        </p>
      </div>
    </section>
  );
}
