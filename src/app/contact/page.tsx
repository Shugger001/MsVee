import { ContactForm } from "@/components/forms/ContactForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <Container narrow className="py-16 md:py-24">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-4">Get in touch</p>
      <h1 className="font-display text-4xl md:text-5xl text-charcoal font-medium mb-4">
        Contact Us
      </h1>
      <p className="text-warm mb-12 leading-relaxed max-w-md">
        We would love to hear from you. Send us a message and we will respond as soon as we can.
      </p>
      <ContactForm />
    </Container>
  );
}
