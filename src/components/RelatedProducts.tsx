import { ProductCard } from "@/components/ProductCard";
import { Container } from "@/components/ui/Container";
import type { ShopifyProduct } from "@/lib/shopify";

export function RelatedProducts({ products }: { products: ShopifyProduct[] }) {
  if (!products.length) return null;

  return (
    <section className="py-16 md:py-24 bg-ivory-deep/40 border-t border-linen">
      <Container>
        <h2 className="font-display text-2xl md:text-3xl text-charcoal font-medium mb-10 text-center">
          You may also like
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
