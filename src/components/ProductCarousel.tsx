"use client";

import { useRef } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Container } from "@/components/ui/Container";
import type { ShopifyProduct } from "@/lib/shopify";

export function ProductCarousel({
  title,
  viewAllHref,
  products,
}: {
  title: string;
  viewAllHref: string;
  products: ShopifyProduct[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (!products.length) return null;

  return (
    <section className="py-16 md:py-24 bg-ivory overflow-hidden">
      <Container>
        <div className="flex items-end justify-between gap-4 mb-10">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal font-medium">{title}</h2>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={viewAllHref}
              className="hidden sm:inline link-underline text-[11px] uppercase tracking-[0.22em] text-charcoal-soft hover:text-gold mr-4"
            >
              View all
            </Link>
            <button
              type="button"
              onClick={() => scroll("left")}
              className="w-10 h-10 border border-linen flex items-center justify-center text-charcoal hover:border-gold hover:text-gold transition-colors"
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="w-10 h-10 border border-linen flex items-center justify-center text-charcoal hover:border-gold hover:text-gold transition-colors"
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-1 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-none w-[42vw] sm:w-[28vw] md:w-[22vw] lg:w-[18vw] max-w-[280px] snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <Link
          href={viewAllHref}
          className="sm:hidden inline-block mt-8 link-underline text-[11px] uppercase tracking-[0.22em] text-charcoal-soft"
        >
          View all
        </Link>
      </Container>
    </section>
  );
}
