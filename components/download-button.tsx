"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { track } from '@vercel/analytics'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface DownloadButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export default function DownloadButton({ variant = "default", size = "default" }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const downloadUrl = "https://storage.googleapis.com/djt45test/VRTester/Faberland%20Demo%20v1.7z"

  const handleDownload = async () => {
    setIsDownloading(true)

    // Track immediately on client-side for instant analytics
    track('VR_Demo_Download_Click', {
      file: 'Faberland_Demo_v1.7z',
      version: 'v1',
      source: 'download_button_dialog',
      timestamp: new Date().toISOString()
    })

    try {
      // Track the download with server-side analytics
      await fetch('/api/track-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: 'VR_Demo_Download',
          metadata: {
            version: 'v1',
            file_type: 'vr_demo',
            user_agent: navigator.userAgent,
            timestamp: new Date().toISOString(),
            source: 'download_button_dialog'
          }
        })
      })
    } catch (error) {
      console.error('Error tracking download:', error)
      // Continue with download even if tracking fails
    }

    // Create an anchor element and trigger download
    const link = document.createElement("a")
    link.href = downloadUrl
    link.setAttribute("download", "Faberland_Demo_v1.7z")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Show success message
    setTimeout(() => {
      setIsDownloading(false)
      setShowSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
        setAgreedToTerms(false)
      }, 3000)
    }, 1500)
  }

  const buttonText = size === "sm" ? "Download" : "Download VR Demo"

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={variant === "default" ? "bg-yellow-500 hover:bg-yellow-600 text-black font-bold shadow-lg" : ""}
        >
          <Download className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-gray-900 text-center">Download Faberland VR Demo</DialogTitle>
          <DialogDescription className="text-gray-600 text-center text-base">Experience the Faberland metaverse on your VR headset</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100 p-6 border border-emerald-200/50">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-blue-400/20 to-purple-400/20 animate-pulse"></div>
            <div className="relative">
              <h3 className="mb-4 text-lg font-semibold text-emerald-800 flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-emerald-500"></div>
                System Requirements
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center text-gray-700 font-medium">
                  <div className="mr-3 h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                  Windows 10 or higher
                </li>
                <li className="flex items-center text-gray-700 font-medium">
                  <div className="mr-3 h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                  Compatible VR headset (Oculus, Vive, Index)
                </li>
                <li className="flex items-center text-gray-700 font-medium">
                  <div className="mr-3 h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                  8GB RAM minimum (16GB recommended)
                </li>
                <li className="flex items-center text-gray-700 font-medium">
                  <div className="mr-3 h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                  NVIDIA GTX 1060 / AMD Radeon RX 580 or better
                </li>
                <li className="flex items-center text-gray-700 font-medium">
                  <div className="mr-3 h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                  10GB free disk space
                </li>
              </ul>
            </div>
          </div>

          {showSuccess ? (
            <Alert className="border-green-500/50 bg-green-500/10 text-green-500">
              <AlertDescription>
                Download started! If it doesn't begin automatically,
                <a href={downloadUrl} download="Faberland_Demo_v1.7z" className="ml-1 underline">
                  click here
                </a>
                .
              </AlertDescription>
            </Alert>
          ) : (
            <div className="flex items-start space-x-3 p-4 rounded-xl bg-gray-50/80 border border-gray-200/50">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                className="border-gray-400 mt-0.5"
              />
              <Label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed font-medium cursor-pointer">
                I agree to the Faberland terms of service and understand this is a demo version
              </Label>
            </div>
          )}
        </div>

        <DialogFooter className="pt-4">
          <Button
            onClick={handleDownload}
            disabled={!agreedToTerms || isDownloading || showSuccess}
            className="relative w-full h-12 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center">
              {isDownloading ? (
                <>
                  <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="mr-3 h-5 w-5" />
                  Download Now
                </>
              )}
            </div>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
