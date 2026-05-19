"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_CATEGORIES } from "@/lib/shopify";
import { useCart } from "@/lib/cart";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            type="button"
            className="md:hidden p-2 -ml-2 text-espresso"
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:flex-shrink-0"
          >
            <span className="font-display text-xl md:text-2xl font-semibold tracking-[0.2em] text-espresso uppercase">
              MV Luscious Lather
            </span>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              type="button"
              className="p-2 text-espresso hover:text-plum transition-colors"
              aria-label="Search"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <Link
              href="/cart"
              className="relative p-2 text-espresso hover:text-plum transition-colors"
              aria-label={`Cart, ${count} items`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-plum text-cream text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Link>
          </div>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 pb-4 -mt-1 overflow-x-auto">
          {NAV_CATEGORIES.map((cat) => (
            <Link
              key={cat.handle}
              href={`/collections/${cat.handle}`}
              className="text-sm uppercase tracking-wider text-espresso-light hover:text-plum whitespace-nowrap transition-colors"
            >
              {cat.label}
            </Link>
          ))}
        </nav>
      </div>

      {searchOpen && (
        <form action="/search" className="border-t border-cream-dark px-4 py-3">
          <input
            type="search"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full max-w-xl mx-auto block px-4 py-2 bg-white border border-cream-dark rounded-sm text-espresso placeholder:text-espresso-light/50 focus:outline-none focus:ring-2 focus:ring-plum/30"
            autoFocus
          />
        </form>
      )}

      {menuOpen && (
        <nav className="md:hidden border-t border-cream-dark py-4 px-4 space-y-1 max-h-[70vh] overflow-y-auto">
          {NAV_CATEGORIES.map((cat) => (
            <Link
              key={cat.handle}
              href={`/collections/${cat.handle}`}
              className="block py-2.5 text-sm uppercase tracking-wider text-espresso hover:text-plum"
              onClick={() => setMenuOpen(false)}
            >
              {cat.label}
            </Link>
          ))}
          <Link
            href="/about"
            className="block py-2.5 text-sm uppercase tracking-wider text-espresso hover:text-plum"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="block py-2.5 text-sm uppercase tracking-wider text-espresso hover:text-plum"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
