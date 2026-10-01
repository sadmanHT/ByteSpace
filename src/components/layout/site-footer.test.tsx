import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SiteFooter } from "./site-footer";

describe("SiteFooter", () => {
  it("labels the newsletter field and handles frontend-only submission without navigation", async () => {
    const user = userEvent.setup();

    render(<SiteFooter />);

    const email = screen.getByRole("textbox", { name: "Email address" });
    expect(email).toHaveAttribute("type", "email");

    await user.type(email, "learner@example.com");
    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "Newsletter submission is not connected to a backend yet.",
    );
  });
});
