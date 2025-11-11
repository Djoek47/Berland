"use client"

import React, { useState, useEffect } from "react"
import { Sparkles, Clock, Calendar } from "lucide-react"

export default function OpeningDayAlert() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [tomorrowDate, setTomorrowDate] = useState("")

  useEffect(() => {
    // Set to tomorrow at 8:00 PM
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(20, 0, 0, 0)
    const targetDate = tomorrow.getTime()
    
    // Format tomorrow's date for display
    setTomorrowDate(tomorrow.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }))

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white py-4 px-4 text-center relative overflow-hidden backdrop-blur-xl border border-white/20">
      {/* Apple-style glass effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 via-green-400/30 to-teal-400/30 backdrop-blur-sm"></div>
      
      {/* Subtle noise texture for glass effect */}
      <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-white/20 via-transparent to-white/20"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Sparkles className="h-6 w-6 animate-pulse text-yellow-300 drop-shadow-lg" />
          <span className="font-bold text-lg md:text-xl drop-shadow-lg">
            🎉 FABERLAND GRAND OPENING! 🎉
          </span>
          <Sparkles className="h-6 w-6 animate-pulse text-yellow-300 drop-shadow-lg" />
        </div>
        
        <div className="flex items-center justify-center gap-2 mb-3">
          <Calendar className="h-4 w-4 drop-shadow-md" />
          <span className="font-semibold text-sm md:text-base drop-shadow-md">
            {tomorrowDate ? `${tomorrowDate} at 8:00 PM` : "Tomorrow at 8:00 PM"}
          </span>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 drop-shadow-md" />
            <span className="text-xs md:text-sm font-medium drop-shadow-md">Countdown:</span>
          </div>
          <div className="flex gap-2 text-sm md:text-base font-mono">
            <div className="bg-black/20 backdrop-blur-md px-3 py-2 rounded-lg border border-white/30 shadow-lg">
              {timeLeft.days}d
            </div>
            <div className="bg-black/20 backdrop-blur-md px-3 py-2 rounded-lg border border-white/30 shadow-lg">
              {timeLeft.hours}h
            </div>
            <div className="bg-black/20 backdrop-blur-md px-3 py-2 rounded-lg border border-white/30 shadow-lg">
              {timeLeft.minutes}m
            </div>
            <div className="bg-black/20 backdrop-blur-md px-3 py-2 rounded-lg border border-white/30 shadow-lg">
              {timeLeft.seconds}s
            </div>
          </div>
        </div>

        <div className="text-xs md:text-sm opacity-90 drop-shadow-md">
          The metaverse awaits! Get ready for the ultimate VR experience 🚀
        </div>
      </div>
      
      {/* Apple-style glass rainbow effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-green-500/10 to-teal-500/10 backdrop-blur-xl"></div>
    </div>
  )
}
