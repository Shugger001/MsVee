"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { NAV_CATEGORIES } from "@/lib/shopify";
import { useCart } from "@/lib/cart";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ivory/95 backdrop-blur-xl shadow-soft border-b border-linen"
          : "bg-ivory/80 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-[4.5rem] md:h-24">
          <button
            type="button"
            className="md:hidden p-2 -ml-2 text-charcoal"
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 text-center flex flex-col items-center"
          >
            {siteConfig.logoUrl ? (
              <Image
                src={siteConfig.logoUrl}
                alt={siteConfig.name}
                width={120}
                height={48}
                className="h-10 w-auto object-contain"
              />
            ) : (
              <>
                <span className="block font-display text-[1.35rem] md:text-[1.65rem] font-medium tracking-[0.18em] text-charcoal uppercase leading-none">
                  MV
                </span>
                <span className="block text-[9px] md:text-[10px] uppercase tracking-[0.42em] text-muted mt-1">
                  Luscious Lather
                </span>
              </>
            )}
          </Link>

          <div className="flex items-center gap-1 md:gap-3">
            <button
              type="button"
              className="p-2.5 text-charcoal hover:text-gold transition-colors"
              aria-label="Search"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={openCart}
              className="relative p-2.5 text-charcoal hover:text-gold transition-colors"
              aria-label={`Cart, ${count} items`}
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {count > 0 && (
                <span className="absolute top-1 right-1 bg-gold text-charcoal text-[9px] font-semibold min-w-[16px] h-4 rounded-full flex items-center justify-center px-1">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>
          </div>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 pb-5 -mt-1 flex-wrap">
          <Link
            href="/shop"
            className="link-underline text-[11px] uppercase tracking-[0.22em] text-charcoal-soft hover:text-gold whitespace-nowrap transition-colors font-medium"
          >
            Shop All
          </Link>
          {NAV_CATEGORIES.slice(0, 6).map((cat) => (
            <Link
              key={cat.handle}
              href={`/collections/${cat.handle}`}
              className="link-underline text-[11px] uppercase tracking-[0.22em] text-charcoal-soft hover:text-gold whitespace-nowrap transition-colors"
            >
              {cat.label}
            </Link>
          ))}
          <Link
            href="/blog"
            className="link-underline text-[11px] uppercase tracking-[0.22em] text-charcoal-soft hover:text-gold whitespace-nowrap transition-colors"
          >
            Journal
          </Link>
        </nav>
      </div>

      {searchOpen && (
        <form action="/search" className="border-t border-linen px-5 sm:px-8 py-4 bg-ivory-deep/50">
          <input
            type="search"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search our collection..."
            className="w-full max-w-xl mx-auto block px-0 py-2 bg-transparent border-0 border-b border-charcoal/20 text-charcoal placeholder:text-muted focus:outline-none focus:border-gold text-sm tracking-wide"
            autoFocus
          />
        </form>
      )}

      {menuOpen && (
        <nav className="md:hidden border-t border-linen py-6 px-5 space-y-1 max-h-[70vh] overflow-y-auto bg-ivory">
          <Link href="/shop" className="block py-3 text-[11px] uppercase tracking-[0.22em] text-charcoal hover:text-gold font-medium" onClick={() => setMenuOpen(false)}>
            Shop All
          </Link>
          {NAV_CATEGORIES.map((cat) => (
            <Link
              key={cat.handle}
              href={`/collections/${cat.handle}`}
              className="block py-3 text-[11px] uppercase tracking-[0.22em] text-charcoal hover:text-gold border-b border-linen/60"
              onClick={() => setMenuOpen(false)}
            >
              {cat.label}
            </Link>
          ))}
          <Link href="/blog" className="block py-3 text-[11px] uppercase tracking-[0.22em] text-charcoal hover:text-gold" onClick={() => setMenuOpen(false)}>
            Journal
          </Link>
          <Link href="/about" className="block py-3 text-[11px] uppercase tracking-[0.22em] text-charcoal hover:text-gold" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link href="/contact" className="block py-3 text-[11px] uppercase tracking-[0.22em] text-charcoal hover:text-gold" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
