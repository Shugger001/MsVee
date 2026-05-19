import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <h1 className="font-display text-4xl md:text-5xl text-espresso font-medium mb-8">
        About Us
      </h1>
      <div className="space-y-6 text-espresso-light leading-relaxed text-lg">
        <p className="font-display text-2xl text-espresso">Welcome to MV Luscious Lather</p>
        <p>
          Rooted in local, faith-based, and family-centered values, MV Luscious Lather is a
          natural handcrafted bath and body company committed to purity and purpose.
        </p>
        <p>
          We thoughtfully create each product using 100% natural ingredients free from harsh
          preservatives and detergents, offering a wholesome alternative to conventional
          synthetic soaps.
        </p>
        <p>
          Our natural soaps are derived from nature. While our organic selection are made using
          organically sourced botanicals. These soaps are rich blends of nourishing plant-based
          butters and oils, chosen to gently cleanse, moisturize, and care for your skin just as
          nature intended.
        </p>
        <p>
          We employ the cold process soap method to create our handmade soap, which is carefully
          cured over a period of 4–6 weeks. Our commitment to quality control is reflected in our
          small-batch production process, where each bar is meticulously crafted to weigh
          approximately 5–6 oz. While variations in appearance may arise, each bar adheres to
          our unwavering standards.
        </p>
        <p>
          Thank you for selecting MV Luscious Lather and allowing us the opportunity to address
          your skin care needs. We are confident that our products will bring you the same
          satisfaction that we experienced in crafting them.
        </p>
      </div>
      <Link
        href="/shop"
        className="inline-block mt-12 px-10 py-3.5 bg-plum text-cream uppercase tracking-[0.2em] text-sm hover:bg-plum-light transition-colors"
      >
        Shop our collection
      </Link>
    </div>
  );
}
