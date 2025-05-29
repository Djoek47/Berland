"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"

interface VideoPlayerProps {
  videos: {
    id: string
    title: string
    description: string
  }[]
  autoplay?: boolean
  autoRotate?: boolean
  rotationInterval?: number
  className?: string
}

export default function VideoPlayer({
  videos,
  autoplay = false,
  autoRotate = true,
  rotationInterval = 180000, // 3 minutes by default
  className = "",
}: VideoPlayerProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [volume, setVolume] = useState(70)
  const playerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const rotationTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Handle video rotation
  useEffect(() => {
    if (autoRotate && videos.length > 1) {
      rotationTimerRef.current = setInterval(() => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
      }, rotationInterval)
    }

    return () => {
      if (rotationTimerRef.current) {
        clearInterval(rotationTimerRef.current)
      }
    }
  }, [autoRotate, videos.length, rotationInterval])

  // Handle fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)

    // YouTube iframe API doesn't work well with React, so we use postMessage
    if (iframeRef.current) {
      try {
        if (isPlaying) {
          iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
        } else {
          iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
        }
      } catch (error) {
        console.error("Error controlling YouTube player:", error)
      }
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)

    if (iframeRef.current) {
      try {
        if (isMuted) {
          iframeRef.current.contentWindow?.postMessage(`{"event":"command","func":"unMute","args":""}`, "*")
          iframeRef.current.contentWindow?.postMessage(`{"event":"command","func":"setVolume","args":[${volume}]}`, "*")
        } else {
          iframeRef.current.contentWindow?.postMessage(`{"event":"command","func":"mute","args":""}`, "*")
        }
      } catch (error) {
        console.error("Error controlling YouTube player:", error)
      }
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    setIsMuted(newVolume === 0)

    if (iframeRef.current) {
      try {
        iframeRef.current.contentWindow?.postMessage(
          `{"event":"command","func":"setVolume","args":[${newVolume}]}`,
          "*",
        )
        if (newVolume === 0) {
          iframeRef.current.contentWindow?.postMessage(`{"event":"command","func":"mute","args":""}`, "*")
        } else if (isMuted) {
          iframeRef.current.contentWindow?.postMessage(`{"event":"command","func":"unMute","args":""}`, "*")
        }
      } catch (error) {
        console.error("Error controlling YouTube player:", error)
      }
    }
  }

  const toggleFullscreen = () => {
    if (!playerRef.current) return

    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  const nextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)

    // Reset rotation timer when manually changing videos
    if (rotationTimerRef.current) {
      clearInterval(rotationTimerRef.current)
      rotationTimerRef.current = setInterval(() => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
      }, rotationInterval)
    }
  }

  // If no videos are provided, use default Faberland videos
  const defaultVideos = [
    {
      id: "VnblkXuEzVo",
      title: "Faberland Metaverse Experience",
      description: "Explore the immersive virtual world of Faberland with stunning visuals and interactive elements.",
    },
    {
      id: "McKQziN6TWg",
      title: "Virtual Shopping in Faberland",
      description: "Discover how businesses are revolutionizing retail with virtual storefronts in the metaverse.",
    },
    {
      id: "r3sLReKV1PU",
      title: "Creating Your Faberland Avatar",
      description: "Learn how to customize your digital identity for an enhanced metaverse experience.",
    },
    {
      id: "2ttQoNxzRjc",
      title: "Faberland Business Opportunities",
      description: "See how entrepreneurs are leveraging the metaverse to create new revenue streams.",
    },
  ]

  const videosToUse = videos.length > 0 ? videos : defaultVideos
  const currentVideo = videosToUse[currentVideoIndex]
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${currentVideo.id}?enablejsapi=1&autoplay=${
    autoplay ? 1 : 0
  }&mute=${isMuted ? 1 : 0}&controls=0&rel=0&modestbranding=1&showinfo=0&origin=${
    typeof window !== "undefined" ? window.location.origin : ""
  }`

  return (
    <Card className={`overflow-hidden border-amber-700/30 bg-zinc-900/50 backdrop-blur ${className}`}>
      <div ref={playerRef} className="relative">
        <div className="aspect-video w-full bg-black">
          <iframe
            ref={iframeRef}
            src={youtubeEmbedUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Custom Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
                onClick={nextVideo}
              >
                <SkipForward className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <div className="w-24">
                  <Slider
                    value={[volume]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                    className="h-1"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
                onClick={toggleFullscreen}
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">{currentVideo.title}</h3>
            <p className="text-sm text-zinc-400">{currentVideo.description}</p>
          </div>
          <div className="flex items-center gap-1">
            {videosToUse.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 w-6 rounded-full ${index === currentVideoIndex ? "bg-amber-500" : "bg-zinc-700"}`}
                onClick={() => setCurrentVideoIndex(index)}
                style={{ cursor: "pointer" }}
              ></div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
