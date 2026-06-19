import type { Metadata } from "next";
import Script from "next/script";
import { M_PLUS_Rounded_1c } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const roundedFont = M_PLUS_Rounded_1c({
  weight: ["800", "900"],
  subsets: ["latin"],
  variable: "--font-rounded",
  display: "swap",
  preload: false,
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "ツムツム完売マスター",
    template: "%s｜ツムツム完売マスター",
  },
  description:
    "LINE Disney ツムツムのプレミアムBOX＋・プレミアムBOX・ハピネスBOXの完売進捗を簡単に管理できる無料ツール。データはブラウザに保存されます。",
  openGraph: {
    title: "ツムツム完売マスター",
    description:
      "プレミアムBOX＋・プレミアムBOX・ハピネスBOXの完売進捗をブラウザだけで管理。",
    type: "website",
    locale: "ja_JP",
    url: SITE,
    siteName: "ツムツム完売マスター",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ツムツム完売マスター｜完売進捗・必要コイン/メダル数を自動算出",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ツムツム完売マスター",
    description:
      "プレミアムBOX＋・プレミアムBOX・ハピネスBOXの完売進捗をブラウザだけで管理。",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  other: ADSENSE_CLIENT
    ? { "google-adsense-account": ADSENSE_CLIENT }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`h-full antialiased ${roundedFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "ツムツム完売マスター",
              url: SITE,
            }),
          }}
        />
        {ADSENSE_CLIENT && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-6">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
