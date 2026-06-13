import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aureva-resort.vercel.app"),
  title: "AUREVA — Luxury Villas & Resort",
  description: "A Sanctuary of the Senses. Discover your private haven where untouched natural beauty meets unparalleled, mindful luxury.",
  icons: {
    icon: "/images/aureva-logo-mark.webp",
    shortcut: "/images/aureva-logo-mark.webp",
    apple: "/images/aureva-logo-mark.webp",
  },
  openGraph: {
    title: "AUREVA — Luxury Villas & Resort",
    description: "A Sanctuary of the Senses. Discover your private haven where untouched natural beauty meets unparalleled, mindful luxury.",
    url: "https://aureva-resort.vercel.app",
    siteName: "AUREVA Resort",
    images: [
      {
        url: "/images/hero-bg.webp",
        width: 1200,
        height: 630,
        alt: "AUREVA Luxury Villas & Resort",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AUREVA — Luxury Villas & Resort",
    description: "A Sanctuary of the Senses. Discover your private haven where untouched natural beauty meets unparalleled, mindful luxury.",
    images: ["/images/hero-bg.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-950 text-stone-100">{children}</body>
    </html>
  );
}

