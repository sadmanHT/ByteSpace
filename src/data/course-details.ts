import type { CourseDetail } from "@/types/course-detail";

const courseDetailAsset = (hash: string, alt: string, src = `/assets/course-detail/${hash}.webp`) => ({
  alt,
  figmaHash: hash,
  src,
});

export const buildDigitalAssetDetail: CourseDetail = {
  aggregateRating: 4.7,
  billingLabel: "lifetime",
  courseSlug: "build-digital-asset",
  description:
    'Embark on an enlightening exploration into the world of digital creation with our comprehensive course, "Build Digital Assets: A Comprehensive Guide." This transformative learning experience invites you to delve deep into the intricacies of crafting impactful digital content. From laying the groundwork with foundational concepts to mastering advanced techniques, this guide is meticulously curated to empower you with the skills essential for navigating the dynamic landscape of digital asset creation.\n\nIn the initial modules, you\'ll establish a solid foundation by immersing yourself in the foundational concepts that form the backbone of digital asset creation. Understand the fundamental elements that constitute compelling digital content and gain proficiency in leveraging these elements to communicate effectively in the digital realm.\n\nAs you progress through the course, you\'ll ascend to higher levels of expertise, delving into the nuances of design principles that drive impactful creations. Uncover the secrets behind effective visual communication, exploring color theory, typography, and layout strategies that elevate your digital assets to new heights. Engage in hands-on exercises that reinforce your understanding, allowing you to apply these principles in practical scenarios.',
  includedFeatures: [
    "Learning Resources",
    "Quality Lesson Videos",
    "Certificate of Completion",
    "Private Consultation",
  ],
  instructor: {
    avatar: courseDetailAsset(
      "bfd09b20f2cf44bfa3af771f6396363d4ae67aab",
      "PurePearl Studio creator portrait",
    ),
    name: "PurePearl Studio",
    role: "Professional Creator",
    slug: "purepearl-studio",
  },
  keyPoints: [
    "Foundational Concepts",
    "Design Principles Mastery",
    "Advanced Techniques in Digital Creation",
    "Project Showcase and Critique",
    "Optimizing for Various Platforms",
    "Digital Asset Management Best Practices",
    "Monetization Strategies",
    "Capstone Project: Building Your Portfolio",
  ],
  learnerCount: 199,
  lessonContentCopy:
    "Engage with each lesson through captivating video content, detailed textual explanations, and interactive elements. Download resources, complete assignments, and test your understanding with quizzes.",
  lessonIntro:
    "Immerse yourself in the course content as we break down each module into comprehensive lessons, providing practical insights and hands-on experiences.",
  learningProgress: 55,
  levelLabel: "Intermediate",
  media: courseDetailAsset(
    "71d7929ee0ecb2198c9955a8e842f4991dcb4655",
    "Portrait used as the supplied course preview poster",
  ),
  modules: [
    {
      id: "module-1",
      number: "01",
      title: "Module 1: Introduction to Digital Assets",
      description:
        "Lay the groundwork with lessons like 'Understanding Digital Elements' and 'Navigating Design Software Tools.' Dive into the essentials of digital asset creation.",
    },
    {
      id: "module-2",
      number: "02",
      title: "Module 2: Design Principles for Impact",
      description:
        "Master the principles that drive impactful designs with lessons such as 'Color Theory in Digital Design' and 'Typography Essentials.' Elevate your visual communication skills.",
    },
    {
      id: "module-4",
      number: "04",
      title: "Module 4: User-Centric Design Strategies",
      description:
        "Understand 'Design Thinking in Digital Creation' and delve into 'User Experience (UX) Essentials.' Craft digital assets with a focus on user-centric design.",
    },
    {
      id: "module-5",
      number: "05",
      title: "Module 5: Interactive Media and Engagement",
      description:
        "Engage your audience with lessons like 'Creating Interactive Presentations' and 'Integrating Multimedia Elements.' Master the art of creating immersive digital experiences.",
    },
    {
      id: "module-6",
      number: "06",
      title: "Module 6: Project Showcase and Critique",
      description:
        "Perfect your presentation skills with 'Effective Presentation Techniques' and embrace collaboration with 'Peer Critique and Collaboration.' Showcase your work with confidence.",
    },
    {
      id: "module-7",
      number: "07",
      title: "Module 7: Optimizing Digital Assets for Various Platforms",
      description:
        "Adapt your digital creations for 'Mobile Platforms' and optimize for 'Social Media.' Ensure widespread accessibility and engagement across diverse digital landscapes.",
    },
  ],
  previewImages: [
    courseDetailAsset(
      "a7c9406fd05787fc6c03edf5db05f212b96366a6",
      "Wireframe sketch for a mobile interface",
    ),
    courseDetailAsset(
      "d443b5217bfd460249d4ac0712aa129bc29a8919",
      "Design work displayed on a laptop",
    ),
    courseDetailAsset(
      "2e1b62a2460ffba94cc633550f3a06e03b29b432",
      "Interface design displayed on a desktop monitor",
    ),
    courseDetailAsset(
      "0c1762672f5c64aa67de3991c2ac4aa729328623",
      "Colorful mobile application interfaces",
    ),
  ],
  price: 25,
  progressCopy:
    "Witness your growth as you complete lessons, with an intuitive progress tracking feature guiding you through your learning journey.",
  rating: 4.8,
  ratingDistribution: [
    { rating: 5, count: 720, visualPercent: 92.28 },
    { rating: 4, count: 120, visualPercent: 36.49 },
    { rating: 3, count: 21, visualPercent: 9.47 },
    { rating: 2, count: 12, visualPercent: 3.51 },
    { rating: 1, count: 16, visualPercent: 5.26 },
  ],
  reviewCount: 172,
  reviewIntro:
    "Discover what our learners have to say about their experience with 'Build Digital Assets: A Comprehensive Guide.' Read reviews and ratings from individuals who have embarked on the transformative journey of mastering digital asset creation.",
  reviews: [
    {
      avatar: courseDetailAsset(
        "efb6f62056dfdd8faea9ed52a81fbdcd844baa28",
        "PurePearl Studio reviewer portrait",
      ),
      body: '"The course provided me with a comprehensive understanding of digital asset creation. The lessons were in-depth, practical, and immediately applicable to my work. Highly recommended!"',
      dateLabel: "a year ago",
      id: "review-purepearl",
      name: "PurePearl Studio",
      rating: 5,
      role: "UI/UX Designer",
    },
    {
      avatar: courseDetailAsset(
        "13d1f8e83dbc0f34bfd2aed999007fa6b98dad04",
        "Albert Flores reviewer portrait",
      ),
      body: "This course transformed my approach to digital design. The combination of theory, hands-on exercises, and real-world applications made it a truly enriching experience. Excited to implement what I've learned!",
      dateLabel: "a year ago",
      id: "review-albert",
      name: "Albert Flores",
      rating: 5,
      role: "UI/UX Designer",
    },
    {
      avatar: courseDetailAsset(
        "63c4be83222c85e6c852819bc5d4b24a87a87fb6",
        "Cody Fisher reviewer portrait",
        "/assets/home/63c4be83222c85e6c852819bc5d4b24a87a87fb6.webp",
      ),
      body: "The project showcase and critique module created a collaborative environment where I could showcase my work, receive valuable feedback, and refine my skills. It added a unique and valuable dimension to the learning process.",
      dateLabel: "a year ago",
      id: "review-cody",
      name: "Cody Fisher",
      rating: 5,
      role: "UI/UX Designer",
    },
    {
      avatar: courseDetailAsset(
        "9ef8cb329b949267cc8214b6727067c4a13af4b4",
        "Brooklyn Simmons reviewer portrait",
        "/assets/avatars/9ef8cb329b949267cc8214b6727067c4a13af4b4.webp",
      ),
      body: "The lessons on optimizing digital assets for various platforms were particularly insightful. The course adapts to the evolving digital landscape, and the engaging content kept me motivated throughout.",
      dateLabel: "a year ago",
      id: "review-brooklyn",
      name: "Brooklyn Simmons",
      rating: 5,
      role: "UI/UX Designer",
    },
  ],
  sidebarLessons: [
    { duration: "12 mins", number: "01", title: "Introduction to Digital Assets" },
    { duration: "21 mins", number: "02", title: "Design Principles for Impacts" },
    { duration: "16 mins", number: "03", title: "Advanced Techniques in Digital Creation" },
  ],
  sidebarRemainingLabel: "99 more videos",
  subtitle: "Unlock the Power of Digital Creation with Expert Guidance",
  title: "Build Digital Asset: A Comprehensive Guide",
  totalDurationLabel: "24 hours",
  totalLessons: 112,
};

export const courseDetails: readonly CourseDetail[] = [buildDigitalAssetDetail];

export function getCourseDetailBySlug(slug: string): CourseDetail | undefined {
  return courseDetails.find((detail) => detail.courseSlug === slug);
}
