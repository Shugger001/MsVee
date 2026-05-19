"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, checkoutUrl } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-4xl text-espresso mb-4">Your cart</h1>
        <p className="text-espresso-light mb-8">Your cart is empty.</p>
        <Link
          href="/shop"
          className="inline-block px-8 py-3 bg-plum text-cream uppercase tracking-widest text-sm hover:bg-plum-light transition-colors"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  const freeShipping = subtotal >= 60;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="font-display text-4xl text-espresso mb-2">Your cart</h1>
      {!freeShipping && (
        <p className="text-sm text-espresso-light mb-8">
          Add ${(60 - subtotal).toFixed(2)} more for free shipping on orders $60+
        </p>
      )}
      {freeShipping && (
        <p className="text-sm text-plum mb-8">You qualify for free shipping!</p>
      )}

      <ul className="divide-y divide-cream-dark border-t border-cream-dark">
        {items.map((item) => (
          <li key={item.variantId} className="flex gap-4 py-6">
            <div className="relative w-24 h-28 flex-shrink-0 bg-cream-dark overflow-hidden">
              {item.image && (
                <Image src={item.image} alt={item.title} fill className="object-cover" sizes="96px" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <Link
                href={`/products/${item.handle}`}
                className="font-display text-lg text-espresso hover:text-plum line-clamp-2"
              >
                {item.title}
              </Link>
              <p className="text-espresso font-medium mt-1">
                ${item.price.toFixed(2)}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                  className="w-8 h-8 border border-cream-dark text-espresso hover:border-plum"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="text-sm w-6 text-center">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                  className="w-8 h-8 border border-cream-dark text-espresso hover:border-plum"
                  aria-label="Increase quantity"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(item.variantId)}
                  className="text-sm text-espresso-light hover:text-plum ml-2"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="font-medium text-espresso">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>

      <div className="border-t border-cream-dark mt-6 pt-6 flex justify-between items-center">
        <span className="font-display text-xl">Subtotal</span>
        <span className="text-xl font-medium">${subtotal.toFixed(2)}</span>
      </div>

      <a
        href={checkoutUrl}
        className="block w-full mt-8 py-4 bg-plum text-cream text-center uppercase tracking-widest text-sm hover:bg-plum-light transition-colors"
      >
        Checkout
      </a>
      <p className="text-xs text-espresso-light text-center mt-3">
        Secure checkout powered by Shopify
      </p>
      <Link
        href="/shop"
        className="block text-center mt-6 text-sm text-plum hover:text-plum-light"
      >
        Continue shopping
      </Link>
    </div>
  );
}
