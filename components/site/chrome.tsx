"use client"

import Link from "next/link"
import { useState } from "react"
import { BrandLockup, VisserWordmark } from "@/components/site/brand"
import { ThemeToggle } from "@/components/site/theme-toggle"

const NAV = [
  { href: "/spaces", label: "Spaces" },
  { href: "/showcase", label: "Showcase" },
  { href: "/company", label: "Company" },
  { href: "/get-started", label: "Get started" },
]

export function SiteHeader({
  opaque = false,
  trailing,
}: {
  opaque?: boolean
  trailing?: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <header
      style={{
        height: 89,
        padding: "0 34px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 34,
        background: opaque ? "var(--fl-bg)" : "var(--fl-scrim)",
        borderBottom: "1px solid var(--fl-border)",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", color: "inherit" }}>
        <BrandLockup variant="header" markSize={42} wordHeight={34} />
      </Link>

      <nav
        className="hidden md:flex"
        style={{ alignItems: "center", gap: 21, fontSize: 14, color: "var(--fl-ink)" }}
      >
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} style={{ color: "var(--fl-ink)" }}>
            {item.label}
          </Link>
        ))}
        <Link href="/map" className="fl-btn fl-btn-primary" style={{ color: "var(--fl-on-gold)" }}>
          Rent a space
        </Link>
        {trailing}
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 13, flex: "none" }}>
        <ThemeToggle />
        <button
          type="button"
          className="flex md:hidden"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          style={{ background: "none", border: 0, padding: 0, flexDirection: "column", gap: 5 }}
        >
          <span style={{ width: 21, height: 1, background: "var(--fl-ink)", display: "block" }} />
          <span style={{ width: 21, height: 1, background: "var(--fl-ink)", display: "block" }} />
        </button>
      </div>

      {open && (
        <div
          className="md:hidden"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 89,
            background: "var(--fl-surface)",
            borderBottom: "1px solid var(--fl-border)",
            padding: "21px 34px",
            display: "flex",
            flexDirection: "column",
            gap: 21,
          }}
        >
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} style={{ color: "var(--fl-ink)" }}>
              {item.label}
            </Link>
          ))}
          <Link href="/map" className="fl-btn fl-btn-primary" onClick={() => setOpen(false)}>
            Rent a space
          </Link>
          {trailing}
        </div>
      )}
    </header>
  )
}

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer
      style={{
        marginTop: 144,
        borderTop: "1px solid var(--fl-border)",
        padding: "55px 0 89px",
      }}
    >
      <div className="fl-shell" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 34, flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 13 }}>
          <Link href="/" style={{ color: "inherit" }}>
            <BrandLockup variant="footer" markSize={34} wordHeight={34} />
          </Link>
          <div style={{ display: "flex", gap: 21, fontSize: 14, color: "var(--fl-sec)", flexWrap: "wrap" }}>
            <Link href="/spaces" style={{ color: "var(--fl-sec)" }}>Spaces</Link>
            <Link href="/showcase" style={{ color: "var(--fl-sec)" }}>Showcase</Link>
            <Link href="/company" style={{ color: "var(--fl-sec)" }}>Company</Link>
            <Link href="/get-started" style={{ color: "var(--fl-sec)" }}>Get started</Link>
            <Link href="/eggs" style={{ color: "var(--fl-sec)" }}>Faberland Estates</Link>
            <Link href="/map" style={{ color: "var(--fl-sec)" }}>Map</Link>
          </div>
          <div className="fl-mono fl-ter">
            VISSER STUDIO INC. · © <span className="fl-tabular">{year}</span>
          </div>
        </div>
        <VisserWordmark height={42} />
      </div>
    </footer>
  )
}
