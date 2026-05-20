import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { HERO_IMAGE, INGREDIENTS_IMAGE } from "@/lib/shopify";

const GRID_IMAGES = [
  HERO_IMAGE,
  INGREDIENTS_IMAGE,
  "https://cdn.shopify.com/s/files/1/0548/8020/7017/collections/2023-10-24-23-13-14-991.jpg?v=1746659352",
  "https://cdn.shopify.com/s/files/1/0548/8020/7017/collections/2025-04-27-16-16-45-310.jpg?v=1746659958",
  "https://cdn.shopify.com/s/files/1/0548/8020/7017/collections/2023-10-31-09-20-22-797.jpg?v=1746659272",
  "https://cdn.shopify.com/s/files/1/0548/8020/7017/collections/2025-02-25-01-56-34-261.jpg?v=1746659863",
];

export function InstagramSection() {
  return (
    <section className="py-16 md:py-24 bg-ivory border-t border-linen">
      <Container>
        <div className="text-center mb-10">
          <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-3">Behind the batch</p>
          <h2 className="font-display text-3xl md:text-4xl text-charcoal font-medium">
            @{siteConfig.instagramHandle}
          </h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {GRID_IMAGES.map((src, i) => (
            <a
              key={src + i}
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden group bg-ivory-deep"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 768px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors" />
            </a>
          ))}
        </div>
        <p className="text-center mt-10">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-3.5 border border-charcoal/20 text-charcoal text-[11px] uppercase tracking-[0.28em] hover:border-gold hover:text-gold transition-colors"
          >
            Follow on Instagram
          </a>
        </p>
      </Container>
    </section>
  );
}
