import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Dooyt — All-in-one ERP for growing businesses";
const description =
  "Dooyt is an easy-to-use ERP that helps businesses manage projects, clients, finance, HR, and inventory in one fast, simple platform.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["ERP", "Dooyt", "business management", "CRM", "HRMS", "accounting"],
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Dooyt",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
