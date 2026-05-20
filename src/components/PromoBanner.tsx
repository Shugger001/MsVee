import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function PromoBanner() {
  return (
    <section className="py-16 md:py-20 bg-charcoal text-ivory grain">
      <Container className="text-center max-w-2xl">
        <h2 className="font-display text-3xl md:text-4xl font-medium mb-4">
          Gift Sets & Bundles
        </h2>
        <p className="text-ivory/75 leading-relaxed mb-8">
          Thoughtfully curated sets for self-care, gifting, and every season. Perfect for
          welcoming someone new or treating yourself to a full ritual.
        </p>
        <Link
          href="/collections/gift-set"
          className="inline-block px-12 py-4 bg-gold text-charcoal font-display text-lg tracking-wide hover:bg-gold-light transition-colors"
        >
          Shop gift sets
        </Link>
      </Container>
    </section>
  );
}
