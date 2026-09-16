import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { SiteHeader, SiteFooter } from "@/components/site/chrome"

export const metadata: Metadata = {
  title: "Company — Visser Studio Inc. · Faberland",
  description: "A Montreal technology company building Faberland, a 3D commercial city in virtual reality.",
}

const TEAM = [
  {
    name: "Sylla Guillaume Mugabo",
    role: "President & CTO",
    bio: "Platform architecture, 3D production, the Vitruvian measurement system.",
    handle: "Djoek47",
  },
  {
    name: "Vincent Trudel Akotehin",
    role: "Secretary & COO",
    bio: "Corporate administration, business development, communications.",
    handle: "Jolipoulet",
  },
  {
    name: "Cisse Mugabo",
    role: "\u00a0",
    bio: "Financial strategy and planning.",
    handle: "Cizur",
  },
]

export default function CompanyPage() {
  return (
    <div className="fl-site">
      <div className="fl-shell">
        <SiteHeader opaque />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,61.9fr) minmax(0,38.1fr)",
            gap: 55,
            padding: "89px 0 144px",
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
            <h1 className="fl-h1">Visser Studio Inc.</h1>
            <p style={{ margin: 0, maxWidth: "68ch", fontSize: 21, lineHeight: "30px" }}>
              A Montreal technology company. We build Faberland, a 3D commercial city where merchants sell to visitors
              in virtual reality. Development began in May 2023 and was funded entirely by the founders.
            </p>
          </div>
          <div
            style={{
              border: "1px solid var(--fl-border)",
              borderRadius: 10,
              padding: 34,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 21,
            }}
          >
            <Image
              src="/images/visser-studios-logo.png"
              alt="Visser Studio"
              width={160}
              height={68}
              style={{ height: 68, width: "auto", objectFit: "contain" }}
            />
            <div className="fl-mono" style={{ color: "var(--fl-sec)" }}>
              VISSER STUDIO INC.
              <div>NEQ 1180646979</div>
              <div>1815–3440 rue Durocher</div>
              <div>Montréal (Québec) H2X 2E2</div>
              <div style={{ paddingTop: 8, color: "var(--fl-ter)" }}>Incorporated 21 February 2025</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 34, paddingBottom: 144 }}>
          <h2 className="fl-h2">
            The <span className="fl-gold">team</span>.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 34 }}>
            {TEAM.map((m) => (
              <div
                key={m.name}
                style={{
                  borderTop: "1px solid var(--fl-border-strong)",
                  paddingTop: 21,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div className="fl-h3">{m.name}</div>
                <div style={{ fontSize: 14 }}>{m.role}</div>
                <div className="fl-sec">{m.bio}</div>
                <div className="fl-mono fl-ter" style={{ paddingTop: 5 }}>
                  {m.handle}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,38.1fr) minmax(0,61.9fr)",
            gap: 55,
            paddingBottom: 144,
            alignItems: "start",
          }}
        >
          <h2 className="fl-h2">Contact</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 21 }}>
            <div
              style={{
                borderTop: "1px solid var(--fl-border-strong)",
                paddingTop: 21,
                display: "flex",
                justifyContent: "space-between",
                gap: 21,
                flexWrap: "wrap",
              }}
            >
              <div className="fl-sec">Merchants and leasing</div>
              <div className="fl-mono" style={{ color: "var(--fl-warn)" }}>
                adresse à fournir
              </div>
            </div>
            <div
              style={{
                borderTop: "1px solid var(--fl-border-strong)",
                paddingTop: 21,
                display: "flex",
                justifyContent: "space-between",
                gap: 21,
                flexWrap: "wrap",
              }}
            >
              <div className="fl-sec">Financing and partnerships</div>
              <div className="fl-mono" style={{ color: "var(--fl-warn)" }}>
                adresse à fournir
              </div>
            </div>
            <div
              style={{
                borderTop: "1px solid var(--fl-border-strong)",
                paddingTop: 21,
                display: "flex",
                justifyContent: "space-between",
                gap: 21,
                flexWrap: "wrap",
              }}
            >
              <div className="fl-sec">Legal</div>
              <div style={{ display: "flex", gap: 21, fontSize: 14 }}>
                <Link href="/terms" style={{ color: "var(--fl-ink)" }}>
                  Terms
                </Link>
                <Link href="/privacy" style={{ color: "var(--fl-ink)" }}>
                  Privacy
                </Link>
              </div>
            </div>
            <div className="fl-mono fl-ter">
              Aucun lien mort. Les adresses et les pages légales sont à fournir avant publication.
            </div>
          </div>
        </div>

        <SiteFooter />
      </div>
    </div>
  )
}
