import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_SC } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetBrainsMono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });
const notoSansSc = Noto_Sans_SC({ variable: "--font-noto-sans-sc", weight: "variable", display: "swap", preload: true });

// Metadata is defined at the root so every static route inherits a consistent publishing identity.
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://valbeta.fun"),
  title: { default: "Val_beta｜创新、产品与未来商业系统实验室", template: "%s · Val_beta" },
  description: "Val_beta 是一个公开的创新、产品、战略与未来商业系统实验室，持续探索新回路理论与系统化产品思维。",
  keywords: ["创新实验室", "产品思维", "产品战略", "新回路理论", "未来商业系统", "系统化创新", "Val_beta"],
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "zh_CN", siteName: "Val_beta", title: "Val_beta｜创新、产品与未来商业系统实验室", description: "一个公开的创新、产品、战略与未来商业系统实验室。" },
  twitter: { card: "summary", title: "Val_beta｜创新、产品与未来商业系统实验室", description: "一个公开的创新、产品、战略与未来商业系统实验室。" },
};

// The shell owns global layers, keyboard navigation, and the shared site chrome.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN" className={`${inter.variable} ${jetBrainsMono.variable} ${notoSansSc.variable}`}><body><a className="skip-link" href="#main-content">Skip to content</a><div className="background-grid" aria-hidden="true" /><div className="background-glow" aria-hidden="true" /><SiteHeader /><main id="main-content">{children}</main><SiteFooter /></body></html>;
}
