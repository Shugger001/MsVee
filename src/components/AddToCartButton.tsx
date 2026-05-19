"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { ShopifyProduct } from "@/lib/shopify";
import { getPrimaryVariant } from "@/lib/shopify";

export function AddToCartButton({ product }: { product: ShopifyProduct }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const variant = getPrimaryVariant(product);
  const image = product.images[0]?.src ?? "";

  if (!variant.available) {
    return (
      <button
        type="button"
        disabled
        className="w-full py-4 bg-espresso-light/30 text-espresso-light cursor-not-allowed uppercase tracking-widest text-sm"
      >
        Sold out
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        addItem({
          variantId: variant.id,
          productId: product.id,
          title: product.title,
          handle: product.handle,
          image,
          price: parseFloat(variant.price),
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      }}
      className="w-full py-4 bg-plum hover:bg-plum-light text-cream uppercase tracking-widest text-sm transition-colors"
    >
      {added ? "Added to cart ✓" : "Add to cart"}
    </button>
  );
}
