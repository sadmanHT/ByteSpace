import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { courses } from "@/data/courses";
import { purepearlCreator } from "@/data/creators";

import { CreatorProfile } from "./creator-profile";

describe("CreatorProfile", () => {
  it("renders source metrics and reuses the shared course-card system", () => {
    render(<CreatorProfile courses={courses} creator={purepearlCreator} />);

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("Followers")).toBeInTheDocument();
    expect(document.querySelectorAll(".bs-course-card")).toHaveLength(6);
  });

  it("exposes local follow state with aria-pressed semantics", async () => {
    const user = userEvent.setup();
    render(<CreatorProfile courses={courses} creator={purepearlCreator} />);

    const follow = screen.getByRole("button", { name: "Follow" });
    expect(follow).toHaveAttribute("aria-pressed", "false");

    await user.click(follow);

    expect(screen.getByRole("button", { name: "Following" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("renders selected filter state through native select controls", async () => {
    const user = userEvent.setup();
    render(<CreatorProfile courses={courses} creator={purepearlCreator} />);

    const level = screen.getByRole("combobox", { name: "Creator course level" });
    await user.selectOptions(level, "advanced");

    expect(level).toHaveValue("advanced");
    expect(screen.getByRole("heading", { name: "No courses found" })).toBeInTheDocument();
  });
});
