import Image from "next/image";
import Link from "next/link";

import { EnrollmentAction } from "@/components/course-detail/course-actions";
import { CourseIcon } from "@/components/course-detail/course-icons";
import type { CourseDetail } from "@/types/course-detail";

export function EnrollmentCard({ detail }: { detail: CourseDetail }) {
  return (
    <aside aria-label="Course enrollment" className="bs-course-enrollment">
      <div className="bs-course-enrollment__inner">
        <section className="bs-course-enrollment__lessons" aria-labelledby="course-lessons-summary">
          <h2 id="course-lessons-summary">
            {detail.totalLessons} Lessons ({detail.totalDurationLabel})
          </h2>
          <ol>
            {detail.sidebarLessons.map((lesson) => (
              <li key={lesson.number}>
                <span className="bs-course-enrollment__lesson-number">{lesson.number}</span>
                <span className="bs-course-enrollment__lesson-title">{lesson.title}</span>
                <span className="bs-course-enrollment__lesson-duration">{lesson.duration}</span>
              </li>
            ))}
          </ol>
          <p className="bs-course-enrollment__remaining">{detail.sidebarRemainingLabel}</p>
        </section>

        <section className="bs-course-enrollment__cta" aria-label="Enrollment price">
          <p>Ready to Dive In? Enroll Now and Start Building Your Digital Future!</p>
          <div className="bs-course-enrollment__price">
            <strong>${detail.price}</strong>
            <span>/{detail.billingLabel}</span>
          </div>
          <EnrollmentAction />
        </section>

        <section className="bs-course-enrollment__included" aria-labelledby="course-included-title">
          <h2 id="course-included-title">This course include</h2>
          <ul>
            {detail.includedFeatures.map((feature) => (
              <li key={feature}>
                <CourseIcon height={24} name="resource" width={24} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bs-course-enrollment__creator" aria-labelledby="course-creator-title">
          <div className="bs-course-enrollment__creator-row">
            <Image
              alt={detail.instructor.avatar.alt}
              height={52}
              src={detail.instructor.avatar.src}
              width={52}
            />
            <div>
              <h2 id="course-creator-title">{detail.instructor.name}</h2>
              <p>{detail.instructor.role}</p>
            </div>
          </div>
          <p>Ready to Dive In? Enroll Now and Start Building Your Digital Future!</p>
          <Link href={`/creators/${detail.instructor.slug}`} prefetch={false}>
            See Full Profile
          </Link>
        </section>
      </div>
    </aside>
  );
}
