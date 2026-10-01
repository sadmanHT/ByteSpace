"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { CourseIcon } from "@/components/course-detail/course-icons";
import { filterCourseReviews } from "@/lib/course-detail";
import type { CourseDetail, CourseReview } from "@/types/course-detail";

const filters: ReadonlyArray<Readonly<{ label: string; value: CourseReview["rating"] | "all" }>> = [
  { label: "All rating", value: "all" },
  { label: "5", value: 5 },
  { label: "4", value: 4 },
  { label: "3", value: 3 },
  { label: "2", value: 2 },
  { label: "1", value: 1 },
];

export function CourseReviews({ detail }: { detail: CourseDetail }) {
  const [rating, setRating] = useState<CourseReview["rating"] | "all">("all");
  const visibleReviews = useMemo(() => filterCourseReviews(detail.reviews, rating), [detail.reviews, rating]);

  return (
    <div className="bs-course-reviews">
      <section aria-labelledby="course-review-summary-title">
        <h2 id="course-review-summary-title">What Learners Are Saying</h2>
        <p>{detail.reviewIntro}</p>

        <div className="bs-course-reviews__summary">
          <div className="bs-course-reviews__aggregate">
            <span>Ratings</span>
            <strong>{detail.aggregateRating}</strong>
            <div aria-label={`${detail.aggregateRating} out of 5 stars`} className="bs-course-reviews__stars" role="img">
              {Array.from({ length: 5 }, (_, index) => (
                <CourseIcon height={18} key={index} name="star" width={18} />
              ))}
            </div>
          </div>
          <div className="bs-course-reviews__distribution">
            {detail.ratingDistribution.map((entry) => (
              <div className="bs-course-reviews__distribution-row" key={entry.rating}>
                <span>{entry.rating}</span>
                <CourseIcon height={18} name="star" width={18} />
                <span className="bs-course-reviews__bar" aria-hidden="true">
                  <span style={{ width: `${entry.visualPercent}%` }} />
                </span>
                <strong>{entry.count}</strong>
                <span className="sr-only">
                  {entry.rating} star reviews: {entry.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="individual-reviews-title">
        <h2 id="individual-reviews-title">Individual Reviews:</h2>
        <div aria-label="Filter reviews by rating" className="bs-course-reviews__filters" role="group">
          {filters.map((filter) => (
            <button
              aria-pressed={rating === filter.value}
              key={filter.label}
              onClick={() => setRating(filter.value)}
              type="button"
            >
              {filter.value === "all" ? null : <CourseIcon height={18} name="star" width={18} />}
              {filter.label}
            </button>
          ))}
        </div>

        <div aria-live="polite" className="bs-course-reviews__list">
          {visibleReviews.length === 0 ? (
            <p className="bs-course-reviews__empty">No supplied reviews match this rating.</p>
          ) : (
            visibleReviews.map((review) => (
              <article className="bs-course-review-card" key={review.id}>
                <header>
                  <Image alt={review.avatar.alt} height={52} src={review.avatar.src} width={52} />
                  <div className="bs-course-review-card__identity">
                    <h3>{review.name}</h3>
                    <p>{review.role}</p>
                  </div>
                  <div className="bs-course-review-card__rating" aria-label={`${review.rating} out of 5 stars`} role="img">
                    {Array.from({ length: 5 }, (_, index) => (
                      <CourseIcon
                        className={index < review.rating ? "is-filled" : ""}
                        height={18}
                        key={index}
                        name="star"
                        width={18}
                      />
                    ))}
                  </div>
                  <time>{review.dateLabel}</time>
                </header>
                <p>{review.body}</p>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
