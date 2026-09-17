import type { Metadata } from "next";
import { Geist } from "next/font/google";

import "./globals.css";

/**
 * Load the Geist font through next/font, which downloads and self-hosts the
 * font files at build time. That avoids a request to Google's servers when
 * someone opens the page, and prevents the flash of unstyled text you get
 * when a webfont arrives late.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Page metadata. Next.js turns this into the <title> and <meta> tags in the
 * document head -- the title is what appears on the browser tab.
 */
export const metadata: Metadata = {
  title: "Lagos Explorer",
  description:
    "An interactive map of 26 notable places across Lagos, Nigeria, filterable by category. Built with Next.js, react-leaflet and OpenStreetMap.",
};

/**
 * RootLayout
 * Wraps every page in the app. It renders the <html> and <body> elements,
 * applies the font, and drops the current page in as `children`.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
