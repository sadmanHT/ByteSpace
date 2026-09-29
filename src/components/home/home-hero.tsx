import Image from "next/image";

import { SiteHeader } from "@/components/layout/site-header";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { MaterialIcon } from "@/components/ui/material-icon";

const heroLearners = [
  { alt: "", src: "/assets/avatars/9ef8cb329b949267cc8214b6727067c4a13af4b4.webp" },
  { alt: "", src: "/assets/avatars/b44979e1c98ecb3ec92ac86805fe55581fbeaa60.webp" },
  { alt: "", src: "/assets/avatars/83fb3e04056cc892636460bee5791aa3f243854c.webp" },
  { alt: "", src: "/assets/avatars/f3cf29a8fed39589ceb38423e65b26b8d6c93123.webp" },
  { alt: "", src: "/assets/avatars/5824acacb3b76175bc84084ec18597109498f96d.webp" },
  { alt: "", src: "/assets/avatars/7fdccc783264eedc4fb989984eecbc4058a219f2.webp" },
  { alt: "", src: "/assets/avatars/1e078348a54489bfd231d82fe1944770883c8d80.webp" },
] as const;

export function HomeHero() {
  return (
    <section className="bs-home-hero" data-testid="home-hero">
      <SiteHeader activeItem="home" />
      <div className="bs-home-hero__copy">
        <h1>Get Access to Hundreds Courses Available</h1>
        <p>
          Unlock your creativity, gain valuable knowledge, and grow your business with our wide
          range of courses.
        </p>
        <form action="/courses" className="bs-home-hero__search" method="get" role="search">
          <label className="sr-only" htmlFor="home-course-search">
            Search courses
          </label>
          <div className="bs-home-hero__search-field">
            <MaterialIcon height={24} name="search" width={24} />
            <input
              id="home-course-search"
              name="query"
              placeholder="Course, topic, creator"
              type="search"
            />
          </div>
          <button type="submit">Search</button>
        </form>
      </div>

      <div aria-hidden="true" className="bs-home-hero__orb bs-home-hero__orb--left" />
      <div aria-hidden="true" className="bs-home-hero__orb bs-home-hero__orb--right" />

      <Image
        alt="Smiling learner wearing a headset and holding a laptop"
        className="bs-home-hero__learner"
        height={541}
        priority
        src="/assets/home/29a52a24e51266edcd7d57d73392ee5fc4833220.webp"
        width={578}
      />

      <aside className="bs-home-progress-card" aria-label="Learning progress">
        <span className="bs-home-progress-card__label">Learning Progress</span>
        <strong className="bs-home-progress-card__value">55%</strong>
        <div
          aria-label="55 percent complete"
          className="bs-home-progress-card__track"
          role="progressbar"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={55}
        >
          <span />
        </div>
      </aside>

      <aside className="bs-home-students-card" aria-label="Happy students">
        <div className="bs-home-students-card__copy">
          <strong>Happy Students</strong>
          <span className="bs-home-students-card__rating">
            <MaterialIcon height={18} name="star" width={18} /> 4.5 (240)
          </span>
        </div>
        <AvatarStack avatars={heroLearners} overflowLabel="2K+" overflowTone="dark" />
      </aside>
    </section>
  );
}
