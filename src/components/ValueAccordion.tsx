"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { VALUE_PILLARS } from "@/data/site";

export function ValueAccordion() {
  const [openId, setOpenId] = useState<string | null>(VALUE_PILLARS[0]?.id ?? null);

  return (
    <section className="py-16 md:py-24 bg-ivory-deep/40">
      <Container narrow>
        <h2 className="font-display text-3xl md:text-4xl text-charcoal font-medium text-center mb-12">
          Why Handcrafted Soaps
        </h2>
        <div className="divide-y divide-linen border-y border-linen">
          {VALUE_PILLARS.map((pillar) => {
            const isOpen = openId === pillar.id;
            return (
              <div key={pillar.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : pillar.id)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-xl md:text-2xl text-charcoal group-hover:text-gold transition-colors">
                    {pillar.title}
                  </span>
                  <span
                    className={`text-2xl text-gold transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-warm leading-relaxed pr-8">{pillar.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
