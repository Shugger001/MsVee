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
    <ContentPage title="Testimonials">
      {TESTIMONIALS.map((t) => (
        <blockquote key={t.quote} className="border-l-4 border-plum pl-6 italic">
          <p>&ldquo;{t.quote}&rdquo;</p>
          <footer className="mt-3 text-sm not-italic text-espresso">— {t.author}</footer>
        </blockquote>
      ))}
    </ContentPage>
  );
}
