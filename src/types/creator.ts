export type CreatorProfileData = Readonly<{
  id: string;
  slug: string;
  displayName: string;
  avatar: Readonly<{
    alt: string;
    figmaHash: string;
    src: string;
  }>;
  role: string;
  bio: string;
  productCount: number;
  followerCount: number;
  courseSlugs: readonly string[];
}>;
