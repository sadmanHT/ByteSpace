"use client";

import { useMemo, useState } from "react";

import { CourseCard } from "@/components/course/course-card";
import { Pagination } from "@/components/ui/pagination";
import { SearchField } from "@/components/ui/search-field";
import { courseCategories } from "@/data/courses";
import {
  filterCourses,
  paginateCourses,
  sortCourses,
} from "@/lib/course-catalog";
import type {
  Course,
  CourseCategory,
  CourseLevel,
  CourseSort,
} from "@/types/course";

const PAGE_SIZE = 3;

export type CourseCatalogueProps = {
  courses: readonly Course[];
};

export function CourseCatalogue({ courses }: CourseCatalogueProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CourseCategory | "all">("all");
  const [level, setLevel] = useState<CourseLevel | "all">("all");
  const [sort, setSort] = useState<CourseSort>("relevance");
  const [page, setPage] = useState(1);

  const filteredCourses = useMemo(
    () => filterCourses(courses, { query, category, level }),
    [category, courses, level, query],
  );
  const sortedCourses = useMemo(
    () => sortCourses(filteredCourses, sort),
    [filteredCourses, sort],
  );
  const pagination = useMemo(
    () => paginateCourses(sortedCourses, page, PAGE_SIZE),
    [page, sortedCourses],
  );

  function resetPage() {
    setPage(1);
  }

  return (
    <div className="bs-catalogue">
      <div className="bs-catalogue__controls">
        <SearchField
          label="Search course catalogue"
          onChange={(event) => {
            setQuery(event.currentTarget.value);
            resetPage();
          }}
          placeholder="Search courses"
          value={query}
        />

        <label className="bs-catalogue__select-field">
          <span>Category</span>
          <select
            aria-label="Category"
            onChange={(event) => {
              setCategory(event.currentTarget.value as CourseCategory | "all");
              resetPage();
            }}
            value={category}
          >
            <option value="all">All categories</option>
            {courseCategories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="bs-catalogue__select-field">
          <span>Level</span>
          <select
            aria-label="Level"
            onChange={(event) => {
              setLevel(event.currentTarget.value as CourseLevel | "all");
              resetPage();
            }}
            value={level}
          >
            <option value="all">All levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>

        <label className="bs-catalogue__select-field">
          <span>Sort</span>
          <select
            aria-label="Sort courses"
            onChange={(event) => {
              setSort(event.currentTarget.value as CourseSort);
              resetPage();
            }}
            value={sort}
          >
            <option value="relevance">Most relevant</option>
            <option value="title-asc">Title A–Z</option>
            <option value="price-asc">Price low to high</option>
            <option value="rating-desc">Rating high to low</option>
          </select>
        </label>
      </div>

      <p aria-live="polite" className="bs-catalogue__summary">
        {pagination.total} {pagination.total === 1 ? "course" : "courses"}
      </p>

      {pagination.total === 0 ? (
        <section aria-labelledby="catalogue-empty-heading" className="bs-catalogue__empty">
          <h2 id="catalogue-empty-heading">No courses found</h2>
          <p>Try a different search, category, or level.</p>
        </section>
      ) : (
        <>
          <div className="bs-course-grid" data-testid="course-grid">
            {pagination.items.map((course) => (
              <CourseCard course={course} key={course.id} />
            ))}
          </div>

          {pagination.pageCount > 1 ? (
            <Pagination
              currentPage={pagination.currentPage}
              onPageChange={setPage}
              pageCount={pagination.pageCount}
            />
          ) : null}
        </>
      )}
    </div>
  );
}
