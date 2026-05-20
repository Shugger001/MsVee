/** Public site configuration — override via environment variables in production. */

export const siteConfig = {
  name: "MV Luscious Lather",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mvlusciouslather.com",
  description:
    "Natural, handcrafted bath and body products made with 100% natural ingredients. Soaps, scrubs, lotions, candles, and more.",
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@mvlusciouslather.com",
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/",
  instagramHandle:
    process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? "mvlusciouslather",
  facebookUrl:
    process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://www.facebook.com/",
  featuredProductHandle:
    process.env.NEXT_PUBLIC_FEATURED_PRODUCT_HANDLE ?? "eucalyptus-rosemary",
  logoUrl: process.env.NEXT_PUBLIC_LOGO_URL ?? "",
  freeShippingThreshold: 60,
  formspreeContactId: process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID ?? "",
  formspreeNewsletterId: process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID ?? "",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
} as const;
