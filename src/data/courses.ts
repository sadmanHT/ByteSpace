import type { Course, CourseCategory, LearnerAvatar } from "@/types/course";

export const courseCategories: ReadonlyArray<
  Readonly<{ id: CourseCategory; label: string }>
> = [
  { id: "featured", label: "Featured" },
  { id: "music", label: "Music" },
  { id: "drawing-painting", label: "Drawing & Painting" },
  { id: "marketing", label: "Marketing" },
  { id: "animation", label: "Animation" },
  { id: "social-media", label: "Social Media" },
  { id: "ui-ux-design", label: "UI/UX Design" },
  { id: "creative-marketing", label: "Creative Marketing" },
  { id: "cooking", label: "Cooking" },
];

export const purepearlStudio = {
  id: "purepearl-studio",
  slug: "purepearl-studio",
  name: "purepearl studio",
} as const;

const courseLearners: readonly LearnerAvatar[] = [
  {
    alt: "",
    src: "/assets/avatars/b44979e1c98ecb3ec92ac86805fe55581fbeaa60.webp",
  },
  {
    alt: "",
    src: "/assets/avatars/3fe559181733e0fb69226caee836e40092facb44.webp",
  },
  {
    alt: "",
    src: "/assets/avatars/0577f0e9b7fca2f32639871454da0de95f951709.webp",
  },
  {
    alt: "",
    src: "/assets/avatars/d0cd3adb501c64c1b4cf766de6abb9fe8925fb5f.webp",
  },
] as const;

const sharedCourseData = {
  creator: purepearlStudio,
  lessons: 17,
  durationLabel: "2 hours 16 mins",
  comments: 59,
  level: "beginner",
  rating: 4.5,
  price: 25,
  billingLabel: "lifetime",
  learners: courseLearners,
  learnerOverflow: 26,
  category: "featured",
} as const;

export const courses: readonly Course[] = [
  {
    ...sharedCourseData,
    id: "learn-figma-from-basic",
    slug: "learn-figma-from-basic",
    title: "Learn Figma from Basic",
    image: {
      src: "/assets/courses/93ad9f9e6bdb3c7f3c478820624ee19ad7320072.webp",
      alt: "Designers reviewing interface wireframes on a desk",
      figmaHash: "93ad9f9e6bdb3c7f3c478820624ee19ad7320072",
    },
  },
  {
    ...sharedCourseData,
    id: "build-digital-asset",
    slug: "build-digital-asset",
    title: "Build Digital Asset",
    image: {
      src: "/assets/courses/c88264191d691ba3300ad4f82a942429bb912fa5.webp",
      alt: "A digital interface with floating application icons",
      figmaHash: "c88264191d691ba3300ad4f82a942429bb912fa5",
    },
  },
  {
    ...sharedCourseData,
    id: "the-power-of-big-data",
    slug: "the-power-of-big-data",
    title: "the Power of Big Data",
    image: {
      src: "/assets/courses/4f3bdea5688b1a654db7a29b0bc5dd3563059d11.webp",
      alt: "Analytics dashboard displayed on a desktop monitor",
      figmaHash: "4f3bdea5688b1a654db7a29b0bc5dd3563059d11",
    },
  },
  {
    ...sharedCourseData,
    id: "balancing-productivity-and-self-care",
    slug: "balancing-productivity-and-self-care",
    title: "Balancing Productivity and Self-Care",
    image: {
      src: "/assets/courses/72e18d90fb9ddac1944e3483a501f3cdae505f57.webp",
      alt: "Desk workspace with a monitor displaying the words do more",
      figmaHash: "72e18d90fb9ddac1944e3483a501f3cdae505f57",
    },
  },
  {
    ...sharedCourseData,
    id: "mastering-money-management",
    slug: "mastering-money-management",
    title: "Mastering Money Management",
    image: {
      src: "/assets/courses/a89789455304dbf5cadc8e011bc26c97145aa56c.webp",
      alt: "Financial line graph rising across a dark grid",
      figmaHash: "a89789455304dbf5cadc8e011bc26c97145aa56c",
    },
  },
  {
    ...sharedCourseData,
    id: "from-idea-to-startup-success",
    slug: "from-idea-to-startup-success",
    title: "From Idea to Startup Success",
    image: {
      src: "/assets/courses/69362b026219ac3eb8b4e77e8bbe4e18c4464b44.webp",
      alt: "Team members brainstorming with sticky notes on a wall",
      figmaHash: "69362b026219ac3eb8b4e77e8bbe4e18c4464b44",
    },
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}
