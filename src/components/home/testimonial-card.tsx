import Image from "next/image";

export type TestimonialCardProps = {
  author: string;
  avatar: string;
  quote: string;
  role: string;
};

export function TestimonialCard({ author, avatar, quote, role }: TestimonialCardProps) {
  return (
    <article className="bs-home-testimonial">
      <Image alt="" className="bs-home-testimonial__avatar" height={80} src={avatar} width={80} />
      <blockquote>
        <p>{quote}</p>
      </blockquote>
      <footer>
        <strong>{author}</strong>
        <span>{role}</span>
      </footer>
    </article>
  );
}
