"use client"

import { useEffect, useRef, useState } from "react"
import { LineChart, BarChart, PieChart, AreaChart } from "lucide-react"

interface DataVisualizationProps {
  title: string
  type: "line" | "bar" | "pie" | "area"
  description: string
}

export function DataVisualization({ title, type, description }: DataVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !isClient) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Generate random data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 80) + 20)

    // Common styles
    ctx.lineWidth = 2
    ctx.font = "12px Inter, sans-serif"

    // Draw based on chart type
    if (type === "line") {
      drawLineChart(ctx, canvas.width, canvas.height, months, data)
    } else if (type === "bar") {
      drawBarChart(ctx, canvas.width, canvas.height, months, data)
    } else if (type === "pie") {
      drawPieChart(ctx, canvas.width, canvas.height, data)
    } else if (type === "area") {
      drawAreaChart(ctx, canvas.width, canvas.height, months, data)
    }
  }, [type, isClient])

  function drawLineChart(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    labels: string[],
    data: number[],
  ) {
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2
    const maxValue = Math.max(...data)

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw grid lines
    ctx.beginPath()
    ctx.setLineDash([5, 5])
    for (let i = 1; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
    }
    ctx.stroke()
    ctx.setLineDash([])

    // Draw data points and lines
    ctx.beginPath()
    ctx.strokeStyle = "#10b981"

    data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index
      const y = height - padding - (value / maxValue) * chartHeight

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      // Draw point
      ctx.fillStyle = "#10b981"
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
    })

    ctx.stroke()

    // Draw labels
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
    ctx.textAlign = "center"
    labels.forEach((label, index) => {
      const x = padding + (chartWidth / (labels.length - 1)) * index
      ctx.fillText(label, x, height - padding + 20)
    })
  }

  function drawBarChart(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    labels: string[],
    data: number[],
  ) {
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2
    const maxValue = Math.max(...data)
    const barWidth = chartWidth / data.length - 10

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw grid lines
    ctx.beginPath()
    ctx.setLineDash([5, 5])
    for (let i = 1; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
    }
    ctx.stroke()
    ctx.setLineDash([])

    // Draw bars
    data.forEach((value, index) => {
      const x = padding + (chartWidth / data.length) * index + 5
      const barHeight = (value / maxValue) * chartHeight
      const y = height - padding - barHeight

      const gradient = ctx.createLinearGradient(x, y, x, height - padding)
      gradient.addColorStop(0, "#3b82f6")
      gradient.addColorStop(1, "#1d4ed8")

      ctx.fillStyle = gradient
      ctx.fillRect(x, y, barWidth, barHeight)
    })

    // Draw labels
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
    ctx.textAlign = "center"
    labels.forEach((label, index) => {
      const x = padding + (chartWidth / data.length) * index + barWidth / 2 + 5
      ctx.fillText(label, x, height - padding + 20)
    })
  }

  function drawPieChart(ctx: CanvasRenderingContext2D, width: number, height: number, data: number[]) {
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 40

    const total = data.reduce((sum, value) => sum + value, 0)
    let startAngle = 0

    const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#f97316", "#eab308", "#14b8a6", "#ef4444"]

    // Draw pie segments
    data.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()

      ctx.fillStyle = colors[index % colors.length]
      ctx.fill()

      // Draw labels for larger segments
      if (value / total > 0.05) {
        const labelAngle = startAngle + sliceAngle / 2
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7)
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7)

        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(`${Math.round((value / total) * 100)}%`, labelX, labelY)
      }

      startAngle += sliceAngle
    })
  }

  function drawAreaChart(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    labels: string[],
    data: number[],
  ) {
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2
    const maxValue = Math.max(...data)

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw grid lines
    ctx.beginPath()
    ctx.setLineDash([5, 5])
    for (let i = 1; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
    }
    ctx.stroke()
    ctx.setLineDash([])

    // Create points array
    const points: [number, number][] = data.map((value, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index
      const y = height - padding - (value / maxValue) * chartHeight
      return [x, y]
    })

    // Draw area
    ctx.beginPath()
    ctx.moveTo(points[0][0], height - padding)
    points.forEach((point) => {
      ctx.lineTo(point[0], point[1])
    })
    ctx.lineTo(points[points.length - 1][0], height - padding)
    ctx.closePath()

    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding)
    gradient.addColorStop(0, "rgba(139, 92, 246, 0.8)")
    gradient.addColorStop(1, "rgba(139, 92, 246, 0.1)")
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw line
    ctx.beginPath()
    ctx.moveTo(points[0][0], points[0][1])
    points.forEach((point) => {
      ctx.lineTo(point[0], point[1])
    })
    ctx.strokeStyle = "#8b5cf6"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw points
    points.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point[0], point[1], 4, 0, Math.PI * 2)
      ctx.fillStyle = "#8b5cf6"
      ctx.fill()
      ctx.strokeStyle = "white"
      ctx.lineWidth = 1
      ctx.stroke()
    })

    // Draw labels
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
    ctx.textAlign = "center"
    labels.forEach((label, index) => {
      const x = padding + (chartWidth / (labels.length - 1)) * index
      ctx.fillText(label, x, height - padding + 20)
    })
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-medium">{title}</h3>
        {type === "line" && <LineChart className="h-5 w-5 text-gray-400" />}
        {type === "bar" && <BarChart className="h-5 w-5 text-gray-400" />}
        {type === "pie" && <PieChart className="h-5 w-5 text-gray-400" />}
        {type === "area" && <AreaChart className="h-5 w-5 text-gray-400" />}
      </div>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      <div className="aspect-video w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  )
}
