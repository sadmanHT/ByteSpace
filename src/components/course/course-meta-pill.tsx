export type CourseMetaPillProps = {
  children: React.ReactNode;
};

export function CourseMetaPill({ children }: CourseMetaPillProps) {
  return <span className="bs-course-meta-pill">{children}</span>;
}
