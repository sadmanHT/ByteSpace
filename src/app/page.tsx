import Image from "next/image";
import Link from "next/link";

import { CourseCard } from "@/components/course/course-card";
import { HomeCategoryTabs } from "@/components/home/home-category-tabs";
import { HomeHero } from "@/components/home/home-hero";
import { LearningPathCard } from "@/components/home/learning-path-card";
import { TestimonialCard } from "@/components/home/testimonial-card";
import { SiteFooter } from "@/components/layout/site-footer";
import { courses } from "@/data/courses";

const learningPaths = [
  ["Design", "/courses?category=design"],
  ["Development", "/courses?category=development"],
  ["IT & Software", "/courses?category=it"],
  ["Business", "/courses?category=business"],
  ["Marketing", "/courses?category=marketing"],
  ["Photography", "/courses?category=photography"],
] as const;

const testimonials = [
  {
    author: "Sarah M.",
    role: "Enthusiastic Learner",
    avatar: "/assets/avatars/0577f0e9b7fca2f32639871454da0de95f951709.webp",
    quote:
      "ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning.",
  },
  {
    author: "James L.",
    role: "Lifelong Learner",
    avatar: "/assets/home/63c4be83222c85e6c852819bc5d4b24a87a87fb6.webp",
    quote:
      "I've tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development.",
  },
  {
    author: "Alex B.",
    role: "Inspired Creator",
    avatar: "/assets/home/728c3b1d33fe647a46f9bf668322f8c1d94ed937.webp",
    quote:
      "As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It's fulfilling to see my courses making a positive impact on learners globally.",
  },
] as const;

export default function Home() {
  return (
    <main data-testid="home-page">
      <HomeHero />

      <section aria-label="ByteSpace partners" className="bs-home-partners">
        <div className="bs-home-partners__inner" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => (
            <span className="bs-home-partner-mark" key={index}>
              <i />
              <b />
              <em />
            </span>
          ))}
        </div>
      </section>

      <section className="bs-home-discovery" data-testid="home-discovery">
        <header className="bs-home-section-intro bs-home-section-intro--discovery">
          <h2>Discover Your Passion, Build Your Skills</h2>
          <p>
            At Bytespace Courses, we bring you closer to life-changing knowledge. Explore a variety
            of courses across different fields, from technology to the arts, and make a difference
            in your career and life.
          </p>
        </header>

        <HomeCategoryTabs />

        <div className="bs-home-course-grid" data-testid="home-course-grid">
          {courses.map((course) => (
            <CourseCard course={course} key={course.id} levelTone="success" overflowTone="dark" />
          ))}
        </div>

        <header className="bs-home-section-intro bs-home-section-intro--paths">
          <h2>Explore Diverse Learning Paths at Bytespace</h2>
          <p>
            At Bytespace, we believe in empowering individuals through knowledge. Our diverse range
            of courses spans various fields, ensuring there&apos;s something for everyone. Unleash
            your potential and explore our carefully curated categories.
          </p>
        </header>

        <div className="bs-home-path-grid">
          {learningPaths.map(([label, href]) => (
            <LearningPathCard href={href} key={label} label={label} />
          ))}
        </div>
      </section>

      <section className="bs-home-growth" data-testid="home-editorial">
        <div className="bs-home-growth__inner">
          <article className="bs-home-editorial bs-home-editorial--growth">
            <div className="bs-home-editorial__copy">
              <h2>Your Path to Professional Growth Starts Here!</h2>
              <p>
                Explore our curated selection of courses tailored to enhance your capabilities and
                accelerate your career journey. Whether you are looking to sharpen specific skills,
                gain industry expertise, or embark on a new career path entirely, we have the
                resources you need.
              </p>
              <dl className="bs-home-stats">
                <div>
                  <dt>Students</dt>
                  <dd>12K</dd>
                </div>
                <div>
                  <dt>Courses</dt>
                  <dd>70+</dd>
                </div>
                <div>
                  <dt>Creators</dt>
                  <dd>16</dd>
                </div>
              </dl>
            </div>

            <div className="bs-home-editorial__visual bs-home-editorial__visual--course">
              <Image
                alt=""
                className="bs-home-editorial__person bs-home-editorial__person--learner"
                height={541}
                src="/assets/home/29a52a24e51266edcd7d57d73392ee5fc4833220.webp"
                width={578}
              />
              <div className="bs-home-editorial__course-card">
                <CourseCard course={courses[0]} levelTone="success" overflowTone="dark" />
              </div>
              <div
                aria-hidden="true"
                className="bs-home-decorative-orb bs-home-decorative-orb--yellow"
              />
              <div className="bs-home-mini-progress">
                <span>Learning Progress</span>
                <strong>55%</strong>
                <div>
                  <i />
                </div>
              </div>
            </div>
          </article>

          <article className="bs-home-editorial bs-home-editorial--creator">
            <div className="bs-home-editorial__visual bs-home-editorial__visual--creator">
              <Image
                alt="Course creator wearing a headset and holding a tablet"
                className="bs-home-editorial__person bs-home-editorial__person--creator"
                height={596}
                src="/assets/home/0d6596fb1df66aaf843ee85722f439fada233946.webp"
                width={500}
              />
              <div className="bs-home-revenue-card">
                <span>Total Revenue</span>
                <strong>$12,450</strong>
                <small>+18.2%</small>
              </div>
              <div className="bs-home-year-card">
                <span>Year to Date</span>
                <strong>2023</strong>
              </div>
              <div
                aria-hidden="true"
                className="bs-home-decorative-orb bs-home-decorative-orb--purple"
              />
            </div>

            <div className="bs-home-editorial__copy">
              <h2>Create &amp; Manage Courses Easily.</h2>
              <p>
                ByteSpace supports individuals or entities in the creation, publication, and
                administration of educational courses.
              </p>
              <ul className="bs-home-benefits">
                <li>Share Your Expertise</li>
                <li>Monetize Your Passion</li>
                <li>Flexibility and Autonomy</li>
                <li>Build a Community</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section className="bs-home-creator-cta" data-testid="home-creator-cta">
        <div
          aria-hidden="true"
          className="bs-home-creator-cta__shape bs-home-creator-cta__shape--one"
        />
        <div
          aria-hidden="true"
          className="bs-home-creator-cta__shape bs-home-creator-cta__shape--two"
        />
        <div className="bs-home-creator-cta__content">
          <h2>Unlock Your Potential as a Creator with ByteSpace</h2>
          <p>
            Experience the collaboration of numerous creators and an expanding selection of courses.
            Register now and become a part of a community comprising over 10,000 local and
            international creators. Utilize our Course Editor, and showcase your expertise by
            publishing your finest course on the ByteSpace Course Library.
          </p>
          <Link className="bs-home-creator-cta__button" href="/creators">
            Join as Creator
          </Link>
        </div>
      </section>

      <section className="bs-home-testimonials" data-testid="home-testimonials">
        <div className="bs-home-testimonials__inner">
          <header className="bs-home-testimonials__intro">
            <h2>Discover What Our Community Is Saying</h2>
            <p>
              At ByteSpace, our vibrant community of learners and creators is at the heart of what
              we do. Hear directly from those who have experienced the transformative journey of
              learning and creating on our platform. Explore testimonials that reflect the diverse
              perspectives of enthusiastic learners and accomplished creators.
            </p>
          </header>
          <div className="bs-home-testimonials__grid">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.author} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
