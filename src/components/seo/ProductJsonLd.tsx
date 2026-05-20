import { siteConfig } from "@/config/site";
import { getPrimaryVariant, type ShopifyProduct } from "@/lib/shopify";

export function ProductJsonLd({ product }: { product: ShopifyProduct }) {
  const variant = getPrimaryVariant(product);
  const image = product.images[0]?.src;

  const json = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.body_html.replace(/<[^>]*>/g, " ").slice(0, 500),
    image: product.images.map((i) => i.src),
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/products/${product.handle}`,
      priceCurrency: "USD",
      price: variant.price,
      availability: variant.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  if (!image) delete (json as { image?: string[] }).image;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
