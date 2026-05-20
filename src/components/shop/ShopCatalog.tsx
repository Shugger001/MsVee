"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import {
  getPrimaryVariant,
  getProductPrice,
  isInStock,
  type ShopifyProduct,
} from "@/lib/shopify";

const PER_PAGE = 24;

type SortKey =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "newest";

export function ShopCatalog({
  products,
  productTypes,
}: {
  products: ShopifyProduct[];
  productTypes: string[];
}) {
  const [sort, setSort] = useState<SortKey>("featured");
  const [typeFilter, setTypeFilter] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = [...products];

    if (typeFilter) {
      list = list.filter((p) => p.product_type === typeFilter);
    }
    if (inStockOnly) {
      list = list.filter(isInStock);
    }
    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!Number.isNaN(max)) {
        list = list.filter((p) => getProductPrice(p) <= max);
      }
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => getProductPrice(a) - getProductPrice(b));
        break;
      case "price-desc":
        list.sort((a, b) => getProductPrice(b) - getProductPrice(a));
        break;
      case "name-asc":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        list.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "newest":
        list.sort((a, b) => {
          const da = new Date(a.published_at ?? a.created_at ?? 0).getTime();
          const db = new Date(b.published_at ?? b.created_at ?? 0).getTime();
          return db - da;
        });
        break;
      default:
        break;
    }

    return list;
  }, [products, sort, typeFilter, inStockOnly, maxPrice]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  const resetFilters = () => {
    setTypeFilter("");
    setInStockOnly(false);
    setMaxPrice("");
    setSort("featured");
    setPage(1);
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b border-linen">
        <p className="text-warm text-sm">
          Showing {paginated.length} of {filtered.length} products
          {filtered.length !== products.length && ` (${products.length} total)`}
        </p>
        <div className="flex flex-wrap gap-4 items-end">
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted">Category</span>
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2 bg-ivory border border-linen text-sm text-charcoal min-w-[140px]"
            >
              <option value="">All</option>
              {productTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted">Max price</span>
            <input
              type="number"
              min="0"
              step="1"
              placeholder="$"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2 bg-ivory border border-linen text-sm w-24"
            />
          </label>
          <label className="flex items-center gap-2 pb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => {
                setInStockOnly(e.target.checked);
                setPage(1);
              }}
              className="accent-gold"
            />
            <span className="text-[11px] uppercase tracking-[0.18em] text-charcoal-soft">
              In stock
            </span>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted">Sort</span>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as SortKey);
                setPage(1);
              }}
              className="px-3 py-2 bg-ivory border border-linen text-sm text-charcoal min-w-[160px]"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name-asc">Name: A–Z</option>
              <option value="name-desc">Name: Z–A</option>
            </select>
          </label>
          {(typeFilter || inStockOnly || maxPrice || sort !== "featured") && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[11px] uppercase tracking-[0.2em] text-gold pb-2 link-underline"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {paginated.length === 0 ? (
        <p className="text-center text-warm py-16">No products match your filters.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16">
          {paginated.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-14">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border border-linen text-sm disabled:opacity-40 hover:border-gold"
          >
            Previous
          </button>
          <span className="text-sm text-muted tabular-nums">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border border-linen text-sm disabled:opacity-40 hover:border-gold"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
