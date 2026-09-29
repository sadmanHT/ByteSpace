import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NotFoundExperience } from "./not-found-experience";

describe("NotFoundExperience", () => {
  it("provides the ByteSpace error copy and a real home route", () => {
    render(<NotFoundExperience />);

    expect(
      screen.getByRole("heading", { name: "The page you are looking for doesn't exist" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to Home" })).toHaveAttribute("href", "/");
  });
});
