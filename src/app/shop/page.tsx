import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Container } from "@/components/ui/Container";
import { getAllProducts } from "@/lib/shopify";

export const metadata = {
  title: "Shop All Products",
};

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <Container className="py-12 md:py-20">
      <SectionHeading
        title="The Collection"
        subtitle={`${products.length} handcrafted pieces`}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
}
