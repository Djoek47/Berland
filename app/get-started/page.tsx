import type { Metadata } from "next"
import { SiteHeader, SiteFooter } from "@/components/site/chrome"

export const metadata: Metadata = {
  title: "Get started — Faberland",
  description: "Faberland runs on Meta Quest. Pick the version that matches your hardware and walk in.",
}

export default function GetStartedPage() {
  return (
    <div className="fl-site">
      <div className="fl-shell">
        <SiteHeader opaque />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,61.9fr) minmax(0,38.1fr)",
            gap: 55,
            padding: "89px 0",
            alignItems: "end",
          }}
        >
          <h1 className="fl-h1">Put on the headset. Walk in.</h1>
          <p className="fl-sec" style={{ margin: 0, maxWidth: "68ch" }}>
            Faberland runs on Meta Quest. Pick the version that matches your hardware, install it, and you are in the
            city.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 34,
            paddingBottom: 144,
          }}
        >
          <div
            style={{
              background: "var(--fl-surface)",
              border: "1px solid var(--fl-border)",
              borderRadius: 10,
              padding: 34,
              display: "flex",
              flexDirection: "column",
              gap: 21,
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  height: 34,
                  padding: "0 13px",
                  alignSelf: "flex-start",
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
              <div className="fl-h3">Standalone on Quest</div>
              <div className="fl-sec">Runs on the headset alone. No computer, no cable.</div>
              <div className="fl-mono" style={{ color: "var(--fl-warn)" }}>
                modèles de casque pris en charge et taille du téléchargement à fournir
              </div>
            </div>
            <button type="button" className="fl-btn fl-btn-primary" style={{ alignSelf: "flex-start" }}>
              Download
            </button>
          </div>

          <div
            style={{
              background: "var(--fl-surface)",
              border: "1px solid var(--fl-border)",
              borderRadius: 10,
              padding: 34,
              display: "flex",
              flexDirection: "column",
              gap: 21,
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  height: 34,
                  padding: "0 13px",
                  alignSelf: "flex-start",
                  background: "var(--fl-surface2)",
                  borderRadius: 999,
                  fontSize: 10,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: 999, background: "var(--fl-warn)", display: "block" }} />
                Reserved
              </div>
              <div className="fl-h3">Windows with a headset</div>
              <div className="fl-sec">Higher detail, driven by your computer.</div>
              <div className="fl-mono" style={{ color: "var(--fl-warn)" }}>
                confirmer si cette version est publiée · l&apos;ancienne page annonçait un .7z pour Rift S, Vive et Index,
                ce qui contredit le dossier
              </div>
            </div>
            <div style={{ fontSize: 14, color: "var(--fl-ter)" }}>Not published yet</div>
          </div>

          <div
            style={{
              border: "1px solid var(--fl-border)",
              borderRadius: 10,
              padding: 34,
              display: "flex",
              flexDirection: "column",
              gap: 13,
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  height: 34,
                  padding: "0 13px",
                  alignSelf: "flex-start",
                  background: "var(--fl-surface)",
                  border: "1px solid var(--fl-border)",
                  borderRadius: 999,
                  fontSize: 10,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  color: "var(--fl-ter)",
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: 999, background: "var(--fl-ter)", display: "block" }} />
                Postponed
              </div>
              <div className="fl-h3" style={{ color: "var(--fl-sec)" }}>
                In the browser
              </div>
              <div style={{ color: "var(--fl-ter)" }}>
                Pixel streaming is postponed. There is no browser version today.
              </div>
            </div>
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
          <h2 className="fl-h2">
            How to <span className="fl-gold">install</span>.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 21 }}>
            {[
              ["01", "Download the build", "On the headset, or on a computer if you install by cable.", false],
              [
                "02",
                "Install it",
                "procédure exacte à fournir — sideload, canal Meta, ou lien direct. Je ne l'invente pas.",
                true,
              ],
              ["03", "Walk in", "Enter through the portal. Up to four visitors share a session.", false],
            ].map(([n, title, body, warn]) => (
              <div
                key={n as string}
                style={{
                  borderTop: "1px solid var(--fl-border-strong)",
                  paddingTop: 21,
                  display: "grid",
                  gridTemplateColumns: "34px minmax(0,1fr)",
                  gap: 21,
                }}
              >
                <div className="fl-mono fl-ter">{n}</div>
                <div>
                  <div style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 600, fontSize: 21, lineHeight: "30px" }}>
                    {title}
                  </div>
                  <div className={warn ? "fl-mono" : "fl-sec"} style={warn ? { color: "var(--fl-warn)" } : undefined}>
                    {body}
                  </div>
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
          <h2 className="fl-h2">Requirements</h2>
          <div style={{ border: "1px solid var(--fl-border)", borderRadius: 10, overflow: "hidden" }}>
            <div
              className="fl-mono fl-up fl-ter"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
                gap: 21,
                padding: "13px 21px",
                borderBottom: "1px solid var(--fl-border)",
              }}
            >
              <div>Item</div>
              <div>Requirement</div>
            </div>
            {(
              [
                ["Headset", "Meta Quest", false],
                ["Controllers", "Both, for body measurement", false],
                ["Storage", "à fournir", true],
                ["Connection", "Wi-Fi for shared sessions", false],
              ] as const
            ).map(([item, req, warn], i, arr) => (
              <div
                key={item}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
                  gap: 21,
                  padding: "13px 21px",
                  borderBottom: i === arr.length - 1 ? undefined : "1px solid var(--fl-border)",
                }}
              >
                <div>{item}</div>
                <div className={warn ? "fl-mono" : undefined} style={{ color: warn ? "var(--fl-warn)" : "var(--fl-sec)" }}>
                  {req}
                </div>
              </div>
            ))}
          </div>
        </div>

        <SiteFooter />
      </div>
    </div>
  )
}
