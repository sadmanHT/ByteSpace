import Image from "next/image";

import { CourseIcon } from "@/components/course-detail/course-icons";
import type { CourseDetail } from "@/types/course-detail";

export function CourseAbout({ detail }: { detail: CourseDetail }) {
  return (
    <div className="bs-course-about">
      <section aria-labelledby="course-description-title">
        <h2 id="course-description-title">Description</h2>
        <div className="bs-course-about__description">
          {detail.description.split("\n\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section aria-labelledby="course-preview-images-title">
        <h2 id="course-preview-images-title">Sneak Peak</h2>
        <div className="bs-course-about__previews">
          {detail.previewImages.map((image) => (
            <Image
              alt={image.alt}
              height={125}
              key={image.figmaHash}
              src={image.src}
              width={167}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="course-key-points-title">
        <h2 id="course-key-points-title">Key Points</h2>
        <ul className="bs-course-about__key-points">
          {detail.keyPoints.map((point) => (
            <li key={point}>
              <CourseIcon height={24} name="check" width={24} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
