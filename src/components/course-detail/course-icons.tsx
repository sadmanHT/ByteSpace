import type { SVGProps } from "react";

type CourseIconName =
  | "check"
  | "group"
  | "play"
  | "resource"
  | "share"
  | "star";

const paths: Record<CourseIconName, string> = {
  check: "M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17Z",
  group:
    "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-.32 0-.63.05-.91.14.57.8.91 1.79.91 2.86s-.34 2.06-.91 2.86c.28.09.59.14.91.14Zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5Z",
  play: "M8 5v14l11-7L8 5Z",
  resource:
    "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 16H5V5h14v14Zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4v4Z",
  share:
    "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.03-.47-.09-.7l7.05-4.11A2.99 2.99 0 1 0 15 5c0 .24.04.47.09.7L8.04 9.81A3 3 0 1 0 8.04 14l7.12 4.16c-.05.21-.08.43-.08.65A2.92 2.92 0 1 0 18 16.08Z",
  star: "m12 17.27 5.18 3.13-1.64-5.89L20.1 10l-6.01-.52L12 4l-2.09 5.48L3.9 10l4.56 4.51-1.64 5.89L12 17.27Z",
};

export function CourseIcon({ name, ...props }: SVGProps<SVGSVGElement> & { name: CourseIconName }) {
  return (
    <svg aria-hidden="true" fill="currentColor" focusable="false" viewBox="0 0 24 24" {...props}>
      <path d={paths[name]} />
    </svg>
  );
}
