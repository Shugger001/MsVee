import Image from "next/image";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  getCollectionProducts,
  getCollections,
  getProduct,
  HERO_IMAGE,
  INGREDIENTS_IMAGE,
  SKIN_CONCERNS,
  type ShopifyProduct,
} from "@/lib/shopify";

const NEW_PRODUCT_HANDLES = [
  "eucalyptus-rosemary",
  "patchouli-eucalyptus-soap",
  "bonfire-oatmeal-soap",
  "lavender-wintergreen-soap",
  "orange-vanilla-tallow-soap",
  "lavender-magnesium",
];

export default async function HomePage() {
  const [bestSellerData, collections, newProductsData] = await Promise.all([
    getCollectionProducts("best-seller"),
    getCollections(),
    Promise.all(NEW_PRODUCT_HANDLES.map((h) => getProduct(h))),
  ]);

  const bestSellers = bestSellerData?.products.slice(0, 8) ?? [];
  const newProducts = newProductsData.filter((p): p is ShopifyProduct => p !== null);

  const skinConcernCollections = collections.filter((c) =>
    SKIN_CONCERNS.some((s) => s.handle === c.handle),
  );

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-end grain overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Handcrafted artisan soaps"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/20" />
        <Container className="relative z-10 pb-16 md:pb-24 pt-32 w-full">
          <p className="text-[11px] uppercase tracking-[0.38em] text-gold mb-6 font-medium">
            Handcrafted · Natural · Family-made
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ivory font-medium leading-[1.1] max-w-3xl text-balance">
            Bath & body, crafted with purity and purpose
          </h1>
          <p className="mt-6 text-ivory/75 text-base md:text-lg max-w-xl leading-relaxed">
            100% natural ingredients. No harsh preservatives. A wholesome alternative to
            conventional synthetic soaps.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/shop" variant="gold" size="lg">
              Shop collection
            </ButtonLink>
            <ButtonLink href="/about" variant="ghost" size="lg">
              Our story
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Brand story */}
      <section className="py-20 md:py-32 bg-ivory">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-4">About us</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] text-charcoal font-medium leading-tight text-balance">
                Rooted in faith, family, and local craftsmanship
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6 text-warm leading-relaxed text-base md:text-lg">
              <p>
                MV Luscious Lather is a natural, handcrafted bath and body company committed to
                purity and purpose. Each product is thoughtfully made using ingredients free from
                harsh preservatives and detergents.
              </p>
              <p>
                We employ the cold-process method, curing every bar 4–6 weeks in small batches —
                approximately 5–6 oz of care in every piece.
              </p>
              <ButtonLink href="/about" variant="secondary" className="mt-2">
                Read our story
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Ingredients banner */}
      <section className="relative h-[50vh] md:h-[60vh] grain overflow-hidden">
        <Image
          src={INGREDIENTS_IMAGE}
          alt="Fine natural ingredients"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <p className="text-[11px] uppercase tracking-[0.38em] text-gold mb-4">Philosophy</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ivory font-medium italic">
              Made with the finest ingredients
            </h2>
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section className="py-20 md:py-28 bg-ivory">
        <Container>
          <SectionHeading
            title="Best Sellers"
            subtitle="Customer favorites — handcrafted soaps and body care"
            viewAllHref="/collections/best-seller"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* Skin concern */}
      <section className="py-20 md:py-28 bg-ivory-deep/60">
        <Container>
          <SectionHeading
            title="Shop by Skin Concern"
            subtitle="Curated collections for every need"
            align="center"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {skinConcernCollections.map((collection) => (
              <CategoryCard key={collection.id} collection={collection} />
            ))}
          </div>
        </Container>
      </section>

      {/* New products */}
      {newProducts.length > 0 && (
        <section className="py-20 md:py-28 bg-ivory">
          <Container>
            <SectionHeading title="New Arrivals" viewAllHref="/shop" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-6">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Instagram CTA */}
      <section className="relative py-24 md:py-32 bg-charcoal grain overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_70%)]" />
        <Container className="relative text-center">
          <p className="text-[11px] uppercase tracking-[0.38em] text-gold mb-4">Follow along</p>
          <h2 className="font-display text-3xl md:text-5xl text-ivory font-medium mb-6">
            @mvlusciouslather
          </h2>
          <p className="text-ivory/60 max-w-md mx-auto mb-10 text-sm leading-relaxed">
            Behind-the-batch moments, new releases, and skincare tips from our kitchen to yours.
          </p>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 border border-ivory/30 text-ivory text-[11px] uppercase tracking-[0.28em] hover:bg-ivory/10 transition-colors"
          >
            View on Instagram
          </a>
        </Container>
      </section>
    </>
  );
}
