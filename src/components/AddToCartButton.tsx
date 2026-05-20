"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { ShopifyProduct } from "@/lib/shopify";
import { getPrimaryVariant } from "@/lib/shopify";
import { Button } from "@/components/ui/Button";

export function AddToCartButton({ product }: { product: ShopifyProduct }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const variant = getPrimaryVariant(product);
  const image = product.images[0]?.src ?? "";

  if (!variant.available) {
    return (
      <Button variant="secondary" className="w-full cursor-not-allowed opacity-50" disabled>
        Sold out
      </Button>
    );
  }

  return (
    <Button
      variant="primary"
      size="lg"
      className="w-full"
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
        setTimeout(() => setAdded(false), 2500);
      }}
    >
      {added ? "Added to bag ✓" : "Add to bag"}
    </Button>
  );
}
