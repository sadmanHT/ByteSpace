"use client";

import { MaterialIcon } from "@/components/ui/material-icon";

export type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  pageCount: number;
};

export function Pagination({ currentPage, onPageChange, pageCount }: PaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav aria-label="Pagination" className="bs-pagination">
      <button
        aria-label="Previous page"
        className="bs-pagination__arrow"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        type="button"
      >
        <MaterialIcon height={24} name="arrow-back" width={24} />
      </button>

      {pages.map((page) => (
        <button
          aria-current={currentPage === page ? "page" : undefined}
          aria-label={`Page ${page}`}
          className="bs-pagination__page"
          key={page}
          onClick={() => onPageChange(page)}
          type="button"
        >
          {page}
        </button>
      ))}

      <button
        aria-label="Next page"
        className="bs-pagination__arrow"
        disabled={currentPage >= pageCount}
        onClick={() => onPageChange(currentPage + 1)}
        type="button"
      >
        <MaterialIcon height={24} name="arrow-forward" width={24} />
      </button>
    </nav>
  );
}
