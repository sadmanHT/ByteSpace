import type { CourseDetail } from "@/types/course-detail";

export function CourseLessons({ detail }: { detail: CourseDetail }) {
  return (
    <div className="bs-course-lessons">
      <section aria-labelledby="course-modules-title">
        <h2 id="course-modules-title">Explore the Modules</h2>
        <p>{detail.lessonIntro}</p>
      </section>

      <section aria-labelledby="course-lesson-list-title">
        <h2 id="course-lesson-list-title">Lesson List</h2>
        <ol className="bs-course-lessons__modules">
          {detail.modules.map((module) => (
            <li key={module.id}>
              <span className="bs-course-lessons__module-number" aria-hidden="true">
                {module.number}
              </span>
              <div>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="course-lesson-content-title">
        <h2 id="course-lesson-content-title">Lesson Content</h2>
        <p>{detail.lessonContentCopy}</p>
      </section>

      <section aria-labelledby="course-progress-copy-title">
        <h2 id="course-progress-copy-title">Lesson Progress Tracking</h2>
        <p>{detail.progressCopy}</p>
        <div className="bs-course-lessons__progress-card">
          <span>Learning Progress</span>
          <strong>{detail.learningProgress}%</strong>
          <progress
            aria-label={`Learning progress ${detail.learningProgress}%`}
            max={100}
            value={detail.learningProgress}
          >
            {detail.learningProgress}%
          </progress>
        </div>
      </section>
    </div>
  );
}
