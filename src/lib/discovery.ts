import type { Course } from "@/types/course";
import type { CreatorProfileData } from "@/types/creator";

export type CoursePlacement = Readonly<{
  course: Course;
  key: string;
}>;

export function buildSearchPlacements(
  source: readonly Course[],
  requestedPage: number,
  repeatCount = 3,
): readonly CoursePlacement[] {
  if (source.length === 0 || repeatCount <= 0) {
    return [];
  }

  const page = Math.max(1, Math.trunc(requestedPage) || 1);
  const offset = (page - 1) % source.length;
  const total = source.length * repeatCount;

  return Array.from({ length: total }, (_, index) => {
    const course = source[(index + offset) % source.length];

    return {
      course,
      key: `page-${page}-placement-${index}-${course.id}`,
    };
  });
}

export function resetDiscoveryPage(): number {
  return 1;
}

export function getCreatorCourses(
  creator: CreatorProfileData,
  source: readonly Course[],
): readonly Course[] {
  const bySlug = new Map(source.map((course) => [course.slug, course]));

  return creator.courseSlugs
    .map((slug) => bySlug.get(slug))
    .filter((course): course is Course => course !== undefined);
}

export function toggleLocalFollow(current: boolean): boolean {
  return !current;
}
