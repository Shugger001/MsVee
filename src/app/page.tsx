import { CategoryCard } from "@/components/CategoryCard";
import { FeaturedSpotlight } from "@/components/FeaturedSpotlight";
import { InstagramSection } from "@/components/InstagramSection";
import { PhilosophyBanner } from "@/components/PhilosophyBanner";
import { ProductCarousel } from "@/components/ProductCarousel";
import { PromoBanner } from "@/components/PromoBanner";
import { ReviewsSection } from "@/components/ReviewsSection";
import { SectionHeading } from "@/components/SectionHeading";
import { ValueAccordion } from "@/components/ValueAccordion";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import {
  getCollectionProducts,
  getCollections,
  getNewArrivals,
  getProduct,
  SKIN_CONCERNS,
} from "@/lib/shopify";

export default async function HomePage() {
  const [bestSellerData, giftSetData, newArrivals, collections, featuredProduct] =
    await Promise.all([
      getCollectionProducts("best-seller"),
      getCollectionProducts("gift-set"),
      getNewArrivals(8),
      getCollections(),
      getProduct(siteConfig.featuredProductHandle),
    ]);

  const bestSellers = bestSellerData?.products.slice(0, 8) ?? [];
  const giftSets = giftSetData?.products.slice(0, 8) ?? [];

  const skinConcernCollections = collections.filter((c) =>
    SKIN_CONCERNS.some((s) => s.handle === c.handle),
  );

  return (
    <>
      {featuredProduct && <FeaturedSpotlight product={featuredProduct} />}
      <PhilosophyBanner />
      {giftSets.length > 0 && (
        <ProductCarousel title="Gift Sets & Bundles" viewAllHref="/collections/gift-set" products={giftSets} />
      )}
      {newArrivals.length > 0 && (
        <ProductCarousel title="New Arrivals" viewAllHref="/shop" products={newArrivals} />
      )}
      {bestSellers.length > 0 && (
        <ProductCarousel title="Best Sellers" viewAllHref="/collections/best-seller" products={bestSellers} />
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
      <InstagramSection />
    </>
  );
}
