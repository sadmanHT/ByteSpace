import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CourseLessons } from "@/components/course-detail/course-lessons";
import { CourseShell } from "@/components/course-detail/course-shell";
import { courseDetails, getCourseDetailBySlug } from "@/data/course-details";

type CourseLessonsPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return courseDetails.map((detail) => ({ slug: detail.courseSlug }));
}

export async function generateMetadata({ params }: CourseLessonsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = getCourseDetailBySlug(slug);

  return {
    title: detail ? `${detail.title} Lessons` : "Course lessons",
  };
}

export default async function CourseLessonsPage({ params }: CourseLessonsPageProps) {
  const { slug } = await params;
  const detail = getCourseDetailBySlug(slug);
  if (!detail) notFound();

  return (
    <CourseShell current="lessons" detail={detail}>
      <CourseLessons detail={detail} />
    </CourseShell>
  );
}
