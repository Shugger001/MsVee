import { siteConfig } from "@/config/site";

const BADGES = [
  { label: "100% natural ingredients" },
  { label: "Handcrafted in small batches" },
  { label: `Free shipping $${siteConfig.freeShippingThreshold}+` },
  { label: "Cold-process cured 4–6 weeks" },
];

export function ProductTrustBadges() {
  return (
    <ul className="grid grid-cols-2 gap-3 mt-8 pt-8 border-t border-linen">
      {BADGES.map((b) => (
        <li
          key={b.label}
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted"
        >
          <span className="text-gold shrink-0">✦</span>
          {b.label}
        </li>
      ))}
    </ul>
  );
}
