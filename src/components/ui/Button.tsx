import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-display text-sm font-medium tracking-tight transition-all duration-300 ease-[var(--ease-out-expo)] disabled:pointer-events-none disabled:opacity-50";

const sizes = {
  md: "h-11 px-6",
  lg: "h-13 px-8 text-base",
} as const;

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-void hover:-translate-y-0.5 hover:shadow-[0_18px_45px_-15px_var(--glow)]",
  secondary:
    "glass text-fg hover:-translate-y-0.5 hover:border-electric/40 hover:shadow-[0_18px_45px_-20px_var(--glow)]",
  ghost: "text-fg-muted hover:text-fg",
};

interface ButtonBaseProps {
  variant?: Variant;
  size?: keyof typeof sizes;
  children: ReactNode;
  className?: string;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  ...rest
}: ButtonBaseProps & { href: string; external?: boolean } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >) {
  const classes = cn(base, sizes[size], variants[variant], className);

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonBaseProps & ComponentProps<"button">) {
  return (
    <button
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
