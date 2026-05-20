import { ProductCard } from "@/components/ProductCard";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { getCollectionProducts } from "@/lib/shopify";

export default async function NotFound() {
  const bestSellers = (await getCollectionProducts("best-seller"))?.products.slice(0, 4) ?? [];

  return (
    <Container className="py-16 md:py-24">
      <div className="text-center max-w-lg mx-auto mb-16">
        <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-4">404</p>
        <h1 className="font-display text-5xl text-charcoal mb-4">Page not found</h1>
        <p className="text-warm mb-10">The page you are looking for does not exist or has moved.</p>
        <ButtonLink href="/" variant="primary">
          Return home
        </ButtonLink>
      </div>
      {bestSellers.length > 0 && (
        <>
          <h2 className="font-display text-2xl text-charcoal text-center mb-10">You might like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </Container>
  );
}
