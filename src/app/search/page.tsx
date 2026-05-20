import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { getAllProducts } from "@/lib/shopify";
import { SearchPageClient } from "./SearchPageClient";

type Props = { searchParams: Promise<{ q?: string }> };

export const metadata = { title: "Search" };

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const products = await getAllProducts();

  return (
    <Container className="py-12 md:py-20">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <SearchPageClient products={products} initialQuery={q} />
    </Container>
  );
}
