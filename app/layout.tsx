import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"
import { PageTransition } from "@/components/page-transition"
import { NavigationTransition } from "@/components/navigation-transition"
import ChatbotWidget from "@/components/chatbot-widget"
import { Toaster } from "@/components/ui/sonner"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Dancing_Script, Caveat } from "next/font/google"

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
})

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "xo-link - AI Automation for Enterprise",
  description:
    "Transform your business with intelligent AI automation solutions. Empower your organization to operate at the speed of thought.",
  metadataBase: new URL("https://xo-link.com"),
  alternates: {
    canonical: "/",
  },
  generator: "v0.app",
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://xo-link.com/",
    siteName: "xo-link",
    title: "xo-link - AI Automation for Enterprise",
    description:
      "Transform your business with intelligent AI automation solutions. Empower your organization to operate at the speed of thought.",
  },
  twitter: {
    card: "summary_large_image",
    title: "xo-link - AI Automation for Enterprise",
    description:
      "Transform your business with intelligent AI automation solutions. Empower your organization to operate at the speed of thought.",
  },
  icons: {
    icon: "/icon.svg",
  },
  other: {
    'theme-color': '#000000',
    'color-scheme': 'dark',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent'
  }
}

export const viewport = "width=device-width, initial-scale=1"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased ${dancingScript.variable} ${caveat.variable}`}>
        <Suspense fallback={null}>
          <NavigationTransition />
          <PageTransition>{children}</PageTransition>
        </Suspense>
        <ChatbotWidget />
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  )
}
