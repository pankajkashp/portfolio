import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers/AppProviders";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-background text-foreground">
        <AppProviders>
          <Navbar />
          {children}
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
