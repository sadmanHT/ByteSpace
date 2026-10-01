import type { Metadata } from "next";

import { NotFoundExperience } from "@/components/not-found/not-found-experience";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function ExplicitNotFoundPage() {
  return <NotFoundExperience />;
}
