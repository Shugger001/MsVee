import { Container } from "@/components/ui/Container";

export default function ShopLoading() {
  return (
    <Container className="py-12 md:py-20">
      <div className="h-10 w-48 bg-linen animate-pulse mb-4 rounded" />
      <div className="h-4 w-32 bg-linen animate-pulse mb-12" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-[3/4] bg-linen animate-pulse mb-4" />
            <div className="h-3 w-20 bg-linen animate-pulse mb-2" />
            <div className="h-5 w-full bg-linen animate-pulse" />
          </div>
        ))}
      </div>
    </Container>
  );
}
