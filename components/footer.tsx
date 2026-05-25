import Link from "next/link";
import { Facebook } from "lucide-react";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "@/lib/utils";

const cols = [
  {
    label: "Services",
    links: [
      { href: "/services", label: "All services" },
      { href: "/services#how", label: "How it works" },
      { href: "/fees", label: "Fees" },
    ],
  },
  {
    label: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-plate-sky/40 pt-16 pb-12 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-9 w-14 place-items-center rounded-md bg-plate-gradient ring-1 ring-white/40 shadow-soft">
                <span className="text-[10px] font-extrabold tracking-widest text-plate-navy">
                  DMV
                </span>
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-bold tracking-tight text-ink">
                  DMV Express
                </span>
                <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                  RegiSmart LLC
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted leading-relaxed">
              A Connecticut-authorized vehicle registration office. We file
              directly with the CT DMV so you don&rsquo;t have to.
            </p>
            <div className="mt-6 space-y-1 text-sm text-ink/80 break-words">
              <p>{ADDRESS_LINE_1}</p>
              <p>{ADDRESS_LINE_2}</p>
              <p>
                <a href={PHONE_HREF} className="hover:text-accent">
                  {PHONE_DISPLAY}
                </a>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:col-span-5 lg:grid-cols-2">
            {cols.map((col) => (
              <div key={col.label}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-plate-blue">
                  {col.label}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-ink/75 hover:text-ink"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-plate-blue">
              Connect
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <a
                href="https://facebook.com"
                className="inline-flex items-center gap-2 text-ink/80 hover:text-ink"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-plate-sky/40 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} RegiSmart LLC. Authorized by the CT
            Department of Motor Vehicles.
          </p>
          <p className="text-xs text-muted">
            We&rsquo;re a private service provider, not the CT DMV.
          </p>
        </div>
      </div>
    </footer>
  );
}
