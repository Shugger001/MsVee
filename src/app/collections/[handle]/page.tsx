import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Container } from "@/components/ui/Container";
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
    <Container className="py-12 md:py-20">
      <SectionHeading
        title={collection.title}
        subtitle={`${products.length} products`}
      />
      {collection.description && (
        <p
          className="text-warm mb-12 max-w-2xl leading-relaxed -mt-6"
          dangerouslySetInnerHTML={{ __html: collection.description }}
        />
      )}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
}
