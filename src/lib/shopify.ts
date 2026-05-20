const SHOPIFY_STORE = "www.mvlusciouslather.com";

export type ShopifyVariant = {
  id: number;
  title: string;
  price: string;
  compare_at_price: string | null;
  available: boolean;
};

export type ShopifyImage = {
  src: string;
  alt: string | null;
  width: number;
  height: number;
};

export type ShopifyProduct = {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  product_type: string;
  tags: string[];
  variants: ShopifyVariant[];
  images: ShopifyImage[];
  published_at?: string;
  created_at?: string;
};

export type ShopifyCollection = {
  id: number;
  title: string;
  handle: string;
  description: string;
  image: { src: string; alt: string | null } | null;
  products_count: number;
};

type ProductsResponse = { products: ShopifyProduct[] };
type ProductResponse = { product: ShopifyProduct };
type CollectionsResponse = { collections: ShopifyCollection[] };
type CollectionProductsResponse = { products: ShopifyProduct[] };

async function shopifyFetch<T>(path: string): Promise<T> {
  const res = await fetch(`https://${SHOPIFY_STORE}${path}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error(`Shopify fetch failed: ${path} (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export async function getAllProducts(limit = 250): Promise<ShopifyProduct[]> {
  const all: ShopifyProduct[] = [];
  let page = 1;

  while (true) {
    const data = await shopifyFetch<ProductsResponse>(
      `/products.json?limit=${limit}&page=${page}`,
    );
    if (!data.products.length) break;
    all.push(...data.products);
    if (data.products.length < limit) break;
    page += 1;
    if (page > 10) break;
  }

  return all;
}

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  try {
    const data = await shopifyFetch<ProductResponse>(`/products/${handle}.json`);
    return data.product;
  } catch {
    return null;
  }
}

export async function getCollections(): Promise<ShopifyCollection[]> {
  const data = await shopifyFetch<CollectionsResponse>("/collections.json");
  return data.collections;
}

export async function getCollectionProducts(
  handle: string,
): Promise<{ collection: ShopifyCollection; products: ShopifyProduct[] } | null> {
  try {
    const [collections, productsData] = await Promise.all([
      getCollections(),
      shopifyFetch<CollectionProductsResponse>(
        `/collections/${handle}/products.json?limit=250`,
      ),
    ]);
    const collection = collections.find((c) => c.handle === handle);
    if (!collection) return null;
    return { collection, products: productsData.products };
  } catch {
    return null;
  }
}

export function formatPrice(amount: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parseFloat(amount));
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getPrimaryVariant(product: ShopifyProduct): ShopifyVariant {
  return product.variants[0];
}

export function isOnSale(product: ShopifyProduct): boolean {
  const v = getPrimaryVariant(product);
  if (!v.compare_at_price) return false;
  return parseFloat(v.compare_at_price) > parseFloat(v.price);
}

export function shopifyCartUrl(variantIds: { id: number; quantity: number }[]): string {
  const items = variantIds.map((i) => `${i.id}:${i.quantity}`).join(",");
  return `https://${SHOPIFY_STORE}/cart/${items}`;
}

export function getProductPrice(product: ShopifyProduct): number {
  return parseFloat(getPrimaryVariant(product).price);
}

export function isInStock(product: ShopifyProduct): boolean {
  return getPrimaryVariant(product).available;
}

export async function getNewArrivals(limit = 8): Promise<ShopifyProduct[]> {
  const all = await getAllProducts();
  return [...all]
    .sort((a, b) => {
      const da = new Date(a.published_at ?? a.created_at ?? 0).getTime();
      const db = new Date(b.published_at ?? b.created_at ?? 0).getTime();
      return db - da;
    })
    .slice(0, limit);
}

export async function getRelatedProducts(
  product: ShopifyProduct,
  limit = 4,
): Promise<ShopifyProduct[]> {
  const all = await getAllProducts();
  const type = product.product_type?.toLowerCase() ?? "";
  const tags = new Set(product.tags.map((t) => t.toLowerCase()));

  const score = (p: ShopifyProduct) => {
    let s = 0;
    if (p.product_type?.toLowerCase() === type && type) s += 3;
    p.tags.forEach((t) => {
      if (tags.has(t.toLowerCase())) s += 1;
    });
    return s;
  };

  return all
    .filter((p) => p.id !== product.id)
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit);
}

export function getUniqueProductTypes(products: ShopifyProduct[]): string[] {
  const types = new Set<string>();
  products.forEach((p) => {
    if (p.product_type?.trim()) types.add(p.product_type.trim());
  });
  return [...types].sort();
}

export const NAV_CATEGORIES = [
  { label: "Soaps", handle: "soaps" },
  { label: "Scrub", handle: "scrub" },
  { label: "Lotion", handle: "lotion-moisturizer" },
  { label: "Candle", handle: "candle" },
  { label: "Bodywash", handle: "bodywash" },
  { label: "Body Butter", handle: "body-butter" },
  { label: "Gift Set", handle: "gift-set" },
  { label: "Bath Bomb & Truffles", handle: "bath-bomb-truffles" },
] as const;

export const SKIN_CONCERNS = [
  { label: "Best for Acne", handle: "best-for-acne" },
  { label: "Best for Men", handle: "best-for-men" },
  { label: "Milk Soap", handle: "milk-soap" },
  { label: "Best for Babies", handle: "best-for-babies" },
] as const;

export const HERO_IMAGE =
  "https://cdn.shopify.com/s/files/1/0548/8020/7017/collections/2025-04-27-16-16-45-310.jpg?v=1746659958";

export const INGREDIENTS_IMAGE =
  "https://cdn.shopify.com/s/files/1/0548/8020/7017/collections/2023-10-24-23-13-14-991.jpg?v=1746659352";
