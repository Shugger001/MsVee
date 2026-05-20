"use client";

import { ProductCard } from "@/components/ProductCard";
import { SearchAutocomplete } from "@/components/SearchAutocomplete";
import { SectionHeading } from "@/components/SectionHeading";
import type { ShopifyProduct } from "@/lib/shopify";

export function SearchPageClient({
  products,
  initialQuery,
}: {
  products: ShopifyProduct[];
  initialQuery: string;
}) {
  const query = initialQuery.trim().toLowerCase();

  const results = query
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query)) ||
          p.product_type?.toLowerCase().includes(query),
      )
    : [];

  return (
    <>
      <div className="mb-12">
        <SearchAutocomplete products={products} defaultQuery={initialQuery} />
      </div>
      <SectionHeading title={query ? `Results for “${initialQuery}”` : "Search"} />
      {!query && (
        <p className="text-warm -mt-8 mb-8">Type at least 2 characters in the search box above.</p>
      )}
      {query && results.length === 0 && (
        <p className="text-warm -mt-8">No products found. Try another search.</p>
      )}
      {results.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
