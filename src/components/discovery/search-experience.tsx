"use client";

import { useMemo, useState } from "react";

import { CourseCard } from "@/components/course/course-card";
import { CourseFilterSelect } from "@/components/discovery/course-filter-select";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Chip } from "@/components/ui/chip";
import { FilterControl } from "@/components/ui/filter-control";
import { Pagination } from "@/components/ui/pagination";
import { SearchField } from "@/components/ui/search-field";
import { courseCategories } from "@/data/courses";
import { buildSearchPlacements, resetDiscoveryPage, type CoursePlacement } from "@/lib/discovery";
import {
  filterCourses,
  normalizeCourseQuery,
  paginateCourses,
  sortCourses,
} from "@/lib/course-catalog";
import type { Course, CourseCategory, CourseLevel, CourseSort } from "@/types/course";

const FIGMA_PAGE_COUNT = 5;
const FILTERED_PAGE_SIZE = 18;

const levelOptions = [
  { value: "all", label: "Level" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
] as const;

const sortOptions = [
  { value: "relevance", label: "Most relevant" },
  { value: "title-asc", label: "Title A–Z" },
  { value: "price-asc", label: "Price low to high" },
  { value: "rating-desc", label: "Rating high to low" },
] as const;

export type SearchExperienceProps = {
  courses: readonly Course[];
  initialQuery?: string;
};

export function SearchExperience({ courses, initialQuery = "" }: SearchExperienceProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<CourseCategory>("featured");
  const [level, setLevel] = useState<CourseLevel | "all">("all");
  const [sort, setSort] = useState<CourseSort>("relevance");
  const [page, setPage] = useState(1);

  const filteredCourses = useMemo(
    () => filterCourses(courses, { query, category, level }),
    [category, courses, level, query],
  );
  const sortedCourses = useMemo(() => sortCourses(filteredCourses, sort), [filteredCourses, sort]);

  const isNativeDefaultState =
    normalizeCourseQuery(query).length === 0 && category === "featured" && level === "all";

  const placements = useMemo<readonly CoursePlacement[]>(() => {
    if (isNativeDefaultState) {
      return buildSearchPlacements(sortedCourses, page);
    }

    const pagination = paginateCourses(sortedCourses, page, FILTERED_PAGE_SIZE);
    return pagination.items.map((course, index) => ({
      course,
      key: `filtered-${pagination.currentPage}-${index}-${course.id}`,
    }));
  }, [isNativeDefaultState, page, sortedCourses]);

  const pageCount = isNativeDefaultState
    ? FIGMA_PAGE_COUNT
    : Math.ceil(sortedCourses.length / FILTERED_PAGE_SIZE);
  const currentPage = pageCount === 0 ? 1 : Math.min(page, pageCount);

  function resetPage() {
    setPage(resetDiscoveryPage());
  }

  function resetFilters() {
    setQuery("");
    setCategory("featured");
    setLevel("all");
    setSort("relevance");
    resetPage();
  }

  function selectCategory(nextCategory: CourseCategory) {
    setCategory(nextCategory);
    resetPage();
  }

  return (
    <main className="bs-search-page" data-testid="search-page">
      <section className="bs-search-hero">
        <div className="bs-discovery-grid" aria-hidden="true" />
        <SiteHeader activeItem="courses" />

        <div className="bs-search-hero__content">
          <h1>Find Your Next Course</h1>
          <div className="bs-search-hero__search-row">
            <SearchField
              label="Search course catalogue"
              onChange={(event) => {
                setQuery(event.currentTarget.value);
                resetPage();
              }}
              placeholder="Search"
              value={query}
            />
            <span className="bs-search-hero__scope">Courses</span>
          </div>
        </div>
      </section>

      <section className="bs-search-body" aria-label="Course discovery">
        <div className="bs-search-body__inner">
          <div className="bs-search-controls">
            <div className="bs-search-controls__filters">
              <FilterControl aria-label="Reset course filters" icon="filter" onClick={resetFilters}>
                Filter
              </FilterControl>
              <CourseFilterSelect
                ariaLabel="Level"
                icon="level"
                onChange={(event) => {
                  setLevel(event.currentTarget.value as CourseLevel | "all");
                  resetPage();
                }}
                options={levelOptions}
                value={level}
              />
              <CourseFilterSelect
                ariaLabel="Category"
                icon="category"
                onChange={(event) => {
                  selectCategory(event.currentTarget.value as CourseCategory);
                }}
                options={courseCategories.map((item) => ({
                  value: item.id,
                  label: item.id === "featured" ? "Category" : item.label,
                }))}
                value={category}
              />
            </div>

            <CourseFilterSelect
              ariaLabel="Sort courses"
              icon="sort"
              onChange={(event) => {
                setSort(event.currentTarget.value as CourseSort);
                resetPage();
              }}
              options={sortOptions}
              value={sort}
            />
          </div>

          <div aria-label="Course categories" className="bs-search-tabs" role="group">
            {courseCategories.map((item) => (
              <Chip
                key={item.id}
                onClick={() => selectCategory(item.id)}
                selected={item.id === category}
              >
                {item.label}
              </Chip>
            ))}
          </div>

          {placements.length === 0 ? (
            <section className="bs-search-empty" aria-labelledby="search-empty-title">
              <h2 id="search-empty-title">No courses found</h2>
              <p>Try a different search, category, or level.</p>
              <button type="button" onClick={resetFilters}>
                Reset filters
              </button>
            </section>
          ) : (
            <div className="bs-course-grid bs-search-grid" data-testid="search-course-grid">
              {placements.map(({ course, key }) => (
                <CourseCard course={course} key={key} />
              ))}
            </div>
          )}

          {pageCount > 1 ? (
            <div className="bs-search-pagination">
              <Pagination
                currentPage={currentPage}
                onPageChange={(nextPage) => setPage(nextPage)}
                pageCount={pageCount}
              />
            </div>
          ) : null}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
