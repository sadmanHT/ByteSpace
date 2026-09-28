import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  it("uses production route targets and exposes the current page", () => {
    render(<SiteHeader activeItem="courses" />);

    expect(screen.getByRole("link", { name: "ByteSpace home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Courses" })).toHaveAttribute("href", "/courses");
    expect(screen.getByRole("link", { name: "Creators" })).toHaveAttribute("href", "/creators");
    expect(screen.getByRole("link", { name: "Sign In" })).toHaveAttribute("href", "/login");
    expect(screen.getByRole("link", { name: "Join Us" })).toHaveAttribute("href", "/register");
    expect(screen.getByRole("link", { name: "Courses" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
