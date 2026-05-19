import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <h1 className="font-display text-5xl text-espresso mb-4">404</h1>
      <p className="text-espresso-light mb-8">This page could not be found.</p>
      <Link
        href="/"
        className="inline-block px-8 py-3 bg-plum text-cream uppercase tracking-widest text-sm hover:bg-plum-light transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}
