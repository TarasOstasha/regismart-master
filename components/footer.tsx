import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import type { SVGProps } from "react";
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

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-plate-sky/40 pt-16 pb-28 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center focus-ring rounded-lg"
            >
              <Image
                src="/images/regismart-logo.svg"
                alt="DMV Express by RegiSmart LLC"
                width={693}
                height={107}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted leading-relaxed">
              A Connecticut-authorized vehicle registration office. We file
              directly with the CT DMV so you don&rsquo;t have to.
            </p>
            <div className="mt-6 space-y-1 text-sm text-ink/80 break-words">
              <p>{ADDRESS_LINE_1}</p>
              <p>{ADDRESS_LINE_2}</p>
              <p>
                <a href={PHONE_HREF} className="inline-flex min-h-12 items-center hover:text-accent focus-ring rounded-sm">
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
                        className="inline-flex min-h-12 items-center py-1 text-sm text-ink/75 hover:text-ink focus-ring rounded-sm"
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
                href="https://www.facebook.com/share/1LsrcJeyfV/?mibextid=wwXIfr"
                className="inline-flex min-h-12 items-center gap-2 text-ink/80 hover:text-ink focus-ring rounded-sm"
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
                Facebook
              </a>
              <a
                href="https://www.instagram.com/regismart2025?igsh=MXFtd3NqYW83cmU3cw%3D%3D&utm_source=qr"
                className="inline-flex min-h-12 items-center gap-2 text-ink/80 hover:text-ink focus-ring rounded-sm"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@dmv.express.regis"
                className="inline-flex min-h-12 items-center gap-2 text-ink/80 hover:text-ink focus-ring rounded-sm"
              >
                <TikTokIcon className="h-4 w-4" />
                TikTok
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
