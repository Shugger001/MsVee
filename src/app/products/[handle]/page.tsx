import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="relative aspect-square bg-cream-dark overflow-hidden">
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

        <div>
          <p className="text-sm uppercase tracking-widest text-plum mb-2">
            {product.product_type || "MV Luscious Lather"}
          </p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-espresso font-medium mb-6">
            {product.title}
          </h1>
          <div className="flex items-baseline gap-3 mb-8">
            <span className="text-2xl text-espresso font-medium">
              {formatPrice(variant.price)}
            </span>
            {onSale && variant.compare_at_price && (
              <span className="text-espresso-light/60 line-through text-lg">
                {formatPrice(variant.compare_at_price)}
              </span>
            )}
          </div>

          <AddToCartButton product={product} />

          <div
            className="mt-10 prose prose-espresso max-w-none text-espresso-light leading-relaxed [&_p]:mb-4"
            dangerouslySetInnerHTML={{ __html: product.body_html }}
          />

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3 mt-10">
              {product.images.slice(1, 5).map((img) => (
                <div key={img.src} className="relative aspect-square bg-cream-dark">
                  <Image
                    src={img.src}
                    alt={product.title}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
