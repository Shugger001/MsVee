import Link from "next/link";
import { type ComponentProps } from "react";

const variants = {
  primary:
    "bg-charcoal text-ivory hover:bg-charcoal-soft border border-charcoal",
  secondary:
    "bg-transparent text-charcoal border border-charcoal/25 hover:border-charcoal hover:bg-charcoal/5",
  gold: "bg-gold text-charcoal hover:bg-gold-light border border-gold",
  ghost: "bg-transparent text-ivory border border-ivory/40 hover:bg-ivory/10",
} as const;

const sizes = {
  sm: "px-6 py-2.5 text-[11px]",
  md: "px-8 py-3.5 text-xs",
  lg: "px-10 py-4 text-xs",
} as const;

type ButtonProps = ComponentProps<"button"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center uppercase tracking-[0.22em] font-medium transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center uppercase tracking-[0.22em] font-medium transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
