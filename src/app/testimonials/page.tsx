import { ContentPage } from "@/components/ContentPage";

export const metadata = { title: "Testimonials" };

const TESTIMONIALS = [
  {
    quote:
      "The lavender vanilla soap is my favorite — gentle on my skin and smells amazing. You can tell it's made with care.",
    author: "Happy customer",
  },
  {
    quote:
      "Finally found natural soaps that don't dry me out. MV Luscious Lather is a staple in our home.",
    author: "Repeat buyer",
  },
];

export default function TestimonialsPage() {
  return (
    <ContentPage title="Testimonials" eyebrow="Kind words">
      {TESTIMONIALS.map((t) => (
        <blockquote key={t.quote} className="border-l-2 border-gold pl-8 py-2">
          <p className="font-display text-xl md:text-2xl text-charcoal italic leading-relaxed">
            &ldquo;{t.quote}&rdquo;
          </p>
          <footer className="mt-4 text-[11px] uppercase tracking-[0.24em] text-muted not-italic">
            — {t.author}
          </footer>
        </blockquote>
      ))}
    </ContentPage>
  );
}
