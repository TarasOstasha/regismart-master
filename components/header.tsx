"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { cn, PHONE_DISPLAY, PHONE_HREF } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/fees", label: "Fees" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const LOGO_WHITE = "/images/dmv-express-regismart-logo-white.svg";
const LOGO_BLUE = "/images/dmv_express_blue_logo-blue.svg";

function Wordmark({ scrolled }: { scrolled: boolean }) {
  return (
    <Link href="/" className="group flex shrink-0 items-center focus-ring rounded-lg">
      <Image
        src={scrolled ? LOGO_BLUE : LOGO_WHITE}
        alt="DMV Express RegiSmart LLC"
        width={280}
        height={72}
        priority
        className="h-12 w-auto object-contain transition-opacity duration-300 sm:h-14"
      />
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the mobile menu is open. The viewport scrolls
  // at the <html> level (Lenis is off on touch), so body overflow alone doesn't
  // hold it — lock documentElement too, and restore prior inline values.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, [open]);

  return (
    <header
      id="top"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-plate-sky/40 bg-plate-white/75 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Wordmark scrolled={scrolled} />

        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-[15px] font-medium transition-colors focus-ring",
                isActive(item.href)
                  ? "bg-surface font-semibold text-ink"
                  : "text-ink/85 hover:text-ink hover:bg-surface",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href={PHONE_HREF}
            variant="plate"
            size="md"
            className="hidden sm:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </ButtonLink>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden -mr-2 grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-surface focus-ring"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-y-auto border-b border-plate-sky/40 bg-plate-white/90 backdrop-blur-md transition-[max-height] duration-300",
          open ? "max-h-[calc(100dvh-4rem)]" : "max-h-0 overflow-hidden",
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-3 text-base focus-ring",
                isActive(item.href)
                  ? "bg-surface font-semibold text-ink"
                  : "text-ink hover:bg-surface",
              )}
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink
            href={PHONE_HREF}
            variant="plate"
            size="lg"
            className="mt-3"
          >
            <Phone className="h-4 w-4" />
            Call {PHONE_DISPLAY}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
