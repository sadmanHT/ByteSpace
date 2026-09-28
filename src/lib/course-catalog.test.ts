import { describe, expect, it } from "vitest";

import { courses } from "@/data/courses";
import {
  filterCourses,
  formatCoursePrice,
  paginateCourses,
  sortCourses,
} from "@/lib/course-catalog";
import type { Course } from "@/types/course";

function withOverrides(course: Course, overrides: Partial<Course>): Course {
  return { ...course, ...overrides };
}

describe("course catalogue helpers", () => {
  it("matches queries case-insensitively without mutating the fixtures", () => {
    const before = courses.map((course) => course.id);
    const result = filterCourses(courses, { query: "MONEY MANAGEMENT" });

    expect(result.map((course) => course.title)).toEqual([
      "Mastering Money Management",
    ]);
    expect(courses.map((course) => course.id)).toEqual(before);
  });

  it("combines category and level filters", () => {
    const fixtures = [
      courses[0],
      withOverrides(courses[1], {
        category: "marketing",
        level: "intermediate",
      }),
    ];

    expect(
      filterCourses(fixtures, {
        category: "marketing",
        level: "intermediate",
      }),
    ).toEqual([fixtures[1]]);

    expect(
      filterCourses(fixtures, {
        category: "marketing",
        level: "advanced",
      }),
    ).toEqual([]);
  });

  it("preserves curated order for relevance and uses stable deterministic sorting", () => {
    const source = [courses[2], courses[0], courses[1]];
    const relevance = sortCourses(source, "relevance");

    expect(relevance.map((course) => course.id)).toEqual(
      source.map((course) => course.id),
    );
    expect(relevance).not.toBe(source);

    const equalRatings = source.map((course) =>
      withOverrides(course, { rating: 4.5 }),
    );
    expect(
      sortCourses(equalRatings, "rating-desc").map((course) => course.id),
    ).toEqual(equalRatings.map((course) => course.id));
  });

  it("clamps page boundaries and returns a stable empty result", () => {
    expect(paginateCourses(courses, 99, 3)).toMatchObject({
      currentPage: 2,
      pageCount: 2,
      total: 6,
    });
    expect(paginateCourses(courses, -10, 3).currentPage).toBe(1);
    expect(paginateCourses([], 4, 3)).toEqual({
      currentPage: 1,
      items: [],
      pageCount: 0,
      total: 0,
    });
  });

  it("rejects invalid page sizes and centralizes price formatting", () => {
    expect(() => paginateCourses(courses, 1, 0)).toThrow(
      "pageSize must be a positive integer",
    );
    expect(formatCoursePrice(25)).toBe("$25");
  });
});
