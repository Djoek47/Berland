import Link from "next/link"
import { SiteHeader, SiteFooter } from "@/components/site/chrome"

const STATS = [
  { value: "48", label: "Commercial spaces built and priced" },
  { value: "5", label: "Districts — Market, Business, Arts, Entertainment, Central" },
  { value: "4", label: "Visitors per shared session, unlimited parallel sessions" },
  { value: "Instant", label: "Renovation — change your storefront for a season in minutes" },
]

const STEPS = [
  { n: "01", title: "Pick a space", body: "Choose your district and size. Prices are published." },
  { n: "02", title: "Upload your products", body: "Drop in 3D models, or send us your catalogue." },
  { n: "03", title: "Open your doors", body: "Your store is live. Visitors walk in and browse." },
  { n: "04", title: "Sell", body: "They buy in-world or on your own site. You ship." },
]

const COST_ROWS: [string, string, string][] = [
  ["Monthly rent", "$2,000 – $8,000", "$53 – $95"],
  ["Power and heating", "Yes", "None"],
  ["Cleaning", "Yes", "None"],
  ["In-store staff", "Yes", "Optional"],
  ["Initial build-out", "$10,000 +", "Included"],
  ["Seasonal renovation", "Closure and contractor", "Instant"],
  ["Opening hours", "Limited", "24/7"],
  ["Geographic reach", "The neighbourhood", "The world"],
]

export default function HomePage() {
  return (
    <div className="fl-site">
      <div
        style={{
          position: "relative",
          minHeight: 610,
          backgroundColor: "var(--fl-bg)",
          backgroundImage: "url('/images/stores/store1/1.0.PNG'), linear-gradient(180deg, var(--fl-surface2), var(--fl-bg))",
          backgroundSize: "cover",
          backgroundPosition: "0% 100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SiteHeader />
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            background: "linear-gradient(0deg, var(--fl-bg) 0%, color-mix(in srgb, var(--fl-bg) 93%, transparent) 55%, color-mix(in srgb, var(--fl-bg) 62%, transparent) 100%)",
          }}
        >
          <div
            className="fl-shell"
            style={{
              width: "100%",
              paddingBottom: 89,
              display: "grid",
              gridTemplateColumns: "minmax(0,61.9fr) minmax(0,38.1fr)",
              gap: 55,
              alignItems: "end",
            }}
          >
            <h1 className="fl-h1">Your storefront in a city that never closes.</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
              <p style={{ margin: 0 }}>
                Faberland is a 3D commercial district where customers walk in, look at your products from every
                angle, try them on at their real size, and buy. From $53 a month. No rent, no utilities, no
                build-out.
              </p>
              <div style={{ display: "flex", gap: 21, alignItems: "center", flexWrap: "wrap" }}>
                <Link href="/map" className="fl-btn fl-btn-primary">
                  See available spaces
                </Link>
                <Link href="/showcase" className="fl-btn">
                  What it looks like
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fl-shell">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,minmax(0,1fr))",
            gap: 0,
            borderBottom: "1px solid var(--fl-border)",
          }}
          className="max-md:[grid-template-columns:repeat(2,minmax(0,1fr))]"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: i === 0 ? "55px 21px 55px 0" : i === STATS.length - 1 ? "55px 0 55px 21px" : "55px 21px",
                borderLeft: i === 0 ? undefined : "1px solid var(--fl-border)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div className="fl-h2 fl-tabular" style={{ fontSize: 42, lineHeight: "46px" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 14, lineHeight: "22px", color: "var(--fl-sec)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <section style={{ padding: "144px 0 0", display: "flex", flexDirection: "column", gap: 34 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,38.1fr) minmax(0,61.9fr)",
              gap: 55,
              alignItems: "end",
            }}
          >
            <h2 className="fl-h2">
              A storefront <span className="fl-gold">without</span> the building.
            </h2>
            <p className="fl-sec" style={{ margin: 0, maxWidth: "68ch" }}>
              The same storefront, the two cost structures.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            <div style={{ border: "1px solid var(--fl-border)", borderRadius: 10, overflow: "hidden" }}>
              <div
                className="fl-mono fl-up fl-ter"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr) minmax(0,1fr)",
                  gap: 21,
                  padding: "13px 21px",
                  borderBottom: "1px solid var(--fl-border)",
                }}
              >
                <div />
                <div style={{ textAlign: "right" }}>Physical store</div>
                <div style={{ textAlign: "right" }}>Faberland</div>
              </div>
              {COST_ROWS.map((row, idx) => (
                <div
                  key={row[0]}
                  className="fl-tabular"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr) minmax(0,1fr)",
                    gap: 21,
                    padding: "13px 21px",
                    borderBottom: idx === COST_ROWS.length - 1 ? undefined : "1px solid var(--fl-border)",
                  }}
                >
                  <div>{row[0]}</div>
                  <div style={{ textAlign: "right", color: "var(--fl-sec)" }}>{row[1]}</div>
                  <div style={{ textAlign: "right" }}>{row[2]}</div>
                </div>
              ))}
            </div>
            <div className="fl-mono fl-ter" style={{ fontStyle: "italic" }}>
              Physical store costs are illustrative industry ranges, not quotes.
            </div>
          </div>
        </section>

        <section style={{ padding: "144px 0 0", display: "flex", flexDirection: "column", gap: 34 }}>
          <h2 className="fl-h2">Four steps.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 34 }}>
            {STEPS.map((s) => (
              <div
                key={s.n}
                style={{
                  borderTop: "1px solid var(--fl-border-strong)",
                  paddingTop: 21,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div className="fl-mono fl-ter">{s.n}</div>
                <div className="fl-h3">{s.title}</div>
                <div className="fl-sec">{s.body}</div>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            padding: "144px 0 0",
            display: "grid",
            gridTemplateColumns: "minmax(0,38.1fr) minmax(0,61.9fr)",
            gap: 55,
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 21 }}>
            <h2 className="fl-h2">
              They know their <span className="fl-gold">size</span> before they buy.
            </h2>
            <p className="fl-sec" style={{ margin: 0, maxWidth: "68ch" }}>
              Faberland measures a visitor&apos;s body using the headset and controllers — up to 120 points. Clothing
              is simulated at their real dimensions. If it doesn&apos;t fit, it doesn&apos;t go on. Shoes appear only
              in the visitor&apos;s size unless they turn the filter off.
            </p>
            <div style={{ fontSize: 14 }}>Patent application in preparation.</div>
          </div>
          <div
            style={{
              aspectRatio: "13/8",
              background: "var(--fl-bg)",
              border: "1px dashed var(--fl-border-strong)",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: 21,
            }}
            className="fl-mono fl-ter"
          >
            MOMENT 4.4 — SILHOUETTE FIL DE FER RÉSERVÉE
            <br />
            chevilles → genoux → hanches → torse → épaules · 89, 144, 233, 377 ms
            <br />
            puis le vêtement se pose · curseur de morphologie
          </div>
        </section>

        <section
          style={{
            padding: "144px 0 0",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 34,
          }}
        >
          <Link
            href="/map"
            style={{
              background: "var(--fl-surface)",
              border: "1px solid var(--fl-border)",
              borderRadius: 10,
              padding: 34,
              display: "flex",
              flexDirection: "column",
              gap: 21,
              minHeight: 233,
              justifyContent: "space-between",
              color: "inherit",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div className="fl-h3">Open a store</div>
              <div className="fl-sec">From $53/month · 48 spaces available</div>
            </div>
            <div style={{ fontSize: 14, borderBottom: "1px solid var(--fl-border-focus)", alignSelf: "flex-start" }}>
              See available spaces
            </div>
          </Link>
          <Link
            href="/eggs"
            style={{
              background: "var(--fl-surface)",
              border: "1px solid var(--fl-border)",
              borderRadius: 10,
              padding: 34,
              display: "flex",
              flexDirection: "column",
              gap: 21,
              minHeight: 233,
              justifyContent: "space-between",
              color: "inherit",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div className="fl-h3">Own a property</div>
              <div className="fl-sec">Your own world, your own branding</div>
            </div>
            <div style={{ fontSize: 14, borderBottom: "1px solid var(--fl-border-focus)", alignSelf: "flex-start" }}>
              Faberland Estates
            </div>
          </Link>
        </section>

        <SiteFooter />
      </div>
    </div>
  )
}
