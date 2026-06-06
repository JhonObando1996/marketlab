import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Header } from "@/components/marketlab/header";
import { ThemeProvider } from "@/components/marketlab/theme-provider";
import { THEME_STORAGE_KEY } from "@/lib/theme";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MarketLab",
  description: "Fake-money prediction markets for a Cursor workshop.",
  icons: {
    icon: "/logo/iso-marketlab.webp",
  },
};

const themeInitScript = `(function(){try{var key=${JSON.stringify(THEME_STORAGE_KEY)};var stored=localStorage.getItem(key);var preference=(stored==='light'||stored==='dark'||stored==='system')?stored:'system';var resolved=preference==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):preference;document.documentElement.classList.toggle('dark',resolved==='dark');document.documentElement.dataset.theme=preference;}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static theme bootstrap script */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
