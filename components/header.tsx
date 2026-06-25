"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { BOOKING_HREF } from "@/lib/scroll-to-anchor";
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
  { href: "/services#forms", label: "Download forms" },
];

// RegiSmart wordmark (CT silhouette + "Regismart LLC"). Works on both header
// states: the unscrolled backdrop is the light plate gradient, the scrolled
// one is the white blur bar.
const LOGO = "/images/regismart-logo.svg";

function Wordmark() {
  return (
    <Link href="/" className="group flex shrink-0 items-center min-h-12 focus-ring rounded-lg">
      <Image
        src={LOGO}
        alt="DMV Express RegiSmart LLC"
        width={693}
        height={107}
        priority
        className="h-7 w-auto object-contain sm:h-8"
      />
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  // Close menus whenever a navigation lands. The header survives client-side
  // route changes, so without this panels stay open after selecting an item.
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
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
  // hold it - lock documentElement too, and restore prior inline values.
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
        // band above the nav row (holes sit at top-4; lg:pt-16 + lg:h-14).
        "fixed inset-x-0 top-0 z-50 lg:pt-16 transition-all duration-300",
        scrolled || open
          ? "border-b border-plate-sky/40 bg-plate-white/75 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-14 lg:px-8">
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
          <a
            href={PHONE_HREF}
            className="hidden sm:inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-ink shadow-soft transition-shadow hover:shadow-[0_16px_32px_-14px_rgba(31,48,124,0.22)] focus-ring"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-plate-white px-2.5 py-1.5">
              <Phone
                className="h-3.5 w-3.5 -rotate-12 fill-current text-ink"
                strokeWidth={0}
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-ink">
                CT
              </span>
            </span>
            <span className="text-[15px] font-semibold text-ink">
              {PHONE_DISPLAY}
            </span>
          </a>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className={cn(
              "lg:hidden -mr-2 grid h-12 w-12 place-items-center rounded-full text-ink focus-ring transition-colors",
              open
                ? "bg-plate-navy text-white"
                : "hover:bg-surface",
            )}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu — expands below the header bar */}
      <div
        id="mobile-nav"
        className={cn(
          "lg:hidden grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
        inert={!open}
      >
        <div
          className={cn(
            "overflow-hidden bg-plate-white/95 backdrop-blur-md",
            open && "border-b border-plate-sky/40",
          )}
        >
          <div className="mx-auto flex max-w-7xl flex-col px-4 sm:px-6">
            <nav className="py-3" aria-label="Mobile">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  if (item.href !== "/services") {
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          aria-current={
                            isActive(item.href) ? "page" : undefined
                          }
                          className={cn(
                            "flex items-center justify-between rounded-xl px-4 py-3.5 text-[17px] font-medium transition-colors focus-ring",
                            isActive(item.href)
                              ? "bg-surface font-semibold text-plate-navy"
                              : "text-ink/90 active:bg-surface/70",
                          )}
                        >
                          {item.label}
                          <ChevronRight
                            className={cn(
                              "h-4 w-4 shrink-0",
                              isActive(item.href)
                                ? "text-plate-blue"
                                : "text-ink/30",
                            )}
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={item.href}>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        aria-expanded={mobileServicesOpen}
                        aria-controls="mobile-services-submenu"
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-[17px] font-medium transition-colors focus-ring",
                          isActive(item.href)
                            ? "bg-surface font-semibold text-plate-navy"
                            : "text-ink/90 active:bg-surface/70",
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 shrink-0 transition-transform duration-200",
                            mobileServicesOpen
                              ? "rotate-180 text-plate-blue"
                              : "text-ink/30",
                          )}
                          aria-hidden="true"
                        />
                      </button>
                      <div
                        id="mobile-services-submenu"
                        className={cn(
                          "grid transition-[grid-template-rows] duration-200 ease-out",
                          mobileServicesOpen
                            ? "grid-rows-[1fr]"
                            : "grid-rows-[0fr]",
                        )}
                      >
                        <ul className="overflow-hidden">
                          {servicesMenu.map((l) => (
                            <li key={l.href}>
                              <Link
                                href={l.href}
                                onClick={closeMenu}
                                className="ml-4 flex items-center gap-2 border-l-2 border-plate-sky/60 py-2.5 pl-4 pr-2 text-[15px] font-medium text-ink/80 transition-colors hover:text-plate-navy focus-ring rounded-r-lg"
                              >
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="space-y-2.5 border-t border-plate-sky/30 py-4">
              <a
                href={PHONE_HREF}
                onClick={closeMenu}
                className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-full bg-white pl-2 pr-6 text-base text-ink shadow-soft transition-shadow hover:shadow-[0_16px_32px_-14px_rgba(31,48,124,0.22)] focus-ring"
              >
                <span className="inline-flex h-9 items-center gap-1.5 rounded-full bg-plate-white px-2.5">
                  <Phone
                    className="h-3.5 w-3.5 -rotate-12 fill-current text-ink"
                    strokeWidth={0}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-ink">
                    CT
                  </span>
                </span>
                <span className="font-semibold text-ink">Call Us</span>
              </a>
              <ButtonLink
                href="/services#how"
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={closeMenu}
              >
                See what to bring
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink
                href={BOOKING_HREF}
                variant="gradient"
                size="lg"
                className="w-full"
                onClick={closeMenu}
              >
                Book Online
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
