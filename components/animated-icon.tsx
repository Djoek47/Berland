"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedIconProps {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}

export default function AnimatedIcon({ icon, title, description, delay = 0 }: AnimatedIconProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="rounded-lg border border-amber-700/30 bg-black/40 p-6 backdrop-blur text-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.5, delay: (delay + 200) / 1000 }}
        className="mx-auto mb-4 h-16 w-16 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400"
      >
        {icon}
      </motion.div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </motion.div>
  )
}
