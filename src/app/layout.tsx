import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/layout/topbar";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ProgressIndicatorProvider } from "@/components/ui/progress-indicator";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NinjaOne - Device Management System",
  description: "NinjaOne React Coding Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <NuqsAdapter>
          <ProgressIndicatorProvider>
            <Topbar />
            {children}
            <Toaster />
          </ProgressIndicatorProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
