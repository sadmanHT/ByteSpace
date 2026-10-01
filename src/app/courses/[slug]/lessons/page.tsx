import { notFound } from "next/navigation";

import { CourseLessons } from "@/components/course-detail/course-lessons";
import { CourseShell } from "@/components/course-detail/course-shell";
import { courseDetails, getCourseDetailBySlug } from "@/data/course-details";

export function generateStaticParams() {
  return courseDetails.map((detail) => ({ slug: detail.courseSlug }));
}

export default async function CourseLessonsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = getCourseDetailBySlug(slug);
  if (!detail) notFound();

  return (
    <CourseShell current="lessons" detail={detail}>
      <CourseLessons detail={detail} />
    </CourseShell>
  );
}
