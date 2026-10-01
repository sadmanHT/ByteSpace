import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SearchField } from "./search-field";

describe("SearchField", () => {
  it("provides an accessible label while preserving the Figma placeholder", () => {
    render(<SearchField placeholder="Search" />);

    expect(screen.getByRole("searchbox", { name: "Search courses" })).toHaveAttribute(
      "placeholder",
      "Search",
    );
  });
});
