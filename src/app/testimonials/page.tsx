import { ContentPage } from "@/components/ContentPage";
import { REVIEWS, REVIEW_SUMMARY } from "@/data/site";

export const metadata = { title: "Testimonials" };

export default function TestimonialsPage() {
  return (
    <ContentPage title="Testimonials" eyebrow="Kind words">
      <p className="text-muted text-sm -mt-4 mb-8">
        {REVIEW_SUMMARY.average} ★ average from {REVIEW_SUMMARY.count}+ happy customers
      </p>
      {REVIEWS.map((t) => (
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
