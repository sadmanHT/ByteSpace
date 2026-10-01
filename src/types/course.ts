export type CourseLevel = "beginner" | "intermediate" | "advanced";

export type CourseCategory =
  | "featured"
  | "music"
  | "drawing-painting"
  | "marketing"
  | "animation"
  | "social-media"
  | "ui-ux-design"
  | "creative-marketing"
  | "cooking";

export type CreatorSummary = Readonly<{
  id: string;
  slug: string;
  name: string;
}>;

export type LearnerAvatar = Readonly<{
  alt: string;
  src: string;
}>;

export type CourseImage = Readonly<{
  alt: string;
  figmaHash: string;
  src: string;
}>;

export type Course = Readonly<{
  id: string;
  slug: string;
  title: string;
  creator: CreatorSummary;
  image: CourseImage;
  lessons: number;
  durationLabel: string;
  comments: number;
  level: CourseLevel;
  rating: number;
  price: number;
  billingLabel: string;
  learners: readonly LearnerAvatar[];
  learnerOverflow: number;
  category: CourseCategory;
}>;

export type CourseSort = "relevance" | "title-asc" | "price-asc" | "rating-desc";
