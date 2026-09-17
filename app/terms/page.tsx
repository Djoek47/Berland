import type { Metadata } from "next"
import { SiteHeader, SiteFooter } from "@/components/site/chrome"

export const metadata: Metadata = {
  title: "Terms — Faberland",
  description: "Terms of use for Faberland.",
}

export default function TermsPage() {
  return (
    <div className="fl-site">
      <SiteHeader opaque />
      <main className="fl-shell" style={{ padding: "89px 34px 144px", display: "flex", flexDirection: "column", gap: 34, maxWidth: 760 }}>
        <h1 className="fl-h1">Terms</h1>
        <p className="fl-sec" style={{ margin: 0 }}>
          By using Faberland you agree to rent spaces under the published prices and terms shown at
          checkout. Spaces remain the property of Visser Studio Inc.; rentals grant usage rights for
          the selected term.
        </p>
        <p className="fl-sec" style={{ margin: 0 }}>
          Full legal pages will replace this summary before public launch.
        </p>
      </main>
      <SiteFooter />
    </div>
  )
}
