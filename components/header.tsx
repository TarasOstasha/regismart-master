"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
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

// Quick links under the Services nav item. Anchors exist on /services
// (#how = HowItWorks section, #docs = document checklists).
const servicesMenu = [
  { href: "/services", label: "All services" },
  { href: "/services#how", label: "How it works" },
  { href: "/services#docs", label: "What to bring" },
];

// The blue logo works on both header states now that the hero photo is gone —
// the unscrolled backdrop is the light plate gradient, the scrolled one is the
// white blur bar. (Logo assets themselves unchanged.)
const LOGO_BLUE = "/images/dmv_express_blue_logo-blue.svg";

function Wordmark() {
  return (
    <Link href="/" className="group flex shrink-0 items-center focus-ring rounded-lg">
      <Image
        src={LOGO_BLUE}
        alt="DMV Express RegiSmart LLC"
        width={280}
        height={72}
        priority
        className="h-12 w-auto object-contain sm:h-14"
      />
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // Close the Services dropdown whenever a navigation lands. The header
  // survives client-side route changes, so without this the panel stays
  // open after selecting an item (the clicked link also keeps focus).
  useEffect(() => {
    setServicesOpen(false);
  }, [pathname]);

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
        // lg+ clears the plate-frame bezel and reserves the mounting-hole
        // band above the nav row (mockup: holes at ~27% width, between bezel
        // and nav). Below lg there is no frame, so no offset.
        "fixed inset-x-0 top-0 z-50 lg:pt-12 transition-all duration-300",
        scrolled
          ? "border-b border-plate-sky/40 bg-plate-white/75 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Wordmark />

        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => {
            const linkClass = cn(
              "rounded-full px-4 py-2 text-[15px] font-medium transition-colors focus-ring",
              isActive(item.href)
                ? "bg-white font-semibold text-ink shadow-[0_1px_4px_rgba(31,48,124,0.16)] ring-1 ring-inset ring-plate-sky/40"
                : "text-ink/85 hover:bg-white/70 hover:text-ink",
            );
            if (item.href !== "/services") {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={linkClass}
                >
                  {item.label}
                </Link>
              );
            }
            // Services dropdown: state-driven open/close (hover via
            // mouseenter/leave, keyboard via focus-within classes). Items
            // close + blur on click so the panel can't stay stuck open
            // across a client-side navigation.
            return (
              <div
                key={item.href}
                className="group relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  aria-expanded={servicesOpen}
                  aria-haspopup="menu"
                  onClick={(e) => {
                    setServicesOpen(false);
                    e.currentTarget.blur();
                  }}
                  className={cn(linkClass, "inline-flex items-center gap-1")}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 opacity-70 transition-transform duration-200",
                      servicesOpen && "rotate-180",
                    )}
                    aria-hidden="true"
                  />
                </Link>
                <div
                  className={cn(
                    "absolute left-1/2 top-full -translate-x-1/2 pt-2 transition-all duration-150",
                    "group-focus-within:visible group-focus-within:opacity-100",
                    servicesOpen ? "visible opacity-100" : "invisible opacity-0",
                  )}
                >
                  <div className="w-56 rounded-2xl bg-white p-1.5 shadow-[0_18px_40px_-18px_rgba(31,48,124,0.4)] ring-1 ring-inset ring-plate-sky/40">
                    {servicesMenu.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={(e) => {
                          setServicesOpen(false);
                          e.currentTarget.blur();
                        }}
                        className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink/85 transition-colors hover:bg-surface hover:text-ink"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
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

      {/* mobile menu — grid-rows 0fr↔1fr animates to the content's natural
          height (no max-height overshoot/dead-period) and is compositor-light,
          so it stays smooth on mobile. */}
      <div
        className={cn(
          "lg:hidden grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden border-b border-plate-sky/40 bg-plate-white">
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
          </div>
        </div>
      </div>
    </header>
  );
}
