import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/content/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/layout/Analytics";
import { StructuredData } from "@/components/layout/StructuredData";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { PageTransition } from "@/components/motion/PageTransition";
import { websiteSchema } from "@/lib/structured-data";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}.in`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: "Sommay Khanna" }, { name: "Ramansh Khanna" }],
  creator: "Sommay Khanna",
  keywords: [
    "SRbros",
    "srbros.in",
    "Sommay Khanna",
    "Ramansh Khanna",
    "young innovators India",
    "student robotics portfolio",
    "disaster management robot",
    "AI automation",
    "IIT Bombay robotics championship",
  ],
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: "/og", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05060a" },
    { media: "(prefers-color-scheme: light)", color: "#f7f8fc" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/**
 * Applied before first paint so a saved light-theme preference never flashes
 * dark. Kept deliberately tiny and inline.
 */
const themeScript = `(function(){try{var t=localStorage.getItem('srbros-theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" suppressHydrationWarning className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-svh antialiased">
        <StructuredData data={websiteSchema()} />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-5 focus:py-2.5 focus:font-display focus:text-sm focus:text-void"
        >
          Skip to content
        </a>

        <CursorGlow />
        <Navbar />

        <main id="main" className="relative z-10">
          <PageTransition>{children}</PageTransition>
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
