import { notFound } from "next/navigation";

import { CourseReviews } from "@/components/course-detail/course-reviews";
import { CourseShell } from "@/components/course-detail/course-shell";
import { courseDetails, getCourseDetailBySlug } from "@/data/course-details";

export function generateStaticParams() {
  return courseDetails.map((detail) => ({ slug: detail.courseSlug }));
}

export default async function CourseReviewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = getCourseDetailBySlug(slug);
  if (!detail) notFound();

  return (
    <CourseShell current="reviews" detail={detail}>
      <CourseReviews detail={detail} />
    </CourseShell>
  );
}
