import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getCollectionProducts } from "@/lib/shopify";

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props) {
  const { handle } = await params;
  const data = await getCollectionProducts(handle);
  if (!data) return { title: "Collection" };
  return { title: data.collection.title };
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  const data = await getCollectionProducts(handle);
  if (!data) notFound();

  const { collection, products } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <SectionHeading
        title={`${collection.title} (${products.length})`}
      />
      {collection.description && (
        <p
          className="text-espresso-light mb-10 max-w-2xl"
          dangerouslySetInnerHTML={{ __html: collection.description }}
        />
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
