import { SearchExperience } from "@/components/discovery/search-experience";
import { courses } from "@/data/courses";

type CoursesPageProps = {
  searchParams: Promise<{ query?: string | string[] }>;
};

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const params = await searchParams;
  const query = Array.isArray(params.query) ? (params.query[0] ?? "") : (params.query ?? "");

  return <SearchExperience courses={courses} initialQuery={query} />;
}
