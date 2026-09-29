"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { CourseCard } from "@/components/course/course-card";
import { CourseFilterSelect } from "@/components/discovery/course-filter-select";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FilterControl } from "@/components/ui/filter-control";
import { getCreatorCourses, resetDiscoveryPage, toggleLocalFollow } from "@/lib/discovery";
import { filterCourses, sortCourses } from "@/lib/course-catalog";
import type { Course, CourseCategory, CourseLevel, CourseSort } from "@/types/course";
import type { CreatorProfileData } from "@/types/creator";

const levelOptions = [
  { value: "all", label: "Level" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
] as const;

const categoryOptions = [
  { value: "featured", label: "Category" },
  { value: "music", label: "Music" },
  { value: "drawing-painting", label: "Drawing & Painting" },
  { value: "marketing", label: "Marketing" },
  { value: "animation", label: "Animation" },
  { value: "social-media", label: "Social Media" },
  { value: "ui-ux-design", label: "UI/UX Design" },
  { value: "creative-marketing", label: "Creative Marketing" },
  { value: "cooking", label: "Cooking" },
] as const;

const sortOptions = [
  { value: "relevance", label: "Most relevant" },
  { value: "title-asc", label: "Title A–Z" },
  { value: "price-asc", label: "Price low to high" },
  { value: "rating-desc", label: "Rating high to low" },
] as const;

export type CreatorProfileProps = {
  courses: readonly Course[];
  creator: CreatorProfileData;
};

export function CreatorProfile({ courses, creator }: CreatorProfileProps) {
  const [following, setFollowing] = useState(false);
  const [level, setLevel] = useState<CourseLevel | "all">("all");
  const [category, setCategory] = useState<CourseCategory>("featured");
  const [sort, setSort] = useState<CourseSort>("relevance");

  const creatorCourses = useMemo(() => getCreatorCourses(creator, courses), [courses, creator]);
  const visibleCourses = useMemo(
    () => sortCourses(filterCourses(creatorCourses, { category, level }), sort),
    [category, creatorCourses, level, sort],
  );

  function resetFilters() {
    setLevel("all");
    setCategory("featured");
    setSort("relevance");
    resetDiscoveryPage();
  }

  return (
    <main className="bs-creator-page" data-testid="creator-profile-page">
      <section className="bs-creator-hero">
        <div className="bs-discovery-grid" aria-hidden="true" />
        <SiteHeader activeItem="creators" />

        <div className="bs-creator-hero__profile">
          <div className="bs-creator-identity">
            <Image
              alt={creator.avatar.alt}
              className="bs-creator-avatar"
              height={96}
              src={creator.avatar.src}
              width={96}
            />
            <div className="bs-creator-identity__copy">
              <div className="bs-creator-name-row">
                <h1>{creator.displayName}</h1>
                <span className="bs-creator-badge">Creator</span>
              </div>
              <p>{creator.role}</p>
            </div>
          </div>

          <p className="bs-creator-bio">
            {creator.bio.split("\n").map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </p>

          <div className="bs-creator-metrics-row">
            <div className="bs-creator-metrics" aria-label="Creator metrics">
              <span>
                <strong>{creator.productCount}</strong> Products
              </span>
              <span>
                <strong>{creator.followerCount}</strong> Followers
              </span>
            </div>

            <button
              aria-pressed={following}
              className="bs-creator-follow"
              onClick={() => setFollowing((current) => toggleLocalFollow(current))}
              type="button"
            >
              {following ? "Following" : "Follow"}
            </button>
          </div>
        </div>
      </section>

      <section className="bs-creator-body" aria-label="Creator courses">
        <div className="bs-creator-body__inner">
          <div className="bs-search-controls">
            <div className="bs-search-controls__filters">
              <FilterControl
                aria-label="Reset creator course filters"
                icon="filter"
                onClick={resetFilters}
              >
                Filter
              </FilterControl>
              <CourseFilterSelect
                ariaLabel="Creator course level"
                icon="level"
                onChange={(event) => setLevel(event.currentTarget.value as CourseLevel | "all")}
                options={levelOptions}
                value={level}
              />
              <CourseFilterSelect
                ariaLabel="Creator course category"
                icon="category"
                onChange={(event) => setCategory(event.currentTarget.value as CourseCategory)}
                options={categoryOptions}
                value={category}
              />
            </div>

            <CourseFilterSelect
              ariaLabel="Sort creator courses"
              icon="sort"
              onChange={(event) => setSort(event.currentTarget.value as CourseSort)}
              options={sortOptions}
              value={sort}
            />
          </div>

          {visibleCourses.length === 0 ? (
            <section className="bs-creator-empty" aria-labelledby="creator-empty-title">
              <h2 id="creator-empty-title">No courses found</h2>
              <p>Try a different level or category.</p>
              <button type="button" onClick={resetFilters}>
                Reset filters
              </button>
            </section>
          ) : (
            <div className="bs-course-grid bs-creator-grid" data-testid="creator-course-grid">
              {visibleCourses.map((course) => (
                <CourseCard course={course} key={course.id} />
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
