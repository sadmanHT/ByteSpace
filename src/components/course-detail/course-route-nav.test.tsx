import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CourseRouteNav } from "@/components/course-detail/course-route-nav";

describe("CourseRouteNav", () => {
  it("uses links and exposes the current route semantically", () => {
    render(<CourseRouteNav current="lessons" slug="build-digital-asset" />);
    expect(screen.getByRole("link", { name: "Lesson" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Reviews" })).toHaveAttribute(
      "href",
      "/courses/build-digital-asset/reviews",
    );
  });
});
