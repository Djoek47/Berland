"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isLight = mounted && resolvedTheme === "light"

  return (
    <button
      type="button"
      aria-label={isLight ? "Switch to night mode" : "Switch to day mode"}
      onClick={() => setTheme(isLight ? "dark" : "light")}
      style={{
        height: 34,
        width: 34,
        borderRadius: 999,
        border: "1px solid var(--fl-border-strong)",
        background: "transparent",
        color: "var(--fl-ink)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        flex: "none",
      }}
    >
      {isLight ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  )
}
