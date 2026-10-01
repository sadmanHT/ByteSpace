import { describe, expect, it, vi } from "vitest";

import { buildDigitalAssetDetail } from "@/data/course-details";
import {
  courseDetailHref,
  filterCourseReviews,
  getCourseModuleByNumber,
  shareCourseLink,
} from "@/lib/course-detail";

describe("course detail helpers", () => {
  it("builds stable route-backed navigation", () => {
    expect(courseDetailHref("build-digital-asset", "about")).toBe("/courses/build-digital-asset");
    expect(courseDetailHref("build-digital-asset", "lessons")).toBe(
      "/courses/build-digital-asset/lessons",
    );
    expect(courseDetailHref("build-digital-asset", "reviews")).toBe(
      "/courses/build-digital-asset/reviews",
    );
  });

  it("finds supplied modules without inventing missing module numbers", () => {
    expect(getCourseModuleByNumber(buildDigitalAssetDetail.modules, "04")?.title).toContain(
      "User-Centric",
    );
    expect(getCourseModuleByNumber(buildDigitalAssetDetail.modules, "03")).toBeUndefined();
  });

  it("filters reviews locally by rating", () => {
    expect(filterCourseReviews(buildDigitalAssetDetail.reviews, "all")).toHaveLength(4);
    expect(
      filterCourseReviews(buildDigitalAssetDetail.reviews, 5).map((review) => review.name),
    ).toEqual(["PurePearl Studio", "Albert Flores", "Cody Fisher", "Brooklyn Simmons"]);
    expect(filterCourseReviews(buildDigitalAssetDetail.reviews, 4)).toEqual([]);
  });

  it("uses Web Share when available", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    const writeText = vi.fn().mockResolvedValue(undefined);

    await expect(
      shareCourseLink({ share, clipboard: { writeText } }, "https://example.com/course", "Course"),
    ).resolves.toBe("shared");
    expect(share).toHaveBeenCalledWith({ title: "Course", url: "https://example.com/course" });
    expect(writeText).not.toHaveBeenCalled();
  });

  it("falls back to copying the URL when Web Share is unavailable", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);

    await expect(
      shareCourseLink({ clipboard: { writeText } }, "https://example.com/course", "Course"),
    ).resolves.toBe("copied");
    expect(writeText).toHaveBeenCalledWith("https://example.com/course");
  });
});
