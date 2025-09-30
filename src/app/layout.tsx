import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Rendering Demo",
  description: "Demonstrating SSR, SSG, ISR, and CSR in Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-3 px-4">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Next.js Rendering
            </Link>
            <nav className="flex flex-wrap items-center gap-1">
              <Button variant="ghost" asChild className="text-foreground/80 hover:text-foreground hover:bg-accent text-sm h-8 px-2">
                <Link href="/">Home</Link>
              </Button>
              <Button variant="ghost" asChild className="text-foreground/80 hover:text-foreground hover:bg-accent text-sm h-8 px-2">
                <Link href="/posts">SSR</Link>
              </Button>
              <Button variant="ghost" asChild className="text-foreground/80 hover:text-foreground hover:bg-accent text-sm h-8 px-2">
                <Link href="/posts/isr">ISR</Link>
              </Button>
              <Button variant="ghost" asChild className="text-foreground/80 hover:text-foreground hover:bg-accent text-sm h-8 px-2">
                <Link href="/posts/csr">CSR</Link>
              </Button>
              <Button variant="ghost" asChild className="text-foreground/80 hover:text-foreground hover:bg-accent text-sm h-8 px-2">
                <Link href="/posts/create">Create</Link>
              </Button>
            </nav>
          </div>
        </header>
        <main className="flex-1 container py-4 md:py-6 mx-auto">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}