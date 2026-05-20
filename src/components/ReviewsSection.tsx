"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { REVIEW_SUMMARY, REVIEWS } from "@/data/site";

function Stars({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-0.5 text-gold" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? "opacity-100" : "opacity-25"}>
          ★
        </span>
      ))}
    </span>
  );
}

export function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollTo = (i: number) => {
    const next = (i + REVIEWS.length) % REVIEWS.length;
    setIndex(next);
    const el = scrollRef.current;
    if (!el) return;
    const child = el.children[next] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section className="py-16 md:py-24 bg-peach/50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal font-medium mb-4">
            What Our Customers Are Saying
          </h2>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Stars count={5} />
            <span className="font-display text-2xl text-charcoal">
              {REVIEW_SUMMARY.average}
            </span>
            <span className="text-muted text-sm">
              ({REVIEW_SUMMARY.count}+ reviews)
            </span>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {REVIEWS.map((review) => (
            <blockquote
              key={review.quote}
              className="flex-none w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[32vw] max-w-lg snap-center bg-ivory p-8 md:p-10 shadow-soft"
            >
              <Stars count={review.rating} />
              <p className="font-display text-lg md:text-xl text-charcoal italic leading-relaxed mt-4">
                &ldquo;{review.quote}&rdquo;
              </p>
              <footer className="mt-6 text-[11px] uppercase tracking-[0.22em] text-muted">
                — {review.author}
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === i ? "bg-gold" : "bg-linen"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>

        <p className="text-center mt-8">
          <Link
            href="/testimonials"
            className="link-underline text-[11px] uppercase tracking-[0.22em] text-charcoal-soft hover:text-gold"
          >
            Read all testimonials
          </Link>
        </p>
      </Container>
    </section>
  );
}
