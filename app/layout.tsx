"use client";

import { ThemeProvider } from "@/components/theme-provider"
import { PostHogProvider } from "@/components/posthog-provider"
import { Analytics } from "@vercel/analytics/react"
import { GeistSans } from 'geist/font/sans';
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <PostHogProvider>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
          </ThemeProvider>
        </PostHogProvider>
        <Analytics />
      </body>
    </html>
  );
}
