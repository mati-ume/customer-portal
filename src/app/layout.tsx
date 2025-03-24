import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: "Next Supa Shad Boilerplate",
  description: "A boilerplate for Next.js with Supabase and Shadcn/UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.className} antialiased`}>
        {children}
        
        <Toaster />
      </body>
    </html>
  );
}
