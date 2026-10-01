import type { CourseDetailRoute, CourseModule, CourseReview } from "@/types/course-detail";

export type ShareResult = "copied" | "shared";

export type ShareNavigator = Readonly<{
  clipboard?: Readonly<{ writeText: (value: string) => Promise<void> }>;
  share?: (data: ShareData) => Promise<void>;
}>;

export function courseDetailHref(slug: string, route: CourseDetailRoute): string {
  if (route === "about") return `/courses/${slug}`;
  return `/courses/${slug}/${route}`;
}

export function getCourseModuleByNumber(
  modules: readonly CourseModule[],
  number: string,
): CourseModule | undefined {
  return modules.find((module) => module.number === number);
}

export function filterCourseReviews(
  reviews: readonly CourseReview[],
  rating: CourseReview["rating"] | "all",
): readonly CourseReview[] {
  if (rating === "all") return reviews;
  return reviews.filter((review) => review.rating === rating);
}

export async function shareCourseLink(
  navigatorLike: ShareNavigator,
  url: string,
  title: string,
): Promise<ShareResult> {
  if (navigatorLike.share) {
    await navigatorLike.share({ title, url });
    return "shared";
  }

  if (navigatorLike.clipboard?.writeText) {
    await navigatorLike.clipboard.writeText(url);
    return "copied";
  }

  throw new Error("Sharing is not supported in this browser.");
}
