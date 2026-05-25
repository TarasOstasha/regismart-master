import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "gradient";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 focus-ring disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-bg hover:bg-plate-navy shadow-soft hover:shadow-[0_18px_40px_-18px_rgba(31,48,124,0.6)]",
  secondary:
    "bg-bg text-ink ring-1 ring-inset ring-plate-sky/70 hover:ring-plate-blue hover:bg-surface",
  ghost: "text-ink/80 hover:text-ink hover:bg-surface",
  gradient:
    "text-bg bg-plate-gradient-h shadow-soft hover:shadow-[0_18px_40px_-18px_rgba(31,48,124,0.7)] hover:brightness-[1.05]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & CommonProps;
type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & CommonProps & { href: string };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, ...rest }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    />
  ),
);
Button.displayName = "Button";

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  ...rest
}: LinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  // Internal hrefs (start with "/" but not "//") route through Next.js Link
  // so navigation stays client-side. tel:, mailto:, and external URLs stay as <a>.
  const isInternal = href.startsWith("/") && !href.startsWith("//");
  if (isInternal) {
    return <Link href={href} className={classes} {...rest} />;
  }
  return <a href={href} className={classes} {...rest} />;
}
