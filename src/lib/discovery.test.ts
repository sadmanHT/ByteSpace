import { describe, expect, it } from "vitest";

import { courses } from "@/data/courses";
import { purepearlCreator } from "@/data/creators";

import {
  buildSearchPlacements,
  getCreatorCourses,
  resetDiscoveryPage,
  toggleLocalFollow,
} from "./discovery";

describe("Phase 7 discovery helpers", () => {
  it("builds the 18-card native-Figma search placement grid without inventing courses", () => {
    const placements = buildSearchPlacements(courses, 1);

    expect(placements).toHaveLength(18);
    expect(placements.slice(0, 6).map(({ course }) => course.slug)).toEqual(
      courses.map((course) => course.slug),
    );
    expect(new Set(placements.map(({ course }) => course.slug))).toEqual(
      new Set(courses.map((course) => course.slug)),
    );
  });

  it("changes pagination placement order deterministically", () => {
    const firstPage = buildSearchPlacements(courses, 1);
    const secondPage = buildSearchPlacements(courses, 2);

    expect(firstPage[0]?.course.slug).toBe("learn-figma-from-basic");
    expect(secondPage[0]?.course.slug).toBe("build-digital-asset");
  });

  it("resets discovery pagination when filter state changes", () => {
    expect(resetDiscoveryPage()).toBe(1);
  });

  it("associates creator courses from canonical course fixtures", () => {
    const creatorCourses = getCreatorCourses(purepearlCreator, courses);

    expect(creatorCourses).toHaveLength(6);
    expect(creatorCourses.every((course) => course.creator.slug === purepearlCreator.slug)).toBe(
      true,
    );
  });

  it("toggles local follow state without persistence", () => {
    expect(toggleLocalFollow(false)).toBe(true);
    expect(toggleLocalFollow(true)).toBe(false);
  });
});
