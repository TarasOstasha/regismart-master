import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Tree-shake barrel imports from these packages so the client bundle
    // only ships the icons / motion primitives that are actually used.
    // Big mobile-bundle win on routes that only need a handful of icons.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
