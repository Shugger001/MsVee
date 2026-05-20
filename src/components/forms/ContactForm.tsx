"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  if (!siteConfig.formspreeContactId) {
    return (
      <div className="space-y-4 text-warm">
        <p>
          Email us at{" "}
          <a href={`mailto:${siteConfig.contactEmail}`} className="text-gold hover:underline">
            {siteConfig.contactEmail}
          </a>
        </p>
        <p>
          Or use our{" "}
          <a
            href="https://www.mvlusciouslather.com/pages/contact-us"
            className="text-gold hover:underline"
          >
            contact page on Shopify
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-8"
      action={`https://formspree.io/f/${siteConfig.formspreeContactId}`}
      method="POST"
      onSubmit={() => setStatus("loading")}
    >
      <div>
        <label htmlFor="name" className="block text-[11px] uppercase tracking-[0.24em] text-charcoal mb-3">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full px-0 py-3 bg-transparent border-0 border-b border-linen text-charcoal focus:outline-none focus:border-gold"
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
          className="w-full px-0 py-3 bg-transparent border-0 border-b border-linen text-charcoal focus:outline-none focus:border-gold"
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
          className="w-full px-0 py-3 bg-transparent border-0 border-b border-linen text-charcoal focus:outline-none focus:border-gold resize-y"
        />
      </div>
      <Button type="submit" variant="primary" size="lg" className="w-full md:w-auto" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send message"}
      </Button>
      {status === "success" && (
        <p className="text-gold text-sm">Thank you — we will get back to you soon.</p>
      )}
    </form>
  );
}
