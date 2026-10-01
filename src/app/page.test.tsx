import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("renders the native-Figma home content and semantic search", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Get Access to Hundreds Courses Available" }),
    ).toBeInTheDocument();

    const search = screen.getByRole("searchbox", { name: "Search courses" });
    expect(search).toHaveAttribute("name", "query");
    expect(search).toHaveAttribute("placeholder", "Course, topic, creator");

    expect(screen.getAllByRole("link", { name: "Learn Figma from Basic" }).length).toBeGreaterThan(
      0,
    );
    expect(screen.getByRole("link", { name: "Join as Creator" })).toHaveAttribute(
      "href",
      "/creators",
    );
  });

  it("exposes the complete Home category set and selectable state", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const music = screen.getByRole("button", { name: "Music" });
    expect(screen.getByRole("button", { name: "Featured" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await user.click(music);
    expect(music).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Featured" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );

    expect(
      screen.getByRole("button", { name: "Freelance & Entrepreneurship" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Data Science" })).toBeInTheDocument();
  });

  it("keeps each testimonial quote associated with its author", () => {
    render(<Home />);
    expect(screen.getByText("Sarah M.").closest("article")).toHaveTextContent(
      "ByteSpace has transformed my approach to learning.",
    );
    expect(screen.getByText("James L.").closest("article")).toHaveTextContent(
      "I've tried several online learning platforms",
    );
    expect(screen.getByText("Alex B.").closest("article")).toHaveTextContent(
      "As a creator, ByteSpace has been a game-changer for me.",
    );
  });
});
