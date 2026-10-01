"use client";

import { useState } from "react";

import { CategoryTabs } from "@/components/ui/category-tabs";
import { FilterControl } from "@/components/ui/filter-control";
import { Pagination } from "@/components/ui/pagination";

const categories = [
  { id: "featured", label: "Featured" },
  { id: "music", label: "Music" },
  { id: "drawing", label: "Drawing & Painting" },
  { id: "marketing", label: "Marketing" },
  { id: "animation", label: "Animation" },
  { id: "social", label: "Social Media" },
  { id: "uiux", label: "UI/UX Design" },
] as const;

export function SharedUiDemo() {
  const [category, setCategory] = useState("featured");
  const [page, setPage] = useState(1);

  return (
    <div className="grid gap-10">
      <CategoryTabs items={categories} onChange={setCategory} value={category} />

      <div className="flex flex-wrap gap-4">
        <FilterControl icon="filter">Filter</FilterControl>
        <FilterControl icon="level">Level</FilterControl>
        <FilterControl icon="category">Category</FilterControl>
        <FilterControl icon="sort">Most relevant</FilterControl>
      </div>

      <Pagination currentPage={page} onPageChange={setPage} pageCount={5} />
    </div>
  );
}
