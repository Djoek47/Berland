"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export default function EmblemAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const emblemRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const emblem = emblemRef.current
    if (!container || !emblem) return

    // Animation variables
    let animationFrame: number
    let rotation = 0
    let scale = 1
    let direction = 1
    let hue = 0

    // Mouse interaction variables
    let mouseX = 0
    let mouseY = 0
    let isHovering = false

    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return
      const rect = container.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      isHovering = true
    }

    const handleMouseLeave = () => {
      isHovering = false
    }

    // Animation function
    const animate = () => {
      if (!emblem) return

      // Base animation
      rotation += 0.2
      scale += 0.001 * direction
      if (scale > 1.05) direction = -1
      if (scale < 0.95) direction = 1
      hue = (hue + 0.2) % 360

      // Apply mouse interaction if hovering
      let tiltX = 0
      let tiltY = 0
      if (isHovering) {
        tiltX = mouseY * 15
        tiltY = -mouseX * 15
      }

      // Apply transformations
      emblem.style.transform = `
        rotate(${rotation}deg) 
        scale(${scale}) 
        perspective(1000px) 
        rotateX(${tiltX}deg) 
        rotateY(${tiltY}deg)
      `

      // Apply color filter
      emblem.style.filter = `
        drop-shadow(0 0 10px rgba(255, 180, 0, 0.7))
        hue-rotate(${hue}deg)
      `

      animationFrame = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Add event listeners
    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame)
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative flex items-center justify-center w-full h-full cursor-pointer">
      <div className="absolute w-full h-full bg-gradient-to-r from-amber-900/20 to-amber-700/20 rounded-full animate-pulse"></div>
      <Image
        ref={emblemRef}
        src="/images/faberland-emblem.png"
        alt="Faberland Emblem"
        width={180}
        height={180}
        className="transition-all duration-300"
      />
    </div>
  )
}
