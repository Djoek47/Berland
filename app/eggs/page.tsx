import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { SiteHeader, SiteFooter } from "@/components/site/chrome"

export const metadata: Metadata = {
  title: "Faberland Estates — Own a world, not a storefront",
  description: "A Faberland Estate is a private world under your own brand, connectable from your own website.",
}

const EGGS = [
  { src: "/images/faberge-eggs/amber-glow.png", name: "Amber" },
  { src: "/images/faberge-eggs/bronze-glow.png", name: "Bronze" },
  { src: "/images/faberge-eggs/ruby-red.png", name: "Crimson" },
  { src: "/images/faberge-eggs/fire-opal.png", name: "Ember" },
  { src: "/images/faberge-eggs/obsidian-black.png", name: "Obsidian" },
  { src: "/images/faberge-eggs/sapphire-blue.png", name: "Ocean" },
  { src: "/images/faberge-eggs/rose-quartz.jpeg", name: "Rose" },
  { src: "/images/faberge-eggs/copper-solid.png", name: "Smoke" },
  { src: "/images/faberge-eggs/emerald-green.png", name: "Verdant" },
]

const RIGHTS = [
  { title: "An independent world", body: "Separate from the commercial districts." },
  { title: "Your own brand", body: "Named and dressed as you choose." },
  { title: "A direct connection", body: "Visitors enter from your own website." },
  { title: "No monthly rent", body: "You pay only when you renovate." },
]

export default function EggsPage() {
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
          <h1 className="fl-h1">Own a world, not a storefront.</h1>
          <p className="fl-sec" style={{ margin: 0, maxWidth: "68ch" }}>
            A Faberland Estate is a private world under your own brand, connectable directly from your own website.
            Holders pay no monthly rent — only when they renovate.
          </p>
        </div>

        <div className="fl-mono fl-ter" style={{ paddingBottom: 34 }}>
          Chaque œuf est une clé. Le noyau lumineux est le monde qu&apos;il contient.
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 34, paddingBottom: 144 }}>
          <h2 className="fl-h2">
            Every egg is <span className="fl-gold">one of a kind</span>.
          </h2>
          <p className="fl-sec" style={{ margin: 0, maxWidth: "68ch" }}>
            Shell, engraving and core are generated per egg. These are renders from the current build.
          </p>
          <div className="fl-mono fl-ter">Les noms de série sont provisoires — à valider ou remplacer par les vôtres.</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 21 }}>
            {EGGS.map((egg) => (
              <div
                key={egg.name}
                style={{
                  border: "1px solid var(--fl-border)",
                  borderRadius: 10,
                  padding: 21,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 13,
                  background: "var(--fl-surface)",
                }}
              >
                <Image src={egg.src} alt={egg.name} width={120} height={120} style={{ objectFit: "contain" }} />
                <div className="fl-mono fl-up fl-ter">{egg.name}</div>
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
          <h2 className="fl-h2">It opens.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 21 }}>
            <p className="fl-sec" style={{ margin: 0, maxWidth: "68ch" }}>
              The shell parts and the core becomes the world you walk into: a flat circular land carrying a commercial
              street, under your brand.
            </p>
            <div className="fl-mono fl-ter">
              Séquence d&apos;ouverture à animer chez Cursor · 610 ms, courbe d&apos;entrée. Aucune animation n&apos;est
              simulée ici.
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 34, paddingBottom: 144 }}>
          <h2 className="fl-h2">
            The <span className="fl-gold">terms</span>.
          </h2>
          <p className="fl-sec" style={{ margin: 0 }}>
            Fixed issuance, one tranche a year.
          </p>
          <div style={{ border: "1px solid var(--fl-border)", borderRadius: 10, overflow: "hidden" }}>
            {(
              [
                ["Total issuance", "à fournir"],
                ["This year's tranche", "à fournir"],
                ["Released once", "ETH à fournir"],
                ["Paid in ETH", "CAD equivalent as of — , subject to change."],
                ["Monthly rent", "None"],
                ["Renovation only", "When you change the world"],
              ] as const
            ).map(([k, v], i, arr) => (
              <div
                key={k}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
                  gap: 21,
                  padding: "13px 21px",
                  borderBottom: i === arr.length - 1 ? undefined : "1px solid var(--fl-border)",
                }}
              >
                <div>{k}</div>
                <div style={{ color: v.includes("fournir") || v.includes("ETH") ? "var(--fl-warn)" : "var(--fl-sec)" }}>
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 34, paddingBottom: 89 }}>
          <h2 className="fl-h2">What ownership confers.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 34 }}>
            {RIGHTS.map((r) => (
              <div
                key={r.title}
                style={{
                  borderTop: "1px solid var(--fl-border-strong)",
                  paddingTop: 21,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div className="fl-h3">{r.title}</div>
                <div className="fl-sec">{r.body}</div>
              </div>
            ))}
          </div>
          <Link href="/get-started" className="fl-btn fl-btn-primary" style={{ alignSelf: "flex-start" }}>
            Get started
          </Link>
        </div>

        <SiteFooter />
      </div>
    </div>
  )
}
