# MV Luscious Lather

A custom storefront for [MV Luscious Lather](https://www.mvlusciouslather.com/) — natural, handcrafted bath and body products. Built with Next.js and connected to your existing Shopify catalog for products and checkout.

## Features

- Custom design matching your brand (cream, espresso, plum palette; elegant typography)
- Live product data from your Shopify store
- Collection pages (Soaps, Scrubs, Best Sellers, Skin Concern, etc.)
- Product detail pages with add-to-cart
- Cart with redirect to Shopify secure checkout
- About, Contact, and policy-style pages

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Deploy to [Vercel](https://vercel.com), Netlify, or any Node host:

```bash
npm run build
npm start
```

Point your domain (`mvlusciouslather.com`) to this deployment when ready to replace the Shopify theme storefront.

## Shopify checkout

Cart checkout links to `mvlusciouslather.com/cart` on Shopify so payments, inventory, and shipping rules stay on your Shopify plan. No Storefront API token is required for the initial version.

## Optional next steps

- Add your real Instagram and Facebook URLs in `Footer.tsx` and the home page
- Connect a contact form (Formspree, Resend, etc.)
- Add Shopify Storefront API for in-app checkout
- Replace placeholder testimonials with real reviews
