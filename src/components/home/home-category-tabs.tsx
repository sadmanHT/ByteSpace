"use client";

import { useState } from "react";

const rows = [
  [
    "Featured",
    "Music",
    "Drawing & Painting",
    "Marketing",
    "Animation",
    "Social Media",
    "UI/UX Design",
    "Creative Marketing",
  ],
  [
    "Digital Illustration",
    "Film & Video",
    "Crafts",
    "Freelance & Entrepreneurship",
    "Graphic Design",
    "Photography",
  ],
  ["Productivity", "Web Development", "Data Science", "Cooking", "+ More"],
] as const;

export const homeCategoryLabels = rows.flat();

export function HomeCategoryTabs() {
  const [selected, setSelected] = useState<(typeof homeCategoryLabels)[number]>("Featured");

  return (
    <div aria-label="Browse course categories" className="bs-home-categories" role="group">
      {rows.map((row, rowIndex) => (
        <div className="bs-home-categories__row" key={rowIndex}>
          {row.map((label) => (
            <button
              aria-pressed={selected === label}
              className="bs-home-category-chip"
              key={label}
              onClick={() => setSelected(label)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
