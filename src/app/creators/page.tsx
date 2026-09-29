import { CreatorProfile } from "@/components/creator/creator-profile";
import { courses } from "@/data/courses";
import { purepearlCreator } from "@/data/creators";

export default function CreatorsPage() {
  return <CreatorProfile courses={courses} creator={purepearlCreator} />;
}
