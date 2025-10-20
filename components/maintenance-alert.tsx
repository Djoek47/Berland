"use client"

import React from "react"
import { AlertTriangle, Clock } from "lucide-react"

export default function MaintenanceAlert() {
  return (
    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white py-3 px-4 text-center relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-red-400/20 animate-pulse"></div>
      
      <div className="relative z-10 flex items-center justify-center gap-3">
        <AlertTriangle className="h-5 w-5 animate-pulse" />
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span className="font-semibold text-sm md:text-base">
            🚧 MAINTENANCE MODE 🚧
          </span>
        </div>
        <AlertTriangle className="h-5 w-5 animate-pulse" />
      </div>
      
      <div className="relative z-10 mt-1 text-xs md:text-sm opacity-90">
        We're performing scheduled maintenance. The site will be fully operational on October 24th, 2025.
      </div>
      
      {/* Glass rainbow effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 backdrop-blur-sm"></div>
    </div>
  )
}
