import type { Metadata } from "next";
import { Manrope, Pixelify_Sans, Geist } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import "./footer.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const displayFont = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: "SNAB Innovations",
  description:
    "AI-enabled product development, app development, website development, desktop software, and agent workflow consulting.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={cn(bodyFont.variable, displayFont.variable, "font-sans", geist.variable)}>
      <body>{children}</body>
    </html>
  );
}
