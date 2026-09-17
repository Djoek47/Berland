"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

type BrandMarkProps = {
  size?: number
  className?: string
}

type BrandWordmarkProps = {
  /** header uses cream/ink; footer uses gold/ink */
  variant?: "header" | "footer"
  height?: number
  className?: string
}

export function BrandMark({ size = 42, className }: BrandMarkProps) {
  return (
    <Image
      src="/design/assets/mark-star.png"
      alt=""
      width={size}
      height={size}
      className={className}
      style={{ height: size, width: size, flex: "none", objectFit: "contain", display: "block" }}
      priority
    />
  )
}

export function BrandWordmark({ variant = "header", height = 34, className }: BrandWordmarkProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isLight = mounted && resolvedTheme === "light"
  const src = isLight
    ? "/design/assets/faberland-ink.png"
    : variant === "footer"
      ? "/design/assets/faberland-gold.png"
      : "/design/assets/faberland-cream.png"

  // Intrinsic 1076×193
  const width = Math.round((height * 1076) / 193)

  return (
    <Image
      src={src}
      alt="Faberland"
      width={width}
      height={height}
      className={className}
      style={{ height, width: "auto", flex: "none", objectFit: "contain", display: "block" }}
      priority
    />
  )
}

export function BrandLockup({
  variant = "header",
  markSize = 42,
  wordHeight = 34,
}: {
  variant?: "header" | "footer"
  markSize?: number
  wordHeight?: number
}) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 13 }}>
      <BrandMark size={markSize} />
      <BrandWordmark variant={variant} height={wordHeight} />
    </span>
  )
}

/** Theme-aware Visser Studio wordmark from design/assets */
export function VisserWordmark({ height = 42, className }: { height?: number; className?: string }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isLight = mounted && resolvedTheme === "light"
  const src = isLight ? "/design/assets/visser-ink.png" : "/design/assets/visser-cream.png"
  // Approximate intrinsic ratio from handoff PNGs
  const width = Math.round(height * 2.8)

  return (
    <Image
      src={src}
      alt="Visser Studio"
      width={width}
      height={height}
      className={className}
      style={{ height, width: "auto", flex: "none", objectFit: "contain", display: "block" }}
    />
  )
}
