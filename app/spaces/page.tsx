"use client"

import { useMemo, useState, type CSSProperties } from "react"
import Link from "next/link"
import { SiteHeader, SiteFooter } from "@/components/site/chrome"
import { PLOTS, DISTRICT_OF, SQFT, type PlotSize } from "@/lib/plots-plan"

const DISTRICTS = ["All", "Market", "Central", "Arts"] as const
const SIZES = ["All", "Small", "Medium", "Large"] as const

const INCLUDED = [
  { title: "Self-service fit-out", body: "Upload your own 3D objects, move them, price them, live." },
  { title: "Instant renovation", body: "Change the whole look for Halloween or Christmas in minutes." },
  { title: "No operating costs", body: "No power, no cleaning, no security, no maintenance." },
  { title: "Payments handled", body: "Stripe processes rent. Your sales settle to you." },
  { title: "Bigger inside", body: "Interior space can exceed the exterior footprint." },
  { title: "Always open", body: "No hours, no staff required, no geography." },
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

function pill(active: boolean): CSSProperties {
  return {
    height: 34,
    padding: "0 13px",
    borderRadius: 999,
    border: `1px solid ${active ? "var(--fl-border-focus)" : "var(--fl-border-strong)"}`,
    background: active ? "var(--fl-surface2)" : "transparent",
    color: active ? "var(--fl-ink)" : "var(--fl-ter)",
    fontSize: 10,
    letterSpacing: "0.02em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontFamily: "var(--font-ibm-plex-mono), monospace",
  }
}

export default function SpacesPage() {
  const [district, setDistrict] = useState<(typeof DISTRICTS)[number]>("All")
  const [size, setSize] = useState<(typeof SIZES)[number]>("All")
  const [maxPrice, setMaxPrice] = useState(95)
  const [calcPrice, setCalcPrice] = useState(65)
  const [calcMargin, setCalcMargin] = useState(40)
  const [calcRent, setCalcRent] = useState(65)

  const filtered = useMemo(() => {
    return PLOTS.filter((p) => {
      if (p.leased || p.ours) return false
      if (district !== "All" && DISTRICT_OF(p.id) !== district) return false
      if (size !== "All" && p.size !== size) return false
      if (p.price > maxPrice) return false
      return true
    }).sort((a, b) => a.id - b.id)
  }, [district, size, maxPrice])

  const profitPerSale = Math.max(0, (calcPrice * calcMargin) / 100)
  const salesNeeded = profitPerSale > 0 ? Math.ceil(calcRent / profitPerSale) : null

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
          <h1 className="fl-h1">48 commercial spaces. Published prices. No lease negotiation.</h1>
          <p className="fl-sec" style={{ margin: 0, maxWidth: "68ch" }}>
            Every space in Faberland has a fixed monthly price, visible before you commit. Closer to the entrance
            portal costs more, exactly like a high street. Pick one, fit it out, open.
          </p>
        </div>

        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 5,
            background: "var(--fl-bg)",
            borderTop: "1px solid var(--fl-border)",
            borderBottom: "1px solid var(--fl-border)",
            padding: "21px 0",
          }}
        >
          <div style={{ display: "flex", gap: 21, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {DISTRICTS.map((d) => (
                <button key={d} type="button" style={pill(district === d)} onClick={() => setDistrict(d)}>
                  {d}
                </button>
              ))}
            </div>
            <div style={{ width: 1, height: 34, background: "var(--fl-border)" }} />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {SIZES.map((s) => (
                <button key={s} type="button" style={pill(size === s)} onClick={() => setSize(s)}>
                  {s}
                </button>
              ))}
            </div>
            <div style={{ width: 1, height: 34, background: "var(--fl-border)" }} />
            <label style={{ display: "flex", alignItems: "center", gap: 13, fontSize: 14, color: "var(--fl-sec)" }}>
              <span className="fl-mono fl-up fl-ter">Max price</span>
              <input
                type="range"
                min={53}
                max={95}
                step={1}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: 144, accentColor: "var(--fl-gold)" }}
              />
              <span className="fl-tabular" style={{ color: "var(--fl-ink)" }}>
                ${maxPrice}
              </span>
            </label>
            <div className="fl-mono fl-up fl-tabular" style={{ marginLeft: "auto", color: "var(--fl-sec)" }}>
              {filtered.length} showing
            </div>
          </div>
        </div>

        <div style={{ padding: "55px 0 0" }}>
          {filtered.length === 0 ? (
            <div
              style={{
                border: "1px solid var(--fl-border)",
                borderRadius: 10,
                padding: "55px 21px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 13,
                textAlign: "center",
              }}
            >
              <div className="fl-h3">No space matches those filters.</div>
              <div className="fl-sec">Widen the price range or clear a district.</div>
              <button
                type="button"
                className="fl-btn"
                style={{ marginTop: 8 }}
                onClick={() => {
                  setDistrict("All")
                  setSize("All")
                  setMaxPrice(95)
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 34 }}>
              {filtered.map((p) => {
                const sqft = SQFT[p.size as PlotSize]
                return (
                  <Link
                    key={p.id}
                    href="/map"
                    style={{
                      background: "var(--fl-surface)",
                      border: "1px solid var(--fl-border)",
                      borderRadius: 10,
                      overflow: "hidden",
                      color: "inherit",
                      display: "block",
                    }}
                  >
                    <div
                      style={{
                        aspectRatio: "13/8",
                        background: "radial-gradient(circle at 50% 45%, #14150F 0%, #0A0A09 62%)",
                      }}
                    />
                    <div style={{ padding: 21, display: "flex", flexDirection: "column", gap: 5 }}>
                      <div className="fl-h3 fl-gold fl-tabular">
                        ${p.price}{" "}
                        <span style={{ fontSize: 14, color: "var(--fl-sec)", fontFamily: "var(--font-inter)", fontWeight: 400 }}>
                          /month
                        </span>
                      </div>
                      <div style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 600, fontSize: 21, lineHeight: "30px" }}>
                        Faberplot #{p.id}
                      </div>
                      <div style={{ fontSize: 14, lineHeight: "22px", color: "var(--fl-sec)" }}>
                        {DISTRICT_OF(p.id)} District · {p.size}
                      </div>
                      {sqft != null && (
                        <div className="fl-tabular" style={{ fontSize: 14, lineHeight: "22px", color: "var(--fl-ter)" }}>
                          {sqft.toLocaleString("en-US")} sq ft outside
                        </div>
                      )}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 13, marginTop: 8 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            height: 34,
                            padding: "0 13px",
                            background: "var(--fl-surface2)",
                            borderRadius: 999,
                            fontSize: 10,
                            letterSpacing: "0.02em",
                            textTransform: "uppercase",
                          }}
                        >
                          <span style={{ width: 5, height: 5, borderRadius: 999, background: "var(--fl-pos)", display: "block" }} />
                          Available
                        </div>
                        <div style={{ fontSize: 14, color: "var(--fl-sec)" }}>View space</div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,38.1fr) minmax(0,61.9fr)",
            gap: 55,
            padding: "144px 0 0",
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 21 }}>
            <h2 className="fl-h2">
              How the <span className="fl-gold">price</span> is set.
            </h2>
            <p className="fl-sec" style={{ margin: 0, maxWidth: "68ch" }}>
              Distance from the entrance portal, exactly like a high street.
            </p>
          </div>
          <div style={{ border: "1px solid var(--fl-border)", borderRadius: 10, overflow: "hidden" }}>
            {[
              ["Entrance zone", "Every visitor passes here", "Highest price"],
              ["Main districts", "Regular foot traffic", "Mid range"],
              ["Outer plots", "Destination shopping", "Entry price"],
            ].map((row, i) => (
              <div
                key={row[0]}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr) minmax(0,0.8fr)",
                  gap: 21,
                  padding: 21,
                  borderBottom: i < 2 ? "1px solid var(--fl-border)" : undefined,
                  alignItems: "baseline",
                }}
              >
                <div style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 600, fontSize: 21 }}>{row[0]}</div>
                <div style={{ fontSize: 14, lineHeight: "22px", color: "var(--fl-sec)" }}>{row[1]}</div>
                <div style={{ fontSize: 14, textAlign: "right" }}>{row[2]}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "144px 0 0", display: "flex", flexDirection: "column", gap: 34 }}>
          <h2 className="fl-h2" style={{ maxWidth: "38ch" }}>
            What&apos;s <span className="fl-gold">included</span>.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 34 }}>
            {INCLUDED.map((item) => (
              <div
                key={item.title}
                style={{
                  borderTop: "1px solid var(--fl-border-strong)",
                  paddingTop: 21,
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <div style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 600, fontSize: 21, lineHeight: "30px" }}>
                  {item.title}
                </div>
                <div className="fl-sec">{item.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "144px 0 0", display: "flex", flexDirection: "column", gap: 34 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,38.1fr) minmax(0,61.9fr)",
              gap: 55,
              alignItems: "end",
            }}
          >
            <h2 className="fl-h2">
              Physical store <span className="fl-gold">against</span> Faberland.
            </h2>
            <p className="fl-sec" style={{ margin: 0, maxWidth: "68ch" }}>
              The same storefront, the two cost structures.
            </p>
          </div>
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
        </div>

        <div
          style={{
            padding: "144px 0 0",
            display: "grid",
            gridTemplateColumns: "minmax(0,38.1fr) minmax(0,61.9fr)",
            gap: 55,
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 21 }}>
            <h2 className="fl-h2">What it takes to cover the rent.</h2>
            <p className="fl-sec" style={{ margin: 0, maxWidth: "68ch" }}>
              Three numbers you already know. Nothing here is a forecast — it is arithmetic on your own figures.
            </p>
          </div>
          <div
            style={{
              border: "1px solid var(--fl-border)",
              borderRadius: 10,
              background: "var(--fl-surface)",
              padding: 34,
              display: "flex",
              flexDirection: "column",
              gap: 34,
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 21 }}>
              {(
                [
                  ["Your product price", calcPrice, setCalcPrice, 1, undefined],
                  ["Your margin, %", calcMargin, setCalcMargin, 1, 100],
                  ["Monthly rent", calcRent, setCalcRent, 53, 95],
                ] as const
              ).map(([label, value, setter, min, max]) => (
                <label key={label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span className="fl-mono fl-up fl-ter">{label}</span>
                  <input
                    type="number"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => setter(Number(e.target.value))}
                    style={{
                      height: 55,
                      padding: "0 21px",
                      background: "var(--fl-bg)",
                      border: "1px solid var(--fl-border-strong)",
                      borderRadius: 10,
                      color: "var(--fl-ink)",
                      fontSize: 16,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  />
                </label>
              ))}
            </div>
            <div
              style={{
                borderTop: "1px solid var(--fl-border)",
                paddingTop: 34,
                display: "flex",
                alignItems: "baseline",
                gap: 21,
                flexWrap: "wrap",
              }}
            >
              <div className="fl-h1 fl-gold fl-tabular" style={{ fontSize: 68, lineHeight: "70px" }}>
                {salesNeeded ?? "—"}
              </div>
              <div className="fl-sec" style={{ maxWidth: "34ch" }}>
                {salesNeeded == null
                  ? "Enter a margin above zero."
                  : `sales a month at your margin to cover $${calcRent} rent.`}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "144px 0",
            display: "grid",
            gridTemplateColumns: "minmax(0,61.9fr) minmax(0,38.1fr)",
            gap: 55,
            alignItems: "end",
            borderBottom: "1px solid var(--fl-border)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 21 }}>
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
              MOMENT 4.5 — BOUCLE DE 3 s RÉSERVÉE
              <br />
              panneau → traversée → intérieur de la boutique annoncée
            </div>
            <div style={{ fontSize: 14 }}>Advertising you fly through, not click.</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 21, paddingBottom: 34 }}>
            <h2 className="fl-h2">Pick a space.</h2>
            <Link href="/map" className="fl-btn fl-btn-primary" style={{ alignSelf: "flex-start" }}>
              See available spaces
            </Link>
          </div>
        </div>

        <SiteFooter />
      </div>
    </div>
  )
}
