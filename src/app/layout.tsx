import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Analytics } from "@/components/Analytics";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SkipLink } from "@/components/SkipLink";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { siteConfig } from "@/config/site";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Natural Handcrafted Bath & Body`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <OrganizationJsonLd />
        <Analytics />
        <CartProvider>
          <SkipLink />
          <AnnouncementBar />
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
