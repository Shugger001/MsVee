import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

const STORIES = [
  {
    title: "Our Story",
    description: "Faith, family, and handcrafted care behind every bar.",
    href: "/about",
  },
  {
    title: "Ingredients",
    description: "What goes into our natural bath and body products.",
    href: "/ingredients",
  },
  {
    title: "Use & Care",
    description: "Make your handmade soap last longer.",
    href: "/use-and-care",
  },
  {
    title: "Customer Love",
    description: "Read what our community is saying.",
    href: "/testimonials",
  },
];

export const metadata = {
  title: "Journal",
  description: "Tips, stories, and skincare wisdom from MV Luscious Lather.",
};

export default function BlogPage() {
  return (
    <Container className="py-16 md:py-24">
      <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-4">Journal</p>
      <h1 className="font-display text-4xl md:text-5xl text-charcoal font-medium mb-4">
        Stories & tips
      </h1>
      <p className="text-warm max-w-xl mb-14 leading-relaxed">
        Skincare wisdom, ingredient spotlights, and behind-the-scenes from our kitchen. Follow{" "}
        <a href={siteConfig.instagramUrl} className="text-gold hover:underline">
          @{siteConfig.instagramHandle}
        </a>{" "}
        for the latest.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {STORIES.map((story) => (
          <Link
            key={story.href}
            href={story.href}
            className="block p-8 bg-ivory-deep/60 border border-linen hover:border-gold/40 transition-colors group"
          >
            <h2 className="font-display text-2xl text-charcoal group-hover:text-gold transition-colors">
              {story.title}
            </h2>
            <p className="mt-3 text-warm text-sm leading-relaxed">{story.description}</p>
            <span className="inline-block mt-4 text-[11px] uppercase tracking-[0.22em] text-gold">
              Read more →
            </span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
