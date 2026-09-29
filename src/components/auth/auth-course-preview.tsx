import Image from "next/image";

import type { Course } from "@/types/course";

export type AuthCoursePreviewProps = {
  course: Course;
  position: "back" | "front";
};

export function AuthCoursePreview({ course, position }: AuthCoursePreviewProps) {
  return (
    <article className={`bs-auth-course-preview bs-auth-course-preview--${position}`} aria-hidden="true">
      <div className="bs-auth-course-preview__image">
        <Image alt="" fill sizes="280px" src={course.image.src} />
      </div>
      <div className="bs-auth-course-preview__body">
        <strong>{course.title}</strong>
        <span>by {course.creator.name}</span>
        <div className="bs-auth-course-preview__meta">
          <span>{course.lessons} Lessons</span>
          <span>{course.rating.toFixed(1)} ★</span>
        </div>
      </div>
    </article>
  );
}
