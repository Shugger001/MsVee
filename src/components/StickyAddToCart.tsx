"use client";

import { useEffect, useState } from "react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatPrice, getPrimaryVariant, type ShopifyProduct } from "@/lib/shopify";

export function StickyAddToCart({ product }: { product: ShopifyProduct }) {
  const [visible, setVisible] = useState(false);
  const variant = getPrimaryVariant(product);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-ivory/95 backdrop-blur-md border-t border-linen px-4 py-3 shadow-elevated">
      <div className="flex items-center gap-4 max-w-lg mx-auto">
        <div className="flex-1 min-w-0">
          <p className="font-display text-sm text-charcoal truncate">{product.title}</p>
          <p className="text-gold font-medium text-sm">{formatPrice(variant.price)}</p>
        </div>
        <div className="w-36 shrink-0 [&_button]:py-3 [&_button]:text-[10px]">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
