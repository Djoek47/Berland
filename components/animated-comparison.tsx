"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedComparisonProps {
  title: string
  physicalValue: string
  virtualValue: string
  description: string
  icon: React.ReactNode
}

export default function AnimatedComparison({
  title,
  physicalValue,
  virtualValue,
  description,
  icon,
}: AnimatedComparisonProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg border border-amber-700/30 bg-black/40 p-6 backdrop-blur"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="text-amber-400">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-center">
          <div className="text-sm text-red-400">Physical Store</div>
          <div className="text-2xl font-bold mt-1">{physicalValue}</div>
        </div>
        <div className="h-8 w-px bg-zinc-800"></div>
        <div className="text-center">
          <div className="text-sm text-green-400">Virtual Store</div>
          <div className="text-2xl font-bold mt-1">{virtualValue}</div>
        </div>
      </div>

      <div className="relative h-2 bg-zinc-800 rounded-full mb-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : { width: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 to-green-500"
        ></motion.div>
      </div>

      <p className="text-sm text-zinc-300">{description}</p>
    </motion.div>
  )
}
