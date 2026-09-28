import type { SVGProps } from "react";

export type MaterialIconName =
  | "arrow-back"
  | "arrow-forward"
  | "category"
  | "filter"
  | "level"
  | "search"
  | "shopping-bag"
  | "sort"
  | "star"
  | "star-outline";

type IconGeometry = {
  path: string;
  transform?: string;
};

const iconGeometry: Record<MaterialIconName, IconGeometry> = {
  "shopping-bag": {
    path: "M14 4H12C12 1.79 10.21 0 8 0S4 1.79 4 4H2C.9 4 0 4.9 0 6V18C0 19.1.9 20 2 20H14C15.1 20 16 19.1 16 18V6C16 4.9 15.1 4 14 4ZM8 2C9.1 2 10 2.9 10 4H6C6 2.9 6.9 2 8 2ZM14 18H2V6H4V8C4 8.55 4.45 9 5 9S6 8.55 6 8V6H10V8C10 8.55 10.45 9 11 9S12 8.55 12 8V6H14V18Z",
    transform: "translate(4 2)",
  },
  star: {
    path: "M10.31 5.553 8.84.712C8.55-.238 7.21-.238 6.93.712L5.45 5.553H1C.03 5.553-.37 6.803.42 7.363L4.06 9.962 2.63 14.573C2.34 15.503 3.42 16.253 4.19 15.663L7.88 12.862 11.57 15.673C12.34 16.263 13.42 15.513 13.13 14.583L11.7 9.972 15.34 7.372C16.13 6.802 15.73 5.563 14.76 5.563H10.31V5.553Z",
    transform: "translate(4.12 4.16)",
  },
  "star-outline": {
    path: "M22 9.24 14.81 8.62 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27 18.18 21 16.55 13.97 22 9.24ZM12 15.4 8.24 17.67 9.24 13.39 5.92 10.51 10.3 10.13 12 6.1 13.71 10.14 18.09 10.52 14.77 13.4 15.77 17.68 12 15.4Z",
  },
  level: {
    path: "M12 0H15V16H12V0ZM0 10H3V16H0V10ZM6 5H9V16H6V5Z",
    transform: "translate(4.5 4)",
  },
  filter: {
    path: "M2.962 2H12.962L7.952 8.3 2.962 2ZM.212 1.61C2.232 4.2 5.962 9 5.962 9V15C5.962 15.55 6.412 16 6.962 16H8.962C9.512 16 9.962 15.55 9.962 15V9S13.682 4.2 15.702 1.61C16.212.95 15.742 0 14.912 0H1.002C.172 0-.298.95.212 1.61Z",
    transform: "translate(4 4)",
  },
  category: {
    path: "M9 0 3.5 9H14.5L9 0ZM9 3.84 10.93 7H7.06L9 3.84ZM14.5 11C12.01 11 10 13.01 10 15.5S12.01 20 14.5 20 19 17.99 19 15.5 16.99 11 14.5 11ZM14.5 18C13.12 18 12 16.88 12 15.5S13.12 13 14.5 13 17 14.12 17 15.5 15.88 18 14.5 18ZM0 19.5H8V11.5H0V19.5ZM2 13.5H6V17.5H2V13.5Z",
    transform: "translate(2.5 2)",
  },
  sort: {
    path: "M0 12H6V10H0V12ZM0 0V2H18V0H0ZM0 7H12V5H0V7Z",
    transform: "translate(3 6)",
  },
  "arrow-back": {
    path: "M11.77 1.77 10 0 0 10 10 20 11.77 18.23 3.54 10 11.77 1.77Z",
    transform: "translate(6.115 2)",
  },
  "arrow-forward": {
    path: "M0 18.23 1.77 20 11.77 10 1.77 0 0 1.77 8.23 10 0 18.23Z",
    transform: "translate(6.115 2)",
  },
  search: {
    path: "M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5 13 2.91 10.09 0 6.5 0S0 2.91 0 6.5 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49 17.49 16 12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11Z",
    transform: "translate(3.255 3.255)",
  },
};

export type MaterialIconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: MaterialIconName;
};

export function MaterialIcon({ name, ...props }: MaterialIconProps) {
  const geometry = iconGeometry[name];

  return (
    <svg aria-hidden="true" fill="currentColor" focusable="false" viewBox="0 0 24 24" {...props}>
      <path d={geometry.path} transform={geometry.transform} />
    </svg>
  );
}
