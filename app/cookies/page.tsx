import type { Metadata } from "next"
import { SiteHeader, SiteFooter } from "@/components/site/chrome"

export const metadata: Metadata = {
  title: "Cookies — Faberland",
  description: "Cookie use on Faberland.",
}

export default function CookiesPage() {
  return (
    <div className="fl-site">
      <SiteHeader opaque />
      <main className="fl-shell" style={{ padding: "89px 34px 144px", display: "flex", flexDirection: "column", gap: 34, maxWidth: 760 }}>
        <h1 className="fl-h1">Cookies</h1>
        <p className="fl-sec" style={{ margin: 0 }}>
          Faberland uses essential cookies for session and payment flows, plus optional analytics
          via Vercel Analytics. You can block non-essential cookies in your browser.
        </p>
      </main>
      <SiteFooter />
    </div>
  )
}
