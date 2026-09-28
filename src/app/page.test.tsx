import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("renders the Phase 1 application foundation", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Engineering foundation ready for the Figma implementation.",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 2, name: "Runtime interaction check" }),
    ).toBeInTheDocument();
  });
});
