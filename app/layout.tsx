import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClientLayout } from "@/components/providers/client-layout"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Faberland - The Ultimate Metaverse Experience",
  description: "Experience a new dimension of reality where digital and physical worlds converge.",
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
