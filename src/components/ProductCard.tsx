import Image from "next/image";
import Link from "next/link";
import {
  formatPrice,
  getPrimaryVariant,
  isOnSale,
  type ShopifyProduct,
} from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const variant = getPrimaryVariant(product);
  const image = product.images[0];
  const onSale = isOnSale(product);
  const soldOut = !variant.available;

  return (
    <article className="group">
      <Link href={`/products/${product.handle}`} className="block">
        <div className="relative aspect-[4/5] bg-cream-dark overflow-hidden mb-4">
          {image ? (
            <Image
              src={image.src}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-espresso-light/40 text-sm">
              No image
            </div>
          )}
          {soldOut && (
            <span className="absolute top-3 left-3 bg-espresso text-cream text-xs uppercase tracking-wider px-2 py-1">
              Sold out
            </span>
          )}
        </div>
        <h3 className="font-display text-lg md:text-xl text-espresso group-hover:text-plum transition-colors leading-snug">
          {product.title}
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-espresso font-medium">
            {formatPrice(variant.price)}
          </span>
          {onSale && variant.compare_at_price && (
            <span className="text-espresso-light/60 line-through text-sm">
              {formatPrice(variant.compare_at_price)}
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}
