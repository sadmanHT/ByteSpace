import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AvatarStack } from "./avatar-stack";

describe("AvatarStack", () => {
  it("keeps meaningful avatar alternatives and describes overflow", () => {
    render(
      <AvatarStack
        avatars={[
          { alt: "Alex Morgan", src: "/alex.webp" },
          { alt: "Jordan Lee", src: "/jordan.webp" },
        ]}
        overflowLabel="26+"
      />,
    );

    expect(screen.getByAltText("Alex Morgan")).toBeInTheDocument();
    expect(screen.getByAltText("Jordan Lee")).toBeInTheDocument();
    expect(screen.getByLabelText("26+ more learners")).toBeInTheDocument();
  });
});
