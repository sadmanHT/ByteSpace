import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CourseCard } from "@/components/course/course-card";
import { courses } from "@/data/courses";

describe("CourseCard", () => {
  it("renders the native-Figma metadata with separate semantic links", () => {
    const course = courses[0];
    const { container } = render(<CourseCard course={course} />);

    const card = container.querySelector("[data-course-id]");
    expect(card).not.toBeNull();

    expect(
      screen.getByRole("link", { name: "Learn Figma from Basic" }),
    ).toHaveAttribute("href", "/courses/learn-figma-from-basic");
    expect(screen.getByRole("link", { name: "purepearl studio" })).toHaveAttribute(
      "href",
      "/creators/purepearl-studio",
    );

    expect(screen.getByAltText(course.image.alt)).toBeInTheDocument();
    expect(screen.getByText("17 Lessons")).toBeInTheDocument();
    expect(screen.getByText("2 hours 16 mins")).toBeInTheDocument();
    expect(screen.getByText("59 Comments")).toBeInTheDocument();
    expect(screen.getByText("Beginner")).toBeInTheDocument();
    expect(screen.getByText("$25")).toBeInTheDocument();
    expect(screen.getByText("/lifetime")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "4.5 out of 5 stars" })).toBeInTheDocument();
    expect(screen.getByLabelText("26+ more learners")).toBeInTheDocument();

    expect(card ? within(card).getAllByRole("link") : []).toHaveLength(2);
  });

  it("supports the observed Home treatment without forking card markup", () => {
    const { container } = render(
      <CourseCard course={courses[0]} levelTone="success" overflowTone="dark" />,
    );

    expect(container.querySelector(".bs-course-card__level--success")).not.toBeNull();
    expect(container.querySelector(".bs-avatar-stack--dark")).not.toBeNull();
  });
});
