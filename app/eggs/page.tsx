import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { SiteHeader, SiteFooter } from "@/components/site/chrome"

export const metadata: Metadata = {
  title: "Faberland Estates — Own a world, not a storefront",
  description: "A Faberland Estate is a private world under your own brand, connectable from your own website.",
}

const ASSET = "/design/assets"

const EGGS = [
  { file: "egg-bronze.png", name: "Bronze", shell: "Opaque, deep engraving", core: "Core sealed" },
  { file: "egg-obsidian.png", name: "Obsidian", shell: "Black glass, hairline etching", core: "Core sealed" },
  { file: "egg-ocean.png", name: "Ocean", shell: "Blue to green, flowing lines", core: "Core sealed" },
  { file: "egg-ember.png", name: "Ember", shell: "Red to amber, looping relief", core: "Core sealed" },
  { file: "egg-crimson.png", name: "Crimson", shell: "Dark red, fractured surface", core: "Core sealed" },
  { file: "egg-smoke.png", name: "Smoke", shell: "Grey glass, ribbon engraving", core: "Core sealed" },
  { file: "egg-verdant.png", name: "Verdant", shell: "Green glass, gilt roundels", core: "Core lit" },
  { file: "egg-flame.png", name: "Flame", shell: "Smoked glass, gilt arcs", core: "Core lit" },
  { file: "egg-rose.png", name: "Rose", shell: "Pink glass, concentric relief", core: "Core lit" },
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
            margin: "34px 0 0",
            border: "1px solid var(--fl-warn)",
            borderRadius: 10,
            padding: 21,
            display: "flex",
            gap: 13,
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <div className="fl-mono fl-up" style={{ color: "var(--fl-warn)", whiteSpace: "nowrap" }}>
            Ne pas publier
          </div>
          <div className="fl-mono fl-sec" style={{ flex: 1, minWidth: 280 }}>
            Cette page offre des jetons conférant des droits commerciaux et une participation économique. Au Québec,
            c&apos;est du ressort de l&apos;Autorité des marchés financiers. La maquette existe; la page ne se publie
            qu&apos;après l&apos;avis juridique en valeurs mobilières, avec les facteurs de risque rédigés par votre
            conseiller.
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,38.1fr) minmax(0,61.9fr)",
            gap: 55,
            padding: "89px 0 0",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
            <h1 className="fl-h1">Own a world, not a storefront.</h1>
            <p style={{ margin: 0, maxWidth: "68ch", fontSize: 21, lineHeight: "30px" }}>
              A Faberland Estate is a private world under your own brand, connectable directly from your own website.
              Holders pay no monthly rent — only renovation when they want to change it.
            </p>
            <div className="fl-mono fl-ter">
              Chaque œuf est une clé. Le noyau lumineux est le monde qu&apos;il contient.
            </div>
          </div>
          <div
            style={{
              background: "#0A0A09",
              border: "1px solid var(--fl-border)",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <Image
              src={`${ASSET}/egg-hero.png`}
              alt="A Faberland egg, its core lit from within"
              width={1200}
              height={1200}
              style={{ width: "100%", height: "auto", display: "block" }}
              priority
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 34, padding: "144px 0 0" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,38.1fr) minmax(0,61.9fr)",
              gap: 55,
              alignItems: "end",
            }}
          >
            <h2 className="fl-h2">
              Every egg is <span className="fl-gold">one of a kind</span>.
            </h2>
            <p className="fl-sec" style={{ margin: 0, maxWidth: "68ch" }}>
              Shell, engraving and core are generated per egg. These are renders from the current build.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 34 }}>
            {EGGS.map((egg) => (
              <div
                key={egg.name}
                style={{
                  border: "1px solid var(--fl-border)",
                  borderRadius: 10,
                  overflow: "hidden",
                  background: "var(--fl-surface)",
                }}
              >
                <div style={{ aspectRatio: "1/1", background: "#0A0A09", overflow: "hidden", position: "relative" }}>
                  <Image
                    src={`${ASSET}/${egg.file}`}
                    alt={egg.name}
                    fill
                    sizes="280px"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
                <div style={{ padding: 21, display: "flex", flexDirection: "column", gap: 5 }}>
                  <div className="fl-h3" style={{ fontSize: 21, lineHeight: "30px" }}>
                    {egg.name}
                  </div>
                  <div style={{ fontSize: 14, lineHeight: "22px", color: "var(--fl-sec)" }}>{egg.shell}</div>
                  <div className="fl-mono fl-up fl-ter">{egg.core}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="fl-mono fl-ter">
            Les noms de série sont provisoires — à valider ou remplacer par les vôtres.
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,61.9fr) minmax(0,38.1fr)",
            gap: 55,
            padding: "144px 0 0",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#0A0A09",
              border: "1px solid var(--fl-border)",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <Image
              src={`${ASSET}/egg-hatch.png`}
              alt="An egg opening onto its world"
              width={1200}
              height={800}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 21 }}>
            <h2 className="fl-h2">It opens.</h2>
            <p className="fl-sec" style={{ margin: 0, maxWidth: "68ch" }}>
              The shell parts and the core becomes the world you walk into: a flat circular land carrying a commercial
              street, under your own name.
            </p>
            <div className="fl-mono fl-ter">
              Séquence d&apos;ouverture à animer chez Cursor · 610 ms, courbe d&apos;entrée. Aucune animation n&apos;est
              simulée ici.
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 34, padding: "144px 0 0" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,38.1fr) minmax(0,61.9fr)",
              gap: 55,
              alignItems: "end",
            }}
          >
            <h2 className="fl-h2">
              The <span className="fl-gold">terms</span>.
            </h2>
            <p className="fl-sec" style={{ margin: 0, maxWidth: "68ch" }}>
              Fixed issuance, one tranche a year.
            </p>
          </div>
          <div style={{ border: "1px solid var(--fl-border)", borderRadius: 10, overflow: "hidden" }}>
            {(
              [
                ["Total issuance", "7,777", "Fixed"],
                ["This year's tranche", "à fournir", "Released once"],
                ["Price", "ETH à fournir", "Paid in ETH"],
                ["Monthly rent", "None", "Renovation only"],
              ] as const
            ).map(([k, v, note], i, arr) => (
              <div
                key={k}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr) minmax(0,1fr)",
                  gap: 21,
                  padding: "13px 21px",
                  borderBottom: i === arr.length - 1 ? undefined : "1px solid var(--fl-border)",
                }}
              >
                <div>{k}</div>
                <div
                  className="fl-tabular"
                  style={{
                    textAlign: "right",
                    color: v.includes("fournir") ? "var(--fl-warn)" : undefined,
                    fontFamily: v.includes("fournir") ? "var(--font-ibm-plex-mono), monospace" : undefined,
                    fontSize: v.includes("fournir") ? 10 : undefined,
                  }}
                >
                  {v}
                </div>
                <div style={{ textAlign: "right", color: "var(--fl-sec)" }}>{note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 34, padding: "144px 0 89px" }}>
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
