import Image from "next/image";
import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
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

  const bestSellers = bestSellerData?.products.slice(0, 12) ?? [];
  const newProducts = newProductsData.filter((p): p is ShopifyProduct => p !== null);

  const skinConcernCollections = collections.filter((c) =>
    SKIN_CONCERNS.some((s) => s.handle === c.handle),
  );

  return (
    <>
      <section className="relative w-full h-[50vh] md:h-[65vh] lg:h-[75vh]">
        <Image
          src={HERO_IMAGE}
          alt="Handcrafted artisan soaps by MV Luscious Lather"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-espresso/20" />
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
        <h1 className="font-display text-2xl md:text-3xl lg:text-[2rem] leading-relaxed text-espresso font-medium">
          Rooted in local, faith-based, and family-centered values, MV Luscious
          Lather is a natural, handcrafted bath and body company committed to
          purity and purpose. We thoughtfully create each product using 100%
          natural ingredients, free from harsh preservatives and detergents,
          offering a wholesome alternative to conventional, synthetic soaps.
        </h1>
        <Link
          href="/about"
          className="inline-block mt-10 px-10 py-3.5 bg-plum text-cream uppercase tracking-[0.2em] text-sm hover:bg-plum-light transition-colors"
        >
          About Us
        </Link>
      </section>

      <section className="relative w-full h-[40vh] md:h-[50vh]">
        <Image
          src={INGREDIENTS_IMAGE}
          alt="Made with the finest ingredients"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-espresso/30">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream font-medium text-center px-4">
            Made with the finest ingredients
          </h2>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <SectionHeading title="Best Sellers" viewAllHref="/collections/best-seller" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-cream-dark/50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading title="Skin Concern" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {skinConcernCollections.map((collection) => (
              <CategoryCard key={collection.id} collection={collection} />
            ))}
          </div>
        </div>
      </section>

      {newProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <SectionHeading title="New Products" viewAllHref="/shop" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-espresso py-16 md:py-20 text-center">
        <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">Follow us on Instagram</h2>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-gold uppercase tracking-widest text-sm hover:text-cream transition-colors"
        >
          @mvlusciouslather
        </a>
      </section>
    </>
  );
}
