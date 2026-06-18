import type { Metadata } from "next";
import Script from "next/script";
import { M_PLUS_Rounded_1c } from "next/font/google";
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
    default: "ツムツム完売マスター｜プレミアムBOX＋・プレミアムBOX・ハピネスBOX",
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
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`h-full antialiased ${roundedFont.variable}`}>
      <head>
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
      </body>
    </html>
  );
}
