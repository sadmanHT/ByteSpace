import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FilterControl } from "./filter-control";

describe("FilterControl", () => {
  it("is a keyboard-operable button and preserves pressed state when supplied", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <FilterControl aria-pressed="true" icon="filter" onClick={onClick}>
        Filter
      </FilterControl>,
    );

    const control = screen.getByRole("button", { name: "Filter", pressed: true });
    control.focus();
    await user.keyboard("{Enter}");

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
