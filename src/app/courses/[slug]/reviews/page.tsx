import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CourseReviews } from "@/components/course-detail/course-reviews";
import { CourseShell } from "@/components/course-detail/course-shell";
import { courseDetails, getCourseDetailBySlug } from "@/data/course-details";

type CourseReviewsPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return courseDetails.map((detail) => ({ slug: detail.courseSlug }));
}

export async function generateMetadata({ params }: CourseReviewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = getCourseDetailBySlug(slug);

  return {
    title: detail ? `${detail.title} Reviews` : "Course reviews",
  };
}

export default async function CourseReviewsPage({ params }: CourseReviewsPageProps) {
  const { slug } = await params;
  const detail = getCourseDetailBySlug(slug);
  if (!detail) notFound();

  return (
    <CourseShell current="reviews" detail={detail}>
      <CourseReviews detail={detail} />
    </CourseShell>
  );
}
