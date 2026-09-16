"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import "./map.css"
import { mountMapApp } from "@/lib/map-app"

export default function FaberlandMap() {
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true

    const legendToggle = document.getElementById("legendToggle")
    const legend = document.getElementById("legend")
    const onLegend = () => {
      if (!legend || !legendToggle) return
      legend.hidden = !legend.hidden
      legendToggle.textContent = legend.hidden ? "Legend" : "Hide legend"
    }
    legendToggle?.addEventListener("click", onLegend)

    mountMapApp()

    return () => {
      legendToggle?.removeEventListener("click", onLegend)
    }
  }, [])

  return (
    <div className="fl-map" id="shell">
      <header>
        <Link href="/" className="brand" style={{ textDecoration: "none", color: "inherit" }}>
          <Image src="/images/faberland-emblem.png" alt="" width={26} height={26} style={{ height: 26, width: 26 }} />
          <Image
            src="/images/faberland-logo.png"
            alt="Faberland"
            width={120}
            height={21}
            style={{ height: 21, width: "auto" }}
          />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 21 }}>
          <div id="crumb" className="mono up" style={{ color: "var(--ter)" }}>
            Map · 48 plots
          </div>
          <button className="btn btn-sm" id="cartBtn" style={{ gap: 8 }} type="button">
            Cart <span id="cartCount">0</span>
          </button>
          <button className="btn" id="backBtn" style={{ display: "none" }} type="button">
            Back to the map
          </button>
          <button className="btn btn-primary" id="rentBtn" style={{ display: "none" }} type="button">
            Rent this space
          </button>
        </div>
      </header>

      <div id="stage">
        <div id="mapView">
          <div id="mapWorld">
            <svg id="plan" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet" />
          </div>

          <div id="mapTitle">
            <div className="mono up" style={{ color: "var(--ter)" }}>
              Faberland · top-down
            </div>
            <h1>Pick your exact store.</h1>
            <div className="mono" style={{ color: "var(--ter)" }}>
              Click any lit plot to walk inside it in 3D. Scroll to zoom, drag to pan. Closer to the entrance
              portal costs more.
            </div>
          </div>

          <div id="hud">
            <button id="legendToggle" className="btn btn-sm" style={{ background: "rgba(10,10,9,0.88)" }} type="button">
              Legend
            </button>
            <div id="legend" hidden>
              <div className="lg">
                <span className="sw" style={{ background: "#2A2721" }} />
                <span>Available plot</span>
              </div>
              <div className="lg">
                <span className="sw" style={{ background: "#1A1814", border: "1px solid #35312A" }} />
                <span>Leased</span>
              </div>
              <div className="lg">
                <span className="sw" style={{ background: "#7C5CBF" }} />
                <span>Our own store · #21</span>
              </div>
              <div className="lg">
                <span className="sw" style={{ background: "#B4553F" }} />
                <span>Ad wall (to remove)</span>
              </div>
              <div className="lg">
                <span className="sw" style={{ background: "#4B7FD4" }} />
                <span>Entrance portal</span>
              </div>
              <div className="lg">
                <span className="sw" style={{ background: "#8FD44C" }} />
                <span>Island edge</span>
              </div>
              <div className="mono" style={{ color: "var(--ter)", paddingTop: 5 }}>
                Schematic reconstruction of the Unreal top-down plan.
              </div>
            </div>
          </div>

          <div id="zoomBar">
            <button id="zoomOut" aria-label="Zoom out" type="button">
              −
            </button>
            <button id="zoomIn" aria-label="Zoom in" type="button">
              +
            </button>
            <button id="zoomReset" aria-label="Reset" style={{ fontSize: 10, letterSpacing: "0.02em" }} type="button">
              FIT
            </button>
          </div>

          <div id="tip" />
        </div>

        <div id="roomView">
          <div id="canvasWrap">
            <canvas id="roomCanvas" />
            <div id="roomTop">
              <div className="plate" id="roomLabel" />
              <div className="plate" id="bigger">
                <div>
                  <div className="mono up" style={{ color: "var(--ter)" }}>
                    Exterior
                  </div>
                  <div className="n" id="extArea">
                    2,500
                  </div>
                </div>
                <div style={{ width: 1, height: 34, background: "var(--border)" }} />
                <div>
                  <div className="mono up" style={{ color: "var(--gold)" }}>
                    Interior
                  </div>
                  <div className="n" id="intArea" style={{ color: "var(--gold)" }}>
                    7,500
                  </div>
                </div>
                <div className="mono" style={{ color: "var(--ter)", flex: "1 1 144px", minWidth: 144, maxWidth: 216 }}>
                  Bigger inside than out. The dotted floor line is the exterior footprint.
                </div>
              </div>
            </div>

            <div id="streamBar" role="group" aria-label="Render source">
              <button id="modeWeb" aria-pressed="true" type="button">
                Web mock
              </button>
              <button id="modeUnreal" aria-pressed="false" type="button">
                Unreal stream
              </button>
            </div>

            <div id="streamPane">
              <div className="streamCard">
                <div>
                  <div className="mono up" style={{ color: "var(--ter)" }}>
                    Pixel streaming · stub
                  </div>
                  <h2
                    style={{
                      margin: "5px 0 0",
                      fontFamily: "var(--font-space-grotesk),sans-serif",
                      fontWeight: 600,
                      fontSize: 34,
                      lineHeight: "42px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Connect the Unreal signalling server
                  </h2>
                  <div style={{ color: "var(--sec)", paddingTop: 8 }}>
                    Same gestures, engine render. Point this at your Pixel Streaming signalling URL; the handshake
                    below is wired and waiting for a real endpoint.
                  </div>
                </div>
                <div className="field">
                  <input
                    id="streamUrl"
                    defaultValue="wss://stream.faberland.io/signalling"
                    spellCheck={false}
                    aria-label="Signalling URL"
                  />
                  <button className="btn btn-primary" id="streamConnect" type="button">
                    Connect
                  </button>
                </div>
                <div id="streamLog" className="mono" aria-live="polite" />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 13 }}>
                  <div className="mono" style={{ color: "var(--ter)" }}>
                    Input forwarding, resolution and touch mapping are stubbed here.
                  </div>
                  <button className="btn btn-sm" id="streamBack" type="button">
                    Back to web mock
                  </button>
                </div>
              </div>
            </div>
          </div>

          <aside>
            <h2>Fit out the space</h2>
            <div className="mono" style={{ color: "var(--ter)" }}>
              Click a piece to drop it in, then drag it on the floor. Selected piece: R rotates, Delete removes.
            </div>
            <div className="palette" id="palette" />
            <div>
              <div className="mono up" style={{ color: "var(--ter)", paddingBottom: 8 }}>
                Placed
              </div>
              <div id="placedList" />
            </div>
            <div>
              <div className="mono up" style={{ color: "var(--ter)", paddingBottom: 8 }}>
                Lighting
              </div>
              <div className="palette" id="lighting" />
            </div>
            <div className="note mono">
              Cette scène est une maquette web. L&apos;édition définitive passera par le pixel streaming Unreal —
              mêmes gestes, rendu du moteur.
            </div>
          </aside>
        </div>

        <div id="drawer" role="dialog" aria-modal="true" aria-label="Cart">
          <div id="scrim" />
          <div id="sheet">
            <div
              style={{
                flex: "none",
                padding: "21px 34px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 13,
              }}
            >
              <h2
                id="sheetTitle"
                style={{
                  margin: 0,
                  fontFamily: "var(--font-space-grotesk),sans-serif",
                  fontWeight: 600,
                  fontSize: 26,
                  lineHeight: "34px",
                }}
              >
                Your plots
              </h2>
              <button className="linkbtn" id="sheetClose" type="button">
                Close
              </button>
            </div>
            <div id="sheetBody" />
            <div id="sheetFoot" />
          </div>
        </div>

        <div id="veil" />
      </div>
    </div>
  )
}
