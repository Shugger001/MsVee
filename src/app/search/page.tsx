import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Container } from "@/components/ui/Container";
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
    <Container className="py-12 md:py-20">
      <SectionHeading title={query ? `Results for “${q}”` : "Search"} />
      {!query && (
        <p className="text-warm -mt-8 mb-8">Enter a search term to explore our collection.</p>
      )}
      {query && products.length === 0 && (
        <p className="text-warm -mt-8">No products found. Try another search.</p>
      )}
      {products.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </Container>
  );
}
