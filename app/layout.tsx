import type { Metadata } from "next"
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import "@/styles/faberland-tokens.css"
import { ClientLayout } from "@/components/providers/client-layout"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
})

export const metadata: Metadata = {
  title: "Faberland — Your storefront in a city that never closes",
  description:
    "Faberland is a 3D commercial district where customers walk in, look at your products from every angle, try them on at their real size, and buy. From $53 a month.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
