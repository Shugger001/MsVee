import Image from "next/image";
import Link from "next/link";
import type { ShopifyCollection } from "@/lib/shopify";

export function CategoryCard({
  collection,
}: {
  collection: Pick<ShopifyCollection, "title" | "handle" | "image">;
}) {
  return (
    <Link
      href={`/collections/${collection.handle}`}
      className="group relative block aspect-[4/5] overflow-hidden bg-ivory-deep shadow-soft hover:shadow-card transition-all duration-500"
    >
      {collection.image ? (
        <Image
          src={collection.image.src}
          alt={collection.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-accent/15 to-charcoal/10" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/15 to-charcoal/5" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
        <span className="block text-[10px] uppercase tracking-[0.3em] text-gold mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Explore
        </span>
        <span className="font-display text-xl md:text-2xl text-ivory font-medium">
          {collection.title}
        </span>
      </div>
    </Link>
  );
}
