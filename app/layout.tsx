import type { Metadata } from "next";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import { Nav }    from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

/* ── Fonts ────────────────────────────────────────────────────────────────── */
const syne = Syne({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-mono",
  display: "swap",
});

/* ── Metadata ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "NoOps Studios — Premium Tech Agency",
    template: "%s | NoOps Studios",
  },
  description:
    "NoOps Studios automates your DevOps, cloud, and AI pipelines so your team ships faster without the overhead.",
  keywords: ["DevOps", "CI/CD", "Cloud Infrastructure", "AI Automation", "Next.js", "Tech Agency"],
  authors: [{ name: "NoOps Studios", url: "https://noops.studio" }],
  creator: "NoOps Studios",
  metadataBase: new URL("https://noops.studio"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://noops.studio",
    siteName: "NoOps Studios",
    title: "NoOps Studios — Premium Tech Agency",
    description: "We automate what slows you down. Enterprise DevOps, cloud, and AI pipelines.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoOps Studios — Premium Tech Agency",
    description: "We automate what slows you down.",
    creator: "@noopsstudios",
  },
  robots: { index: true, follow: true },
};

/* ── Root Layout ──────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body
        style={{ fontFamily: "var(--font-dm-sans)" }}
        className="bg-[#070910] text-[#f1f5f9] antialiased"
      >
        {/* Accessibility: skip to main */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
                     focus:z-[1000] focus:px-4 focus:py-2 focus:bg-[#4f7dff]
                     focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>

        <Nav />

        <main id="main-content">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
