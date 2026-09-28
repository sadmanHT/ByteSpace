import type { Course, CourseCategory, CourseLevel, CourseSort } from "@/types/course";

export type CourseFilters = Readonly<{
  query?: string;
  category?: CourseCategory | "all";
  level?: CourseLevel | "all";
}>;

export type PaginatedCourses = Readonly<{
  currentPage: number;
  items: readonly Course[];
  pageCount: number;
  total: number;
}>;

export function normalizeCourseQuery(query: string): string {
  return query.trim().toLocaleLowerCase();
}

export function filterCourses(
  source: readonly Course[],
  filters: CourseFilters,
): readonly Course[] {
  const normalizedQuery = normalizeCourseQuery(filters.query ?? "");
  const category = filters.category ?? "all";
  const level = filters.level ?? "all";

  return source.filter((course) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      course.title.toLocaleLowerCase().includes(normalizedQuery) ||
      course.creator.name.toLocaleLowerCase().includes(normalizedQuery);

    const matchesCategory = category === "all" || course.category === category;
    const matchesLevel = level === "all" || course.level === level;

    return matchesQuery && matchesCategory && matchesLevel;
  });
}

export function sortCourses(source: readonly Course[], sort: CourseSort): readonly Course[] {
  if (sort === "relevance") {
    return [...source];
  }

  return source
    .map((course, index) => ({ course, index }))
    .sort((left, right) => {
      let result = 0;

      if (sort === "title-asc") {
        result = left.course.title.localeCompare(right.course.title);
      } else if (sort === "price-asc") {
        result = left.course.price - right.course.price;
      } else if (sort === "rating-desc") {
        result = right.course.rating - left.course.rating;
      }

      return result || left.index - right.index;
    })
    .map(({ course }) => course);
}

export function paginateCourses(
  source: readonly Course[],
  requestedPage: number,
  pageSize: number,
): PaginatedCourses {
  if (!Number.isInteger(pageSize) || pageSize <= 0) {
    throw new Error("pageSize must be a positive integer");
  }

  const total = source.length;
  const pageCount = total === 0 ? 0 : Math.ceil(total / pageSize);
  const currentPage =
    pageCount === 0 ? 1 : Math.min(Math.max(Math.trunc(requestedPage) || 1, 1), pageCount);
  const start = (currentPage - 1) * pageSize;

  return {
    currentPage,
    items: source.slice(start, start + pageSize),
    pageCount,
    total,
  };
}

export function formatCoursePrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatCourseLevel(level: CourseLevel): string {
  return level.charAt(0).toUpperCase() + level.slice(1);
}
