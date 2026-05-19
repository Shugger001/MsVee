import Link from "next/link";

const FOOTER_LINKS = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "Best Sellers", href: "/collections/best-seller" },
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

export function Footer() {
  return (
    <footer className="bg-espresso text-cream mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-wide mb-4">
            MV Luscious Lather
          </h2>
          <p className="text-cream/80 text-sm leading-relaxed">
            Natural, handcrafted bath and body products made with 100% natural
            ingredients — free from harsh preservatives and detergents.
          </p>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-widest mb-4 text-gold">Shop</h3>
          <ul className="space-y-2">
            {FOOTER_LINKS.shop.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-cream/80 hover:text-cream text-sm transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-widest mb-4 text-gold">Helpful Links</h3>
          <ul className="space-y-2">
            {FOOTER_LINKS.helpful.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-cream/80 hover:text-cream text-sm transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-widest mb-4 text-gold">
            Subscribe to our emails
          </h3>
          <form className="flex gap-2" action="#" method="post">
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="flex-1 px-3 py-2 bg-cream/10 border border-cream/20 text-cream placeholder:text-cream/50 text-sm focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-plum hover:bg-plum-light text-cream text-sm uppercase tracking-wider transition-colors"
            >
              Subscribe
            </button>
          </form>
          <div className="flex gap-4 mt-6">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/70 hover:text-cream transition-colors"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/70 hover:text-cream transition-colors"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6 text-center text-cream/60 text-xs tracking-wide">
        © {new Date().getFullYear()}, MV Luscious Lather. All rights reserved.
      </div>
    </footer>
  );
}
