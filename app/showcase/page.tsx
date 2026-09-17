import type { Metadata } from "next"
import Link from "next/link"
import { BrandMark } from "@/components/site/brand"
import { SiteHeader, SiteFooter } from "@/components/site/chrome"

export const metadata: Metadata = {
  title: "Showcase — What it looks like · Faberland",
  description: "Captures from the Quest build. No renders, no marketing images.",
}

const ASSET = "/design/assets"

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
            padding: "89px 0 55px",
            alignItems: "end",
          }}
        >
          <h1 className="fl-h1">What it looks like.</h1>
          <p className="fl-sec" style={{ margin: 0, maxWidth: "68ch" }}>
            Captures from the Quest build. No renders, no marketing images.
          </p>
        </div>
      </div>

      <div className="fl-shell" style={{ paddingBottom: 21 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
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
              gap: 13,
              textAlign: "center",
              padding: 34,
            }}
          >
            <BrandMark size={55} />
            <div>
              VIDÉO RÉSERVÉE — SESSION À QUATRE JOUEURS
              <br />
              si vous en avez une capture · sinon cette place reste vide, pas remplie
            </div>
          </div>
          <div style={{ fontSize: 14, color: "var(--fl-sec)" }}>
            Four visitors in the same session, unlimited parallel sessions.
          </div>
        </div>
      </div>

      <div style={{ padding: "144px 0 0", display: "flex", flexDirection: "column", gap: 89 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          <div
            style={{
              height: 610,
              backgroundColor: "var(--fl-surface)",
              backgroundImage: `url(${ASSET}/shot-street-1.png)`,
              backgroundSize: "cover",
              backgroundPosition: "0% 100%",
            }}
          />
          <div
            className="fl-shell"
            style={{ display: "flex", justifyContent: "space-between", gap: 21, flexWrap: "wrap", width: "100%" }}
          >
            <div style={{ fontSize: 14 }}>A street in the Market District, seen from the walkway.</div>
            <div className="fl-mono" style={{ color: "var(--fl-warn)" }}>
              panneaux de tiers à retirer du build
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          <div
            style={{
              height: 610,
              backgroundColor: "var(--fl-surface)",
              backgroundImage: `url(${ASSET}/shot-interior.png)`,
              backgroundSize: "cover",
              backgroundPosition: "0% 100%",
            }}
          />
          <div
            className="fl-shell"
            style={{ display: "flex", justifyContent: "space-between", gap: 21, flexWrap: "wrap", width: "100%" }}
          >
            <div style={{ fontSize: 14 }}>
              Inside a store. Shelving, lighting and stock are the merchant&apos;s own fit-out.
            </div>
            <div className="fl-mono fl-ter">capture nette · HUD à recadrer</div>
          </div>
        </div>

        <div
          className="fl-shell"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 34,
            width: "100%",
            paddingBottom: 0,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            <div
              style={{
                aspectRatio: "13/8",
                borderRadius: 10,
                backgroundColor: "var(--fl-surface)",
                backgroundImage: `url(${ASSET}/shot-street-2.png)`,
                backgroundSize: "145% auto",
                backgroundPosition: "0% 100%",
                backgroundRepeat: "no-repeat",
                border: "1px solid var(--fl-border)",
              }}
            />
            <div className="fl-sec" style={{ fontSize: 14 }}>
              Rooftops and signage above the Central District.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            <div
              style={{
                aspectRatio: "13/8",
                borderRadius: 10,
                backgroundColor: "var(--fl-surface)",
                backgroundImage: `url(${ASSET}/shot-street-3.png)`,
                backgroundSize: "145% auto",
                backgroundPosition: "0% 100%",
                backgroundRepeat: "no-repeat",
                border: "1px solid var(--fl-border)",
              }}
            />
            <div className="fl-sec" style={{ fontSize: 14 }}>
              The walkway that runs between districts.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            <div
              className="fl-mono fl-ter"
              style={{
                aspectRatio: "13/8",
                background: "var(--fl-bg)",
                border: "1px dashed var(--fl-border-strong)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: 13,
              }}
            >
              PLACE POUR UNE CAPTURE
              <br />
              intérieur d&apos;une deuxième boutique
            </div>
            <div className="fl-mono fl-ter">
              Trois à cinq captures suffisent. Mieux vaut une place vide qu&apos;une image de remplissage.
            </div>
          </div>
        </div>
      </div>

      <div className="fl-shell">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,38.1fr) minmax(0,61.9fr)",
            gap: 55,
            alignItems: "end",
            borderTop: "1px solid var(--fl-border)",
            paddingTop: 55,
            marginTop: 89,
          }}
        >
          <h2 className="fl-h2">
            Pick a <span className="fl-gold">space</span>.
          </h2>
          <div style={{ display: "flex", gap: 21, alignItems: "center", flexWrap: "wrap", paddingBottom: 8 }}>
            <Link href="/map" className="fl-btn fl-btn-primary">
              See available spaces
            </Link>
            <Link href="/get-started" className="fl-btn">
              Get started on Quest
            </Link>
          </div>
        </div>

        <SiteFooter />
      </div>
    </div>
  )
}
