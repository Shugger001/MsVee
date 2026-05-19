export function ContentPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <h1 className="font-display text-4xl md:text-5xl text-espresso font-medium mb-8">
        {title}
      </h1>
      <div className="space-y-6 text-espresso-light leading-relaxed text-lg">{children}</div>
    </div>
  );
}
