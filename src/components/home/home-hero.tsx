import Image from "next/image";

import { SiteHeader } from "@/components/layout/site-header";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { MaterialIcon } from "@/components/ui/material-icon";

const heroLearners = [
  { alt: "", src: "/assets/avatars/b44979e1c98ecb3ec92ac86805fe55581fbeaa60.webp" },
  { alt: "", src: "/assets/avatars/3fe559181733e0fb69226caee836e40092facb44.webp" },
  { alt: "", src: "/assets/avatars/0577f0e9b7fca2f32639871454da0de95f951709.webp" },
  { alt: "", src: "/assets/avatars/d0cd3adb501c64c1b4cf766de6abb9fe8925fb5f.webp" },
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
        <div className="bs-home-floating-card__title-row">
          <span>Learning Progress</span>
          <strong>55%</strong>
        </div>
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
        <p>Keep going — you&apos;re making great progress.</p>
      </aside>

      <aside className="bs-home-students-card" aria-label="Happy students">
        <div>
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
