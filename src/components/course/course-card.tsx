import Image from "next/image";
import Link from "next/link";

import { CourseMetaPill } from "@/components/course/course-meta-pill";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { MaterialIcon } from "@/components/ui/material-icon";
import { Rating } from "@/components/ui/rating";
import { formatCourseLevel, formatCoursePrice } from "@/lib/course-catalog";
import { classNames } from "@/lib/class-names";
import type { Course } from "@/types/course";

export type CourseCardProps = {
  course: Course;
  levelTone?: "neutral" | "success";
  overflowTone?: "accent" | "dark";
};

export function CourseCard({
  course,
  levelTone = "neutral",
  overflowTone = "accent",
}: CourseCardProps) {
  return (
    <article className="bs-course-card" data-course-id={course.id}>
      <div className="bs-course-card__media">
        <Image
          alt={course.image.alt}
          className="bs-course-card__image"
          fill
          sizes="(max-width: 767px) calc(100vw - 64px), 341px"
          src={course.image.src}
        />
        <div className="bs-course-card__media-meta">
          <CourseMetaPill>{course.lessons} Lessons</CourseMetaPill>
          <CourseMetaPill>{course.durationLabel}</CourseMetaPill>
          <CourseMetaPill>{course.comments} Comments</CourseMetaPill>
        </div>
      </div>

      <div className="bs-course-card__content">
        <div className="bs-course-card__copy">
          <Link
            className="bs-course-card__title"
            href={`/courses/${course.slug}`}
            prefetch={false}
          >
            {course.title}
          </Link>

          <p className="bs-course-card__creator">
            by{" "}
            <Link href={`/creators/${course.creator.slug}`} prefetch={false}>
              {course.creator.name}
            </Link>
          </p>
        </div>

        <div className="bs-course-card__facts">
          <span
            className={classNames(
              "bs-course-card__level",
              `bs-course-card__level--${levelTone}`,
            )}
          >
            <MaterialIcon height={20} name="level" width={20} />
            <span>{formatCourseLevel(course.level)}</span>
          </span>
          <AvatarStack
            avatars={course.learners}
            overflowLabel={`${course.learnerOverflow}+`}
            overflowTone={overflowTone}
          />
        </div>

        <div className="bs-course-card__price">
          <strong>{formatCoursePrice(course.price)}</strong>
          <span>/{course.billingLabel}</span>
        </div>
      </div>

      <div className="bs-course-card__rating">
        <Rating value={course.rating} variant="outlined" />
      </div>
    </article>
  );
}
