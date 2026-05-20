import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShopCatalog } from "@/components/shop/ShopCatalog";
import { SectionHeading } from "@/components/SectionHeading";
import { Container } from "@/components/ui/Container";
import { getAllProducts, getUniqueProductTypes } from "@/lib/shopify";

export const metadata = {
  title: "Shop All Products",
  description: "Browse our full collection of natural handcrafted soaps, scrubs, lotions, and more.",
};

export default async function ShopPage() {
  const products = await getAllProducts();
  const productTypes = getUniqueProductTypes(products);

  return (
    <Container className="py-12 md:py-20">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
      <SectionHeading title="The Collection" subtitle={`${products.length} handcrafted pieces`} />
      <ShopCatalog products={products} productTypes={productTypes} />
    </Container>
  );
}
