import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getAllProducts } from "@/lib/shopify";

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const all = await getAllProducts();

  const products = query
    ? all.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query)) ||
          p.product_type.toLowerCase().includes(query),
      )
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <SectionHeading title={query ? `Results for "${q}"` : "Search"} />
      {!query && (
        <p className="text-espresso-light mb-8">Enter a search term to find products.</p>
      )}
      {query && products.length === 0 && (
        <p className="text-espresso-light">No products found. Try a different search.</p>
      )}
      {products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
