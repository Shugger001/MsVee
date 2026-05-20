"use client";

import Image from "next/image";
import { useState } from "react";
import type { ShopifyImage } from "@/lib/shopify";

export function ProductGallery({
  images,
  title,
}: {
  images: ShopifyImage[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  if (!main) {
    return <div className="aspect-[4/5] bg-ivory-deep" />;
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] bg-ivory-deep overflow-hidden shadow-card">
        <Image
          key={main.src}
          src={main.src}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {images.slice(0, 6).map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden border-2 transition-colors ${
                active === i ? "border-gold" : "border-transparent hover:border-linen"
              }`}
            >
              <Image src={img.src} alt={`${title} ${i + 1}`} fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
