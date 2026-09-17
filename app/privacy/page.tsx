import type { Metadata } from "next"
import { SiteHeader, SiteFooter } from "@/components/site/chrome"

export const metadata: Metadata = {
  title: "Privacy — Faberland",
  description: "How Visser Studio Inc. collects and uses data on Faberland.",
}

export default function PrivacyPage() {
  return (
    <div className="fl-site">
      <SiteHeader opaque />
      <main className="fl-shell" style={{ padding: "89px 34px 144px", display: "flex", flexDirection: "column", gap: 34, maxWidth: 760 }}>
        <h1 className="fl-h1">Privacy</h1>
        <p className="fl-sec" style={{ margin: 0 }}>
          Faberland is operated by Visser Studio Inc. We collect only what we need to run rentals,
          payments, and account access — typically email, wallet address, and payment metadata
          processed by Stripe.
        </p>
        <p className="fl-sec" style={{ margin: 0 }}>
          We do not sell personal data. Contact merchants and leasing through the channels listed on
          the Company page when published.
        </p>
      </main>
      <SiteFooter />
    </div>
  )
}
