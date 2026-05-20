import Link from "next/link";
import { Container } from "@/components/ui/Container";

const FOOTER_LINKS = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "Best Sellers", href: "/collections/best-seller" },
    { label: "Gift Sets", href: "/collections/gift-set" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ],
  helpful: [
    { label: "Use & Care", href: "/use-and-care" },
    { label: "FDA Regulations", href: "/fda-regulations" },
    { label: "Ingredients", href: "/ingredients" },
    { label: "Testimonials", href: "/testimonials" },
  ],
};

const POLICIES = [
  { label: "Refund policy", href: "https://www.mvlusciouslather.com/policies/refund-policy" },
  { label: "Privacy policy", href: "https://www.mvlusciouslather.com/policies/privacy-policy" },
  { label: "Terms of service", href: "https://www.mvlusciouslather.com/policies/terms-of-service" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory mt-24 grain">
      <Container className="py-20 md:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-14 lg:gap-10">
        <div className="lg:col-span-2">
          <p className="font-display text-2xl font-medium tracking-wide mb-1">MV</p>
          <p className="text-[10px] uppercase tracking-[0.38em] text-gold mb-6">Luscious Lather</p>
          <p className="text-ivory/70 text-sm leading-relaxed max-w-sm">
            Natural, handcrafted bath and body — 100% natural ingredients, free from harsh
            preservatives and detergents.
          </p>
        </div>

        <div>
          <h3 className="text-[10px] uppercase tracking-[0.32em] text-gold mb-5">Shop</h3>
          <ul className="space-y-3">
            {FOOTER_LINKS.shop.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-ivory/70 hover:text-gold text-sm transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[10px] uppercase tracking-[0.32em] text-gold mb-5">Information</h3>
          <ul className="space-y-3">
            {FOOTER_LINKS.helpful.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-ivory/70 hover:text-gold text-sm transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-[10px] uppercase tracking-[0.32em] text-gold mb-5">Contact</h3>
          <p className="text-ivory/70 text-sm mb-1">
            <a href="mailto:info@mvlusciouslather.com" className="hover:text-gold transition-colors">
              info@mvlusciouslather.com
            </a>
          </p>
          <p className="text-ivory/70 text-sm mb-8">
            <a href="https://www.mvlusciouslather.com/pages/contact-us" className="hover:text-gold transition-colors">
              Contact form →
            </a>
          </p>

          <h3 className="text-[10px] uppercase tracking-[0.32em] text-gold mb-5">Newsletter</h3>
          <form className="flex flex-col sm:flex-row gap-2" action="#" method="post">
            <input
              type="email"
              name="email"
              required
              placeholder="Your email"
              className="flex-1 px-4 py-3 bg-ivory/5 border border-ivory/15 text-ivory placeholder:text-ivory/40 text-sm focus:outline-none focus:border-gold transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gold text-charcoal text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-gold-light transition-colors"
            >
              Join
            </button>
          </form>
          <div className="flex gap-6 mt-8">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-[0.22em] text-ivory/50 hover:text-gold transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-[0.22em] text-ivory/50 hover:text-gold transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-ivory/10 py-8">
        <Container className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] tracking-wide text-ivory/40 uppercase">
          <p>© {new Date().getFullYear()} MV Luscious Lather</p>
          <ul className="flex flex-wrap justify-center gap-6">
            {POLICIES.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="hover:text-gold transition-colors">
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
