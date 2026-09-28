import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CourseCatalogue } from "@/app/courses/course-catalogue";
import { courses } from "@/data/courses";

describe("CourseCatalogue", () => {
  it("updates filters accessibly, exposes an empty state, and resets pagination", async () => {
    const user = userEvent.setup();
    render(<CourseCatalogue courses={courses} />);

    expect(screen.getByRole("button", { name: "Page 1" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    await user.click(screen.getByRole("button", { name: "Page 2" }));
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    await user.selectOptions(screen.getByRole("combobox", { name: "Level" }), "advanced");
    expect(screen.getByRole("combobox", { name: "Level" })).toHaveValue("advanced");
    expect(screen.getByRole("heading", { name: "No courses found" })).toBeInTheDocument();

    await user.selectOptions(screen.getByRole("combobox", { name: "Level" }), "beginner");
    expect(screen.getByRole("button", { name: "Page 1" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
