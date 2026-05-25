"use client";

import { useEffect, useState } from "react";
import { Phone, MapPin } from "lucide-react";
import { cn, PHONE_DISPLAY, PHONE_HREF } from "@/lib/utils";

export function StickyCallCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-3 z-40 lg:hidden transition-all duration-300",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      <div className="flex gap-2 rounded-full bg-ink/95 backdrop-blur-md p-1.5 shadow-[0_18px_40px_-12px_rgba(31,48,124,0.5)] ring-1 ring-white/10">
        <a
          href={PHONE_HREF}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-plate-gradient-h px-4 py-3 text-sm font-semibold text-bg"
        >
          <Phone className="h-4 w-4" />
          Call {PHONE_DISPLAY}
        </a>
        <a
          href="https://maps.google.com/?q=40+Fairfield+Ave+Bridgeport+CT"
          target="_blank"
          rel="noreferrer"
          className="grid h-11 w-11 place-items-center rounded-full bg-bg/10 text-bg"
          aria-label="Get directions"
        >
          <MapPin className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
