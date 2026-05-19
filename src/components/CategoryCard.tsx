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
      className="group relative block aspect-[3/4] overflow-hidden bg-cream-dark"
    >
      {collection.image ? (
        <Image
          src={collection.image.src}
          alt={collection.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-plum/20 to-espresso/20" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/20 to-transparent" />
      <span className="absolute bottom-4 left-4 right-4 font-display text-xl md:text-2xl text-cream text-center">
        {collection.title}
      </span>
    </Link>
  );
}
