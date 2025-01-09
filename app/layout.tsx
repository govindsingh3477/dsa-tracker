import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import NextTopLoader from "nextjs-toploader";
import { SpeedInsights } from '@vercel/speed-insights/next';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DSA Tracker",
description: "Effortlessly track your progress in Data Structures and Algorithms with the DSA Tracker App. Organize, monitor, and achieve your goals efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextTopLoader color="#2E78C7" height={2} />
        <Providers>
        {children}
        <SpeedInsights />
        </Providers>
        
      </body>
      
    </html>
  );
}
