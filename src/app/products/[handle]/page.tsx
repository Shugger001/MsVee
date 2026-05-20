import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductTrustBadges } from "@/components/ProductTrustBadges";
import { RelatedProducts } from "@/components/RelatedProducts";
import { StickyAddToCart } from "@/components/StickyAddToCart";
import { ProductJsonLd } from "@/components/seo/ProductJsonLd";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import {
  formatPrice,
  getPrimaryVariant,
  getProduct,
  getRelatedProducts,
  isOnSale,
  stripHtml,
} from "@/lib/shopify";

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: "Product" };
  const description = stripHtml(product.body_html).slice(0, 160);
  const image = product.images[0]?.src;
  return {
    title: product.title,
    description,
    openGraph: {
      title: product.title,
      description,
      images: image ? [{ url: image, alt: product.title }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const [related] = await Promise.all([getRelatedProducts(product, 4)]);
  const variant = getPrimaryVariant(product);
  const onSale = isOnSale(product);

  return (
    <>
      <ProductJsonLd product={product} />
      <Container className="py-12 md:py-20">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: product.title },
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <ProductGallery images={product.images} title={product.title} />
          <div className="lg:py-4">
            <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-3">
              {product.product_type || "Handcrafted"}
            </p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] text-charcoal font-medium leading-tight mb-6">
              {product.title}
            </h1>
            <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-linen">
              <span className="text-2xl text-charcoal font-medium tracking-wide">
                {formatPrice(variant.price)}
              </span>
              {onSale && variant.compare_at_price && (
                <span className="text-muted line-through text-lg">
                  {formatPrice(variant.compare_at_price)}
                </span>
              )}
            </div>
            <AddToCartButton product={product} />
            <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-muted text-center">
              Free shipping on orders ${siteConfig.freeShippingThreshold}+
            </p>
            <ProductTrustBadges />
            <div
              className="mt-12 prose-luxury text-base hidden lg:block"
              dangerouslySetInnerHTML={{ __html: product.body_html }}
            />
          </div>
        </div>
        <div
          className="mt-12 prose-luxury text-base lg:hidden border-t border-linen pt-12"
          dangerouslySetInnerHTML={{ __html: product.body_html }}
        />
      </Container>
      <RelatedProducts products={related} />
      <StickyAddToCart product={product} />
    </>
  );
}
