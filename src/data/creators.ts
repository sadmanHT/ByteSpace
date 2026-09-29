import type { CreatorProfileData } from "@/types/creator";

export const purepearlCreator: CreatorProfileData = {
  id: "purepearl-studio",
  slug: "purepearl-studio",
  displayName: "PurePearl Studio",
  avatar: {
    src: "/assets/avatars/b44979e1c98ecb3ec92ac86805fe55581fbeaa60.webp",
    alt: "PurePearl Studio creator avatar",
    figmaHash: "b44979e1c98ecb3ec92ac86805fe55581fbeaa60",
  },
  role: "Passionate UI/UX, Web designer",
  bio: "Welcome to the creative world of [Creator's Name]. Here, you'll discover the passion, expertise, and inspiration that drive my creative journey. Let's explore and learn together!\nive into my creative portfolio, showcasing a glimpse of my artistic endeavors. From digital designs to multimedia projects, each piece tells a unique story. Explore the world of creativity with me.",
  productCount: 3,
  followerCount: 12,
  courseSlugs: [
    "learn-figma-from-basic",
    "build-digital-asset",
    "the-power-of-big-data",
    "balancing-productivity-and-self-care",
    "mastering-money-management",
    "from-idea-to-startup-success",
  ],
};

export const creators: readonly CreatorProfileData[] = [purepearlCreator];

export function getCreatorBySlug(slug: string): CreatorProfileData | undefined {
  return creators.find((creator) => creator.slug === slug);
}
