import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CategoryTabs } from "./category-tabs";

const items = [
  { id: "featured", label: "Featured" },
  { id: "music", label: "Music" },
] as const;

describe("CategoryTabs", () => {
  it("supports keyboard activation and exposes the selected category", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<CategoryTabs items={items} onChange={onChange} value="featured" />);

    const featured = screen.getByRole("button", { name: "Featured" });
    const music = screen.getByRole("button", { name: "Music" });

    expect(featured).toHaveAttribute("aria-pressed", "true");
    expect(music).toHaveAttribute("aria-pressed", "false");

    music.focus();
    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledWith("music");
  });
});
