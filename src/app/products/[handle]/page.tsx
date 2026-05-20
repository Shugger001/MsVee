import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Container } from "@/components/ui/Container";
import {
  formatPrice,
  getPrimaryVariant,
  getProduct,
  isOnSale,
  stripHtml,
} from "@/lib/shopify";

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: "Product" };
  return { title: product.title, description: stripHtml(product.body_html).slice(0, 160) };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const variant = getPrimaryVariant(product);
  const onSale = isOnSale(product);

  return (
    <Container className="py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="relative aspect-[4/5] bg-ivory-deep overflow-hidden shadow-card">
          {product.images[0] ? (
            <Image
              src={product.images[0].src}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : null}
        </div>

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
            Free shipping on orders $60+
          </p>

          <div
            className="mt-12 prose-luxury text-base"
            dangerouslySetInnerHTML={{ __html: product.body_html }}
          />

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3 mt-12 pt-12 border-t border-linen">
              {product.images.slice(1, 5).map((img) => (
                <div key={img.src} className="relative aspect-square bg-ivory-deep overflow-hidden">
                  <Image
                    src={img.src}
                    alt={product.title}
                    fill
                    sizes="120px"
                    className="object-cover hover:opacity-90 transition-opacity"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
