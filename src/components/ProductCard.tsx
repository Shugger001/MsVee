import Image from "next/image";
import Link from "next/link";
import { QuickAddButton } from "@/components/QuickAddButton";
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
      <div className="relative">
        <Link href={`/products/${product.handle}`} className="block">
          <div className="relative aspect-[3/4] bg-ivory-deep overflow-hidden mb-5 shadow-soft group-hover:shadow-card transition-shadow duration-500">
            {image ? (
              <Image
                src={image.src}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted text-sm">
                No image
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            {onSale && !soldOut && (
              <span className="absolute top-4 left-4 bg-gold text-charcoal text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 font-medium">
                Sale
              </span>
            )}
            {soldOut && (
              <span className="absolute top-4 left-4 bg-charcoal/90 text-ivory text-[10px] uppercase tracking-[0.2em] px-3 py-1.5">
                Sold out
              </span>
            )}
          </div>
        </Link>
        <QuickAddButton product={product} />
      </div>
      <Link href={`/products/${product.handle}`} className="block">
        <p className="text-[10px] uppercase tracking-[0.24em] text-muted mb-1.5">
          {product.product_type || "Handcrafted"}
        </p>
        <h3 className="font-display text-lg md:text-xl text-charcoal group-hover:text-gold transition-colors duration-300 leading-snug line-clamp-2">
          {product.title}
        </h3>
        <div className="mt-2.5 flex items-baseline gap-2.5">
          <span className="text-charcoal font-medium tracking-wide">
            {formatPrice(variant.price)}
          </span>
          {onSale && variant.compare_at_price && (
            <span className="text-muted/70 line-through text-sm">
              {formatPrice(variant.compare_at_price)}
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}
