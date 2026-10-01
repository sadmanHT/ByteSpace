"use client";

import { Chip } from "@/components/ui/chip";

export type CategoryTabItem = {
  id: string;
  label: string;
};

export type CategoryTabsProps = {
  items: readonly CategoryTabItem[];
  onChange: (id: string) => void;
  value: string;
};

export function CategoryTabs({ items, onChange, value }: CategoryTabsProps) {
  return (
    <div aria-label="Course categories" className="bs-category-tabs" role="group">
      {items.map((item) => (
        <Chip key={item.id} onClick={() => onChange(item.id)} selected={item.id === value}>
          {item.label}
        </Chip>
      ))}
    </div>
  );
}
