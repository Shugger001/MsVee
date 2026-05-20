import { Container } from "@/components/ui/Container";

export function PhilosophyBanner() {
  return (
    <section className="py-16 md:py-24 bg-ivory border-y border-linen">
      <Container narrow className="text-center">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-charcoal font-medium mb-6">
          Natural Bath & Body Products
        </h2>
        <p className="font-display text-xl md:text-2xl lg:text-3xl text-charcoal-soft leading-relaxed text-balance italic">
          Because what you put <span className="not-italic text-gold">on</span> your body is just
          as important as what you put <span className="not-italic text-gold">in</span> your body.
        </p>
      </Container>
    </section>
  );
}
