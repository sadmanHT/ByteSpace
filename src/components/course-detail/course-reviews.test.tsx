import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CourseLessons } from "@/components/course-detail/course-lessons";
import { CourseReviews } from "@/components/course-detail/course-reviews";
import { buildDigitalAssetDetail } from "@/data/course-details";

describe("course detail bodies", () => {
  it("filters supplied reviews without fabricating missing ratings", () => {
    render(<CourseReviews detail={buildDigitalAssetDetail} />);
    expect(screen.getAllByRole("article")).toHaveLength(4);
    fireEvent.click(screen.getByRole("button", { name: "5" }));
    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(screen.getByRole("heading", { name: "PurePearl Studio" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "4" }));
    expect(screen.getByText("No supplied reviews match this rating.")).toBeInTheDocument();
  });

  it("exposes the static Figma progress fixture with native progress semantics", () => {
    render(<CourseLessons detail={buildDigitalAssetDetail} />);
    const progress = screen.getByRole("progressbar", { name: "Learning progress 55%" });
    expect(progress).toHaveAttribute("value", "55");
    expect(progress).toHaveAttribute("max", "100");
  });
});
