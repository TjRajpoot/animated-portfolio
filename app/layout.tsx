import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tanuj Singh | Full Stack Developer",
  description:
    "Full Stack Developer specializing in React, Next.js, and modern design systems. Building responsive, production-ready applications with a focus on performance and user experience.",
  keywords: [
    "Tanuj Singh",
    "Full Stack Developer",
    "React",
    "Next.js",
    "MERN Stack",
    "Web Developer",
    "Portfolio",
  ],
  openGraph: {
    title: "Tanuj Singh | Full Stack Developer",
    description:
      "Full Stack Developer building responsive, production-ready web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
