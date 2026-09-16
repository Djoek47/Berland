import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader, SiteFooter } from "@/components/site/chrome"

export const metadata: Metadata = {
  title: "Showcase — What it looks like · Faberland",
  description: "Captures from the Quest build. No renders, no marketing images.",
}

const SHOTS = [
  {
    label: "VIDÉO RÉSERVÉE — SESSION À QUATRE JOUEURS",
    note: "si vous en avez une capture · sinon cette place reste vide, pas remplie",
    caption: "Four visitors in the same session, unlimited parallel sessions.",
  },
  {
    label: "PLACE POUR UNE CAPTURE",
    note: "panneaux de tiers à retirer du build",
    caption: "A street in the Market District, seen from the walkway.",
  },
  {
    label: "PLACE POUR UNE CAPTURE",
    note: "capture nette · HUD à recadrer",
    caption: "Inside a store. Shelving, lighting and stock are the merchant's own fit-out.",
  },
  {
    label: "PLACE POUR UNE CAPTURE",
    note: "intérieur d'une deuxième boutique",
    caption: "Rooftops and signage above the Central District.",
  },
  {
    label: "PLACE POUR UNE CAPTURE",
    note: "Trois à cinq captures suffisent. Mieux vaut une place vide qu'une image de remplissage.",
    caption: "The walkway that runs between districts.",
  },
]

export default function ShowcasePage() {
  return (
    <div className="fl-site">
      <div className="fl-shell">
        <SiteHeader opaque />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,61.9fr) minmax(0,38.1fr)",
            gap: 55,
            padding: "89px 0 89px",
            alignItems: "end",
          }}
        >
          <h1 className="fl-h1">What it looks like.</h1>
          <p className="fl-sec" style={{ margin: 0, maxWidth: "68ch" }}>
            Captures from the Quest build. No renders, no marketing images.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 55, paddingBottom: 144 }}>
          {SHOTS.map((shot) => (
            <div key={shot.caption} style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <div
                className="fl-mono fl-ter"
                style={{
                  aspectRatio: "16/9",
                  background: "var(--fl-bg)",
                  border: "1px dashed var(--fl-border-strong)",
                  borderRadius: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  textAlign: "center",
                  padding: 21,
                }}
              >
                <div>{shot.label}</div>
                <div>{shot.note}</div>
              </div>
              <div className="fl-sec">{shot.caption}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 21, flexWrap: "wrap", paddingBottom: 89 }}>
          <Link href="/map" className="fl-btn fl-btn-primary">
            See available spaces
          </Link>
          <Link href="/get-started" className="fl-btn">
            Get started on Quest
          </Link>
        </div>

        <SiteFooter />
      </div>
    </div>
  )
}
