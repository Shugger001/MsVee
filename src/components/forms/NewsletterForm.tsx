"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";

export function NewsletterForm({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  if (!siteConfig.formspreeNewsletterId) {
    return (
      <p className="text-sm text-ivory/50">
        Newsletter signup coming soon. Follow us on{" "}
        <a href={siteConfig.instagramUrl} className="text-gold hover:underline">
          Instagram
        </a>
        .
      </p>
    );
  }

  return (
    <form
      className={className}
      action={`https://formspree.io/f/${siteConfig.formspreeNewsletterId}`}
      method="POST"
      onSubmit={() => setStatus("loading")}
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="Your email"
          className="flex-1 px-4 py-3 bg-ivory/5 border border-ivory/15 text-ivory placeholder:text-ivory/40 text-sm focus:outline-none focus:border-gold"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 bg-gold text-charcoal text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-gold-light transition-colors disabled:opacity-60"
        >
          {status === "loading" ? "…" : "Join"}
        </button>
      </div>
      {status === "success" && (
        <p className="text-gold text-xs mt-2">Thank you for subscribing.</p>
      )}
    </form>
  );
}
