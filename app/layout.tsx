import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://valbeta.fun"),
  title: { default: "Val_beta — Building New Loops for Innovation", template: "%s · Val_beta" },
  description: "An independent laboratory exploring product, strategy, and new loop theory.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Val_beta", title: "Val_beta — Building New Loops for Innovation", description: "Ideas are never finished. They evolve through experiments." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}><body><div className="background-grid" aria-hidden="true" /><SiteHeader /><main>{children}</main><SiteFooter /></body></html>;
}
