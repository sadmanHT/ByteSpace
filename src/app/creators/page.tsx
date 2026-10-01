import type { Metadata } from "next";

import { CreatorProfile } from "@/components/creator/creator-profile";
import { courses } from "@/data/courses";
import { purepearlCreator } from "@/data/creators";

export const metadata: Metadata = {
  title: "Creators",
};

export default function CreatorsPage() {
  return <CreatorProfile courses={courses} creator={purepearlCreator} />;
}
