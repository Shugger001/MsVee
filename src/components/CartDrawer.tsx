"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useCart } from "@/lib/cart";

export function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    checkoutUrl,
  } = useCart();

  const freeShipping = subtotal >= siteConfig.freeShippingThreshold;

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-charcoal/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden={!isOpen}
      />
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-ivory shadow-elevated flex flex-col transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
        aria-label="Shopping bag"
        role="dialog"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-linen">
          <h2 className="font-display text-2xl text-charcoal">
            Your bag {count > 0 && `(${count})`}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="p-2 text-charcoal hover:text-gold"
            aria-label="Close bag"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-warm mb-6">Your bag is empty.</p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="text-[11px] uppercase tracking-[0.22em] text-gold link-underline"
              >
                Shop the collection
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-linen">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-4 py-5">
                  <div className="relative w-20 h-24 bg-ivory-deep shrink-0 overflow-hidden">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.handle}`}
                      onClick={closeCart}
                      className="font-display text-base text-charcoal hover:text-gold line-clamp-2"
                    >
                      {item.title}
                    </Link>
                    <p className="text-sm text-charcoal mt-1">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="w-8 h-8 border border-linen text-sm"
                        aria-label="Decrease"
                      >
                        −
                      </button>
                      <span className="text-sm tabular-nums">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="w-8 h-8 border border-linen text-sm"
                        aria-label="Increase"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.variantId)}
                        className="text-[10px] uppercase tracking-wider text-muted ml-auto"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-linen px-6 py-6 space-y-4">
            {!freeShipping ? (
              <p className="text-xs text-warm text-center">
                Add ${(siteConfig.freeShippingThreshold - subtotal).toFixed(2)} more for free
                shipping
              </p>
            ) : (
              <p className="text-xs text-gold text-center">You qualify for free shipping</p>
            )}
            <div className="flex justify-between font-display text-xl">
              <span>Subtotal</span>
              <span className="tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
            <a
              href={checkoutUrl}
              className="block w-full py-4 bg-charcoal text-ivory text-center text-[11px] uppercase tracking-[0.28em] hover:bg-charcoal-soft transition-colors"
            >
              Checkout
            </a>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block text-center text-[11px] uppercase tracking-[0.2em] text-muted hover:text-gold"
            >
              View full cart
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
