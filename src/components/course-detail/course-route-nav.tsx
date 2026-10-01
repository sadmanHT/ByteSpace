import Link from "next/link";

import { courseDetailHref } from "@/lib/course-detail";
import type { CourseDetailRoute } from "@/types/course-detail";

const routes: ReadonlyArray<Readonly<{ id: CourseDetailRoute; label: string }>> = [
  { id: "about", label: "About" },
  { id: "lessons", label: "Lesson" },
  { id: "reviews", label: "Reviews" },
];

export function CourseRouteNav({ current, slug }: { current: CourseDetailRoute; slug: string }) {
  return (
    <nav aria-label="Course sections" className="bs-course-route-nav">
      {routes.map((route) => (
        <Link
          aria-current={current === route.id ? "page" : undefined}
          className="bs-course-route-nav__link"
          data-route={route.id}
          href={courseDetailHref(slug, route.id)}
          key={route.id}
          prefetch={false}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
