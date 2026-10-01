import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TextField } from "./text-field";

describe("TextField", () => {
  it("associates its label, hint, and error with the input", () => {
    render(
      <TextField
        error="Enter a valid email address."
        hint="We will only use this for your account."
        label="Email address"
        name="email"
      />,
    );

    const input = screen.getByRole("textbox", { name: "Email address" });
    const hint = screen.getByText("We will only use this for your account.");
    const error = screen.getByText("Enter a valid email address.");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", expect.stringContaining(hint.id));
    expect(input).toHaveAttribute("aria-describedby", expect.stringContaining(error.id));
  });
});
