"use client";

import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useCart } from "@/lib/cart";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, checkoutUrl } = useCart();

  if (items.length === 0) {
    return (
      <Container narrow className="py-24 text-center">
        <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-4">Your bag</p>
        <h1 className="font-display text-4xl text-charcoal mb-4">Empty</h1>
        <p className="text-warm mb-10">Your shopping bag is waiting to be filled.</p>
        <ButtonLink href="/shop" variant="primary">
          Continue shopping
        </ButtonLink>
      </Container>
    );
  }

  const freeShipping = subtotal >= 60;

  return (
    <Container className="py-12 md:py-20 max-w-3xl">
      <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-2">Checkout</p>
      <h1 className="font-display text-4xl text-charcoal mb-2">Your bag</h1>
      {!freeShipping ? (
        <p className="text-sm text-warm mb-10">
          Add <span className="text-charcoal font-medium">${(60 - subtotal).toFixed(2)}</span> more
          for complimentary shipping
        </p>
      ) : (
        <p className="text-sm text-gold mb-10">You qualify for complimentary shipping</p>
      )}

      <ul className="divide-y divide-linen">
        {items.map((item) => (
          <li key={item.variantId} className="flex gap-5 py-8 first:pt-0">
            <div className="relative w-24 h-32 flex-shrink-0 bg-ivory-deep overflow-hidden shadow-soft">
              {item.image && (
                <Image src={item.image} alt={item.title} fill className="object-cover" sizes="96px" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <Link
                href={`/products/${item.handle}`}
                className="font-display text-lg text-charcoal hover:text-gold line-clamp-2 transition-colors"
              >
                {item.title}
              </Link>
              <p className="text-charcoal font-medium mt-1 tracking-wide">${item.price.toFixed(2)}</p>
              <div className="flex items-center gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                  className="w-9 h-9 border border-linen text-charcoal hover:border-gold transition-colors text-sm"
                  aria-label="Decrease"
                >
                  −
                </button>
                <span className="text-sm w-4 text-center tabular-nums">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                  className="w-9 h-9 border border-linen text-charcoal hover:border-gold transition-colors text-sm"
                  aria-label="Increase"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(item.variantId)}
                  className="text-[11px] uppercase tracking-[0.2em] text-muted hover:text-charcoal ml-2"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="font-medium text-charcoal tabular-nums">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>

      <div className="border-t border-linen mt-4 pt-8 flex justify-between items-baseline">
        <span className="font-display text-2xl text-charcoal">Subtotal</span>
        <span className="text-2xl font-medium text-charcoal tabular-nums">${subtotal.toFixed(2)}</span>
      </div>

      <a
        href={checkoutUrl}
        className="block w-full mt-8 py-4 bg-charcoal text-ivory text-center text-[11px] uppercase tracking-[0.28em] font-medium hover:bg-charcoal-soft transition-colors"
      >
        Proceed to checkout
      </a>
      <p className="text-[11px] text-muted text-center mt-4 tracking-wide">
        Secure checkout · Shopify
      </p>
      <Link
        href="/shop"
        className="block text-center mt-8 text-[11px] uppercase tracking-[0.22em] text-warm hover:text-gold transition-colors"
      >
        Continue shopping
      </Link>
    </Container>
  );
}
