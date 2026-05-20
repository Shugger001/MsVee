import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <Container narrow className="py-16 md:py-24">
      <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-4">Get in touch</p>
      <h1 className="font-display text-4xl md:text-5xl text-charcoal font-medium mb-4">
        Contact Us
      </h1>
      <p className="text-warm mb-12 leading-relaxed max-w-md">
        We would love to hear from you. Send us a message and we will respond as soon as we can.
      </p>
      <form className="space-y-8" action="#" method="post">
        <div>
          <label htmlFor="name" className="block text-[11px] uppercase tracking-[0.24em] text-charcoal mb-3">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-0 py-3 bg-transparent border-0 border-b border-linen text-charcoal focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-[11px] uppercase tracking-[0.24em] text-charcoal mb-3">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-0 py-3 bg-transparent border-0 border-b border-linen text-charcoal focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-[11px] uppercase tracking-[0.24em] text-charcoal mb-3">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full px-0 py-3 bg-transparent border-0 border-b border-linen text-charcoal focus:outline-none focus:border-gold transition-colors resize-y"
          />
        </div>
        <Button type="submit" variant="primary" size="lg" className="w-full md:w-auto">
          Send message
        </Button>
      </form>
    </Container>
  );
}
