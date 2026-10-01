import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { FoundationCheck } from "./foundation-check";

describe("FoundationCheck", () => {
  it("supports keyboard interaction and exposes status feedback", async () => {
    const user = userEvent.setup();
    render(<FoundationCheck />);

    const button = screen.getByRole("button", { name: "Run interaction check" });
    button.focus();
    expect(button).toHaveFocus();

    await user.keyboard("{Enter}");

    expect(screen.getByRole("button", { name: "Interaction verified" })).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent("Client-side interaction is working.");
  });
});
