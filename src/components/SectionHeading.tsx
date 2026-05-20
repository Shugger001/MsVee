import Link from "next/link";

export function SectionHeading({
  title,
  subtitle,
  viewAllHref,
  align = "left",
}: {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <div
      className={`mb-12 md:mb-16 ${centered ? "text-center max-w-2xl mx-auto" : "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"}`}
    >
      <div>
        <p className="text-[11px] uppercase tracking-[0.32em] text-gold font-medium mb-3">
          MV Luscious Lather
        </p>
        <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] text-charcoal font-medium leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className={`mt-3 text-muted text-base leading-relaxed ${centered ? "" : "max-w-md"}`}>
            {subtitle}
          </p>
        )}
        {centered && (
          <div className="mt-6 flex justify-center gap-2">
            <span className="h-px w-12 bg-gold/60" />
            <span className="h-px w-3 bg-gold" />
            <span className="h-px w-12 bg-gold/60" />
          </div>
        )}
      </div>
      {viewAllHref && !centered && (
        <Link
          href={viewAllHref}
          className="link-underline text-[11px] uppercase tracking-[0.28em] text-charcoal-soft hover:text-gold shrink-0 self-start sm:self-auto"
        >
          View collection
        </Link>
      )}
      {viewAllHref && centered && (
        <Link
          href={viewAllHref}
          className="inline-block mt-8 link-underline text-[11px] uppercase tracking-[0.28em] text-charcoal-soft hover:text-gold"
        >
          View collection
        </Link>
      )}
    </div>
  );
}
