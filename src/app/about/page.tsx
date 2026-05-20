import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <ContentPage title="Our Story" eyebrow="About MV Luscious Lather">
      <p className="font-display text-2xl text-charcoal italic">Welcome to MV Luscious Lather</p>
      <p>
        Rooted in local, faith-based, and family-centered values, MV Luscious Lather is a natural
        handcrafted bath and body company committed to purity and purpose.
      </p>
      <p>
        We thoughtfully create each product using 100% natural ingredients free from harsh
        preservatives and detergents, offering a wholesome alternative to conventional synthetic
        soaps.
      </p>
      <p>
        Our natural soaps are derived from nature. Our organic selection uses organically sourced
        botanicals — rich blends of plant-based butters and oils chosen to gently cleanse,
        moisturize, and care for your skin as nature intended.
      </p>
      <p>
        We employ the cold process soap method, carefully curing each bar over 4–6 weeks. Every
        bar is meticulously crafted in small batches, weighing approximately 5–6 oz.
      </p>
      <p>
        Thank you for selecting MV Luscious Lather. We are confident our products will bring you
        the same satisfaction we experienced in crafting them.
      </p>
      <ButtonLink href="/shop" variant="primary" className="mt-4">
        Explore the collection
      </ButtonLink>
    </ContentPage>
  );
}
