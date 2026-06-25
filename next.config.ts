import type { NextConfig } from "next";

// Baseline security response headers applied to every route. A full
// Content-Security-Policy is intentionally left as a follow-up: this app
// ships two inline scripts (JSON-LD + a load listener) and embeds Google
// Maps/Calendar iframes, so a strict CSP needs per-request nonces (middleware)
// to avoid 'unsafe-inline'. These headers cover the high-value, zero-risk wins.
const securityHeaders = [
  // Block MIME-type sniffing.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Don't let other origins frame our pages (clickjacking). This controls who
  // can frame US — it does not affect the Google iframes WE embed.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Send only the origin on cross-site navigations; full URL same-origin.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Force HTTPS for two years, incl. subdomains. Safe once the domain is
  // HTTPS-only (it is, on the production host).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Drop access to powerful features this static site never uses.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Don't advertise the framework/version in responses.
  poweredByHeader: false,
  experimental: {
    // Tree-shake barrel imports from these packages so the client bundle
    // only ships the icons / motion primitives that are actually used.
    // Big mobile-bundle win on routes that only need a handful of icons.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
