import type { NextConfig } from "next";

/**
 * Security headers applied to every route.
 * The CSP is intentionally strict; adjust `script-src` if you add
 * third-party analytics beyond Google Analytics / Microsoft Clarity.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        /**
         * Never let a front-end proxy cache an HTML document.
         *
         * Next.js references content-hashed JS chunks from the HTML. If a
         * cache serves yesterday's HTML after a deploy, it asks for chunk
         * filenames that no longer exist, hydration fails, and the visitor
         * sees "Application error: a client-side exception has occurred".
         *
         * Static assets under /_next/static are excluded — they are immutable
         * and *should* be cached hard.
         */
        source: "/((?!_next/static|_next/image|favicon.ico).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
