export type CourseDetailRoute = "about" | "lessons" | "reviews";

export type CourseDetailImage = Readonly<{
  alt: string;
  figmaHash: string;
  src: string;
}>;

export type CourseSidebarLesson = Readonly<{
  duration: string;
  number: string;
  title: string;
}>;

export type CourseModule = Readonly<{
  description: string;
  id: string;
  number: string;
  title: string;
}>;

export type CourseInstructorDetail = Readonly<{
  avatar: CourseDetailImage;
  name: string;
  role: string;
  slug: string;
}>;

export type CourseReview = Readonly<{
  avatar: CourseDetailImage;
  body: string;
  dateLabel: string;
  id: string;
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  role: string;
}>;

export type RatingDistributionEntry = Readonly<{
  count: number;
  rating: 1 | 2 | 3 | 4 | 5;
  visualPercent: number;
}>;

export type CourseDetail = Readonly<{
  aggregateRating: number;
  billingLabel: string;
  courseSlug: string;
  description: string;
  includedFeatures: readonly string[];
  instructor: CourseInstructorDetail;
  keyPoints: readonly string[];
  learnerCount: number;
  lessonContentCopy: string;
  lessonIntro: string;
  learningProgress: number;
  levelLabel: string;
  media: CourseDetailImage;
  modules: readonly CourseModule[];
  previewImages: readonly CourseDetailImage[];
  price: number;
  progressCopy: string;
  rating: number;
  ratingDistribution: readonly RatingDistributionEntry[];
  reviewCount: number;
  reviewIntro: string;
  reviews: readonly CourseReview[];
  sidebarLessons: readonly CourseSidebarLesson[];
  sidebarRemainingLabel: string;
  subtitle: string;
  title: string;
  totalDurationLabel: string;
  totalLessons: number;
}>;
