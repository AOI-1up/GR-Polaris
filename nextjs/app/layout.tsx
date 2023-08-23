"use client";
import { Inter } from "next/font/google";
import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider } from "@material-tailwind/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <JotaiProvider>
        <ThemeProvider>
          <body className={inter.className}>{children}</body>
        </ThemeProvider>
      </JotaiProvider>
    </html>
  );
}
