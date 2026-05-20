import { CategoryCard } from "@/components/CategoryCard";
import { FeaturedSpotlight } from "@/components/FeaturedSpotlight";
import { PhilosophyBanner } from "@/components/PhilosophyBanner";
import { ProductCarousel } from "@/components/ProductCarousel";
import { PromoBanner } from "@/components/PromoBanner";
import { ReviewsSection } from "@/components/ReviewsSection";
import { SectionHeading } from "@/components/SectionHeading";
import { ValueAccordion } from "@/components/ValueAccordion";
import { Container } from "@/components/ui/Container";
import {
  getCollectionProducts,
  getCollections,
  getProduct,
  SKIN_CONCERNS,
} from "@/lib/shopify";

export default async function HomePage() {
  const [bestSellerData, giftSetData, soapsData, collections, featuredProduct] =
    await Promise.all([
      getCollectionProducts("best-seller"),
      getCollectionProducts("gift-set"),
      getCollectionProducts("soaps"),
      getCollections(),
      getProduct("eucalyptus-rosemary"),
    ]);

  const bestSellers = bestSellerData?.products.slice(0, 8) ?? [];
  const giftSets = giftSetData?.products.slice(0, 8) ?? [];
  const newArrivals = soapsData?.products.slice(0, 8) ?? [];

  const skinConcernCollections = collections.filter((c) =>
    SKIN_CONCERNS.some((s) => s.handle === c.handle),
  );

  const spotlight = featuredProduct;

  return (
    <>
      {spotlight && <FeaturedSpotlight product={spotlight} />}

      <PhilosophyBanner />

      {giftSets.length > 0 && (
        <ProductCarousel
          title="Gift Sets & Bundles"
          viewAllHref="/collections/gift-set"
          products={giftSets}
        />
      )}

      {newArrivals.length > 0 && (
        <ProductCarousel
          title="New Arrivals"
          viewAllHref="/shop"
          products={newArrivals}
        />
      )}

      {bestSellers.length > 0 && (
        <ProductCarousel
          title="Best Sellers"
          viewAllHref="/collections/best-seller"
          products={bestSellers}
        />
      )}

      <section className="py-16 md:py-24 bg-ivory-deep/50">
        <Container>
          <SectionHeading title="Skin Concern" align="center" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {skinConcernCollections.map((collection) => (
              <CategoryCard key={collection.id} collection={collection} />
            ))}
          </div>
        </Container>
      </section>

      <ValueAccordion />

      <PromoBanner />

      <ReviewsSection />

      <section className="py-16 md:py-20 bg-ivory border-t border-linen">
        <Container className="text-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-3">Follow us</p>
          <h2 className="font-display text-2xl md:text-3xl text-charcoal mb-6">
            @mvlusciouslather on Instagram
          </h2>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-3.5 border border-charcoal/20 text-charcoal text-[11px] uppercase tracking-[0.28em] hover:border-gold hover:text-gold transition-colors"
          >
            Follow on Instagram
          </a>
        </Container>
      </section>
    </>
  );
}
