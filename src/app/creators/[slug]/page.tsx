import { notFound } from "next/navigation";

import { CreatorProfile } from "@/components/creator/creator-profile";
import { courses } from "@/data/courses";
import { getCreatorBySlug } from "@/data/creators";

type CreatorPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CreatorPage({ params }: CreatorPageProps) {
  const { slug } = await params;
  const creator = getCreatorBySlug(slug);

  if (!creator) {
    notFound();
  }

  return <CreatorProfile courses={courses} creator={creator} />;
}
