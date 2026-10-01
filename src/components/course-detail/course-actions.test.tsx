import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  CoursePreviewAction,
  CourseShareButton,
  EnrollmentAction,
} from "@/components/course-detail/course-actions";
import { EnrollmentCard } from "@/components/course-detail/enrollment-card";
import { buildDigitalAssetDetail } from "@/data/course-details";

describe("course actions", () => {
  it("renders the Figma enrollment card with typed course data", () => {
    render(<EnrollmentCard detail={buildDigitalAssetDetail} />);
    expect(screen.getByRole("complementary", { name: "Course enrollment" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "112 Lessons (24 hours)" })).toBeInTheDocument();
    expect(screen.getByText("$25")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See Full Profile" })).toHaveAttribute(
      "href",
      "/creators/purepearl-studio",
    );
  });

  it("keeps enrollment interactive without pretending a checkout completed", () => {
    render(<EnrollmentAction />);
    fireEvent.click(screen.getByRole("button", { name: "Enroll Now" }));
    expect(screen.getByRole("status")).toHaveTextContent("no payment backend was supplied");
  });

  it("explains the media boundary instead of pretending to play a missing video", () => {
    render(<CoursePreviewAction />);
    fireEvent.click(screen.getByRole("button", { name: "Play course preview" }));
    expect(screen.getByRole("status")).toHaveTextContent("does not include a video source");
  });

  it("uses clipboard fallback in the rendered share control", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(window.navigator, "share", { configurable: true, value: undefined });
    Object.defineProperty(window.navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(<CourseShareButton title="Course" />);
    fireEvent.click(screen.getByRole("button", { name: "Share" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Course link copied");
    expect(writeText).toHaveBeenCalled();
  });
});
