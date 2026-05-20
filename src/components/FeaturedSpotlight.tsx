import Image from "next/image";
import Link from "next/link";
import type { ShopifyProduct } from "@/lib/shopify";
import { stripHtml } from "@/lib/shopify";

export function FeaturedSpotlight({ product }: { product: ShopifyProduct }) {
  const image = product.images[0];
  const excerpt = stripHtml(product.body_html).slice(0, 180);

  return (
    <section className="bg-ivory">
      {image && (
        <div className="relative w-full aspect-[4/3] md:aspect-[21/9] max-h-[70vh] overflow-hidden">
          <Image
            src={image.src}
            alt={product.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="bg-peach py-14 md:py-20 px-6 text-center max-w-3xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.32em] text-charcoal-soft mb-4">
          New arrival
        </p>
        <h1 className="font-display text-2xl md:text-3xl lg:text-4xl text-charcoal font-medium leading-snug text-balance">
          {product.title}
        </h1>
        <p className="mt-5 text-warm leading-relaxed text-base md:text-lg">
          {excerpt}
          {excerpt.length >= 180 ? "…" : ""}
        </p>
        <Link
          href={`/products/${product.handle}`}
          className="inline-block mt-8 px-12 py-4 bg-charcoal text-ivory font-display text-lg tracking-wide hover:bg-charcoal-soft transition-colors"
        >
          Shop now
        </Link>
      </div>
    </section>
  );
}
