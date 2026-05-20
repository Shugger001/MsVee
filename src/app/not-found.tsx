import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container narrow className="py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-4">404</p>
      <h1 className="font-display text-5xl text-charcoal mb-4">Page not found</h1>
      <p className="text-warm mb-10">The page you are looking for does not exist.</p>
      <ButtonLink href="/" variant="primary">
        Return home
      </ButtonLink>
    </Container>
  );
}
