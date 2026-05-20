import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllProducts, getCollections } from "@/lib/shopify";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const [products, collections] = await Promise.all([
    getAllProducts(),
    getCollections(),
  ]);

  const staticRoutes = [
    "",
    "/shop",
    "/about",
    "/contact",
    "/testimonials",
    "/ingredients",
    "/use-and-care",
    "/fda-regulations",
    "/blog",
    "/search",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/products/${p.handle}`,
    lastModified: p.published_at ? new Date(p.published_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${base}/collections/${c.handle}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes];
}
