import { Container } from "@/components/ui/Container";

export function ContentPage({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <Container narrow className="py-16 md:py-24">
      {eyebrow && (
        <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-4">{eyebrow}</p>
      )}
      <h1 className="font-display text-4xl md:text-5xl text-charcoal font-medium mb-10 leading-tight">
        {title}
      </h1>
      <div className="space-y-6 text-warm leading-relaxed text-base md:text-lg">{children}</div>
    </Container>
  );
}
