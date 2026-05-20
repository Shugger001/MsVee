import { siteConfig } from "@/config/site";

export function OrganizationJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.contactEmail,
    sameAs: [siteConfig.instagramUrl, siteConfig.facebookUrl].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
