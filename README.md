# MV Luscious Lather

Custom storefront for [MV Luscious Lather](https://www.mvlusciouslather.com/) — natural, handcrafted bath and body. Built with Next.js; products and checkout stay on Shopify.

## Features

- Premium custom design (ivory, charcoal, gold palette)
- Live Shopify product & collection sync
- Rotating announcement bar
- Featured product spotlight, product carousels, reviews, value accordion
- Shop filters (category, price, in stock), sort, pagination
- Product gallery, related products, sticky mobile add-to-cart
- Cart drawer + full cart page → Shopify checkout
- Quick add on product cards
- Search with autocomplete
- SEO: sitemap, robots, JSON-LD, Open Graph
- Formspree-ready contact & newsletter forms
- Google Analytics (optional)
- Journal, breadcrumbs, 404 with suggestions

## Setup

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your URLs, social links, Formspree IDs, GA ID
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See `.env.example` for:

- `NEXT_PUBLIC_SITE_URL` — your deployed domain
- `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_FACEBOOK_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_FEATURED_PRODUCT_HANDLE` — homepage spotlight product
- `NEXT_PUBLIC_FORMSPREE_CONTACT_ID`, `NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID`
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4
- `NEXT_PUBLIC_LOGO_URL` — optional logo image

## Deploy

Deploy to [Vercel](https://vercel.com), connect `Shugger001/MsVee`, add env vars, then point `mvlusciouslather.com` DNS to Vercel.

## Checkout

Cart uses Shopify cart URLs so payments, inventory, and shipping rules remain on your Shopify plan.
