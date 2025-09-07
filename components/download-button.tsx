"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
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

    try {
      // Track the download with Vercel Analytics
      await fetch('/api/track-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: 'demo_download',
          metadata: {
            version: 'v1',
            file_type: 'vr_demo',
            user_agent: navigator.userAgent,
            timestamp: new Date().toISOString()
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download Faberland VR Demo</DialogTitle>
          <DialogDescription>Experience the Faberland metaverse on your VR headset</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="rounded-md bg-apple-green/10 p-4">
            <h3 className="mb-2 font-medium text-apple-green">System Requirements</h3>
            <ul className="ml-4 list-disc text-sm text-zinc-300">
              <li>Windows 10 or higher</li>
              <li>Compatible VR headset (Oculus, Vive, Index)</li>
              <li>8GB RAM minimum (16GB recommended)</li>
              <li>NVIDIA GTX 1060 / AMD Radeon RX 580 or better</li>
              <li>10GB free disk space</li>
            </ul>
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
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm text-zinc-300">
                I agree to the Faberland terms of service and understand this is a demo version
              </Label>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={handleDownload}
            disabled={!agreedToTerms || isDownloading || showSuccess}
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
          >
            {isDownloading ? "Downloading..." : "Download Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
