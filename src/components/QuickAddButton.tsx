"use client";

import type { ShopifyProduct } from "@/lib/shopify";
import { getPrimaryVariant } from "@/lib/shopify";
import { useCart } from "@/lib/cart";

export function QuickAddButton({ product }: { product: ShopifyProduct }) {
  const { addItem } = useCart();
  const variant = getPrimaryVariant(product);
  const image = product.images[0]?.src ?? "";

  if (!variant.available) return null;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
          variantId: variant.id,
          productId: product.id,
          title: product.title,
          handle: product.handle,
          image,
          price: parseFloat(variant.price),
        });
      }}
      className="absolute bottom-4 left-4 right-4 py-2.5 bg-ivory/95 text-charcoal text-[10px] uppercase tracking-[0.22em] font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-gold hover:text-charcoal shadow-soft z-10"
    >
      Quick add
    </button>
  );
}
