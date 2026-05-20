"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { formatPrice, getPrimaryVariant, type ShopifyProduct } from "@/lib/shopify";

export function SearchAutocomplete({
  products,
  defaultQuery = "",
}: {
  products: ShopifyProduct[];
  defaultQuery?: string;
}) {
  const [query, setQuery] = useState(defaultQuery);
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.product_type?.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      )
      .slice(0, 6);
  }, [query, products]);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        placeholder="Search our collection..."
        className="w-full px-0 py-2 bg-transparent border-0 border-b border-charcoal/20 text-charcoal placeholder:text-muted focus:outline-none focus:border-gold text-sm tracking-wide"
        aria-autocomplete="list"
        aria-expanded={open && results.length > 0}
      />
      {open && results.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-2 bg-ivory border border-linen shadow-card z-50 max-h-80 overflow-y-auto">
          {results.map((p) => {
            const v = getPrimaryVariant(p);
            const img = p.images[0];
            return (
              <li key={p.id}>
                <Link
                  href={`/products/${p.handle}`}
                  className="flex gap-3 p-3 hover:bg-ivory-deep transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {img && (
                    <div className="relative w-12 h-14 shrink-0 bg-ivory-deep overflow-hidden">
                      <Image src={img.src} alt="" fill className="object-cover" sizes="48px" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm text-charcoal line-clamp-1">{p.title}</p>
                    <p className="text-xs text-muted mt-0.5">{formatPrice(v.price)}</p>
                  </div>
                </Link>
              </li>
            );
          })}
          <li className="border-t border-linen">
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              className="block p-3 text-center text-[11px] uppercase tracking-[0.2em] text-gold"
              onClick={() => setOpen(false)}
            >
              View all results
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
