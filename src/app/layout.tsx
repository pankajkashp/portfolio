import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import "./globals.css";
import { AppProviders } from "@/providers/AppProviders";

export const metadata: Metadata = {
  title: "Pankaj Kashap | AI Engineer & Creative Developer",
  description: "Portfolio of Pankaj Kashap — AI Engineer, Full Stack Developer, and Creative Technologist building intelligent digital experiences.",
  openGraph: {
    title: "Pankaj Kashap | AI Engineer & Creative Developer",
    description: "Building immersive digital experiences with AI, creativity, and modern web technologies.",
    url: "https://pankajkashap.dev",
    siteName: "Pankaj Kashap",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pankaj Kashap | AI Engineer",
    description: "Building immersive digital experiences with AI, creativity, and modern web technologies.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased dark"
      style={
        {
          '--font-geist-sans': 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI"',
          '--font-geist-mono': 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono"',
        } as CSSProperties
      }
    >
      <body className="min-h-full bg-background text-foreground">
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
