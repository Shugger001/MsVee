import Link from "next/link";

export function SectionHeading({
  title,
  viewAllHref,
}: {
  title: string;
  viewAllHref?: string;
}) {
  return (
    <div className="flex items-end justify-between mb-10 md:mb-14">
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-espresso font-medium">
        {title}
      </h2>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-sm uppercase tracking-widest text-plum hover:text-plum-light border-b border-plum/30 pb-0.5 transition-colors"
        >
          View all
        </Link>
      )}
    </div>
  );
}
