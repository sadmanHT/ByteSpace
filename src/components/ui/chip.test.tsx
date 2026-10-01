import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Chip } from "./chip";

describe("Chip", () => {
  it("exposes its selected state with button semantics", () => {
    const { rerender } = render(<Chip selected={false}>Design</Chip>);
    const chip = screen.getByRole("button", { name: "Design" });

    expect(chip).toHaveAttribute("aria-pressed", "false");

    rerender(<Chip selected>Design</Chip>);
    expect(chip).toHaveAttribute("aria-pressed", "true");
  });
});
