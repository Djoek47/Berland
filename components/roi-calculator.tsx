"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ROICalculator() {
  // Physical store inputs
  const [physicalRent, setPhysicalRent] = useState(5000)
  const [physicalUtilities, setPhysicalUtilities] = useState(1500)
  const [physicalStaff, setPhysicalStaff] = useState(12000)
  const [physicalMaintenance, setPhysicalMaintenance] = useState(800)
  const [physicalInsurance, setPhysicalInsurance] = useState(500)
  const [physicalInitialCost, setPhysicalInitialCost] = useState(100000)
  const [physicalRenovationCost, setPhysicalRenovationCost] = useState(25000)
  const [physicalRenovationFrequency, setPhysicalRenovationFrequency] = useState(3) // years

  // Virtual store inputs
  const [virtualRent, setVirtualRent] = useState(200)
  const [virtualStaff, setVirtualStaff] = useState(1000)
  const [virtualMaintenance, setVirtualMaintenance] = useState(0)
  const [virtualInsurance, setVirtualInsurance] = useState(50)
  const [virtualInitialCost, setVirtualInitialCost] = useState(3000)
  const [virtualRenovationCost, setVirtualRenovationCost] = useState(500)
  const [virtualRenovationFrequency, setVirtualRenovationFrequency] = useState(1) // years

  // Business metrics
  const [monthlyRevenue, setMonthlyRevenue] = useState(30000)
  const [virtualRevenueBoost, setVirtualRevenueBoost] = useState(10) // percentage
  const [timeframe, setTimeframe] = useState(5) // years
  const [includeInitialCosts, setIncludeInitialCosts] = useState(true)
  const [includeRenovations, setIncludeRenovations] = useState(true)

  // Store type
  const [storeType, setStoreType] = useState("retail")

  // Results
  const [physicalTotalCost, setPhysicalTotalCost] = useState(0)
  const [virtualTotalCost, setVirtualTotalCost] = useState(0)
  const [physicalProfit, setPhysicalProfit] = useState(0)
  const [virtualProfit, setVirtualProfit] = useState(0)
  const [savings, setSavings] = useState(0)
  const [roi, setRoi] = useState(0)
  const [breakEvenMonths, setBreakEvenMonths] = useState(0)

  // Chart refs
  const costChartRef = useRef<HTMLCanvasElement>(null)
  const profitChartRef = useRef<HTMLCanvasElement>(null)
  const breakdownChartRef = useRef<HTMLCanvasElement>(null)

  // Track if component is mounted
  const [isMounted, setIsMounted] = useState(false)

  // Track active tab to know when to render charts
  const [activeTab, setActiveTab] = useState("inputs")

  // Preset configurations for different store types
  const storePresets = {
    retail: {
      physicalRent: 5000,
      physicalUtilities: 1500,
      physicalStaff: 12000,
      physicalMaintenance: 800,
      physicalInsurance: 500,
      physicalInitialCost: 100000,
      physicalRenovationCost: 25000,
      physicalRenovationFrequency: 3,
      virtualRent: 200,
      virtualStaff: 1000,
      virtualMaintenance: 0,
      virtualInsurance: 50,
      virtualInitialCost: 3000,
      virtualRenovationCost: 500,
      virtualRenovationFrequency: 1,
      monthlyRevenue: 30000,
      virtualRevenueBoost: 10,
    },
    fashion: {
      physicalRent: 8000,
      physicalUtilities: 2000,
      physicalStaff: 15000,
      physicalMaintenance: 1200,
      physicalInsurance: 800,
      physicalInitialCost: 150000,
      physicalRenovationCost: 40000,
      physicalRenovationFrequency: 2,
      virtualRent: 300,
      virtualStaff: 1500,
      virtualMaintenance: 0,
      virtualInsurance: 80,
      virtualInitialCost: 5000,
      virtualRenovationCost: 800,
      virtualRenovationFrequency: 0.5,
      monthlyRevenue: 45000,
      virtualRevenueBoost: 15,
    },
    furniture: {
      physicalRent: 12000,
      physicalUtilities: 3000,
      physicalStaff: 10000,
      physicalMaintenance: 1500,
      physicalInsurance: 1200,
      physicalInitialCost: 200000,
      physicalRenovationCost: 50000,
      physicalRenovationFrequency: 5,
      virtualRent: 350,
      virtualStaff: 1200,
      virtualMaintenance: 0,
      virtualInsurance: 100,
      virtualInitialCost: 8000,
      virtualRenovationCost: 1000,
      virtualRenovationFrequency: 1,
      monthlyRevenue: 60000,
      virtualRevenueBoost: 20,
    },
    electronics: {
      physicalRent: 7000,
      physicalUtilities: 2500,
      physicalStaff: 18000,
      physicalMaintenance: 1000,
      physicalInsurance: 1500,
      physicalInitialCost: 180000,
      physicalRenovationCost: 35000,
      physicalRenovationFrequency: 2,
      virtualRent: 400,
      virtualStaff: 2000,
      virtualMaintenance: 0,
      virtualInsurance: 150,
      virtualInitialCost: 10000,
      virtualRenovationCost: 1500,
      virtualRenovationFrequency: 1,
      monthlyRevenue: 80000,
      virtualRevenueBoost: 12,
    },
    merch: {
      physicalRent: 3500,
      physicalUtilities: 1000,
      physicalStaff: 8000,
      physicalMaintenance: 500,
      physicalInsurance: 400,
      physicalInitialCost: 60000,
      physicalRenovationCost: 15000,
      physicalRenovationFrequency: 3,
      virtualRent: 150,
      virtualStaff: 800,
      virtualMaintenance: 0,
      virtualInsurance: 40,
      virtualInitialCost: 2500,
      virtualRenovationCost: 400,
      virtualRenovationFrequency: 1,
      monthlyRevenue: 20000,
      virtualRevenueBoost: 25,
    },
  }

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true)

    // Initial calculation
    calculateResults()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Apply preset when store type changes
  useEffect(() => {
    const preset = storePresets[storeType as keyof typeof storePresets]
    if (preset) {
      setPhysicalRent(preset.physicalRent)
      setPhysicalUtilities(preset.physicalUtilities)
      setPhysicalStaff(preset.physicalStaff)
      setPhysicalMaintenance(preset.physicalMaintenance)
      setPhysicalInsurance(preset.physicalInsurance)
      setPhysicalInitialCost(preset.physicalInitialCost)
      setPhysicalRenovationCost(preset.physicalRenovationCost)
      setPhysicalRenovationFrequency(preset.physicalRenovationFrequency)
      setVirtualRent(preset.virtualRent)
      setVirtualStaff(preset.virtualStaff)
      setVirtualMaintenance(preset.virtualMaintenance)
      setVirtualInsurance(preset.virtualInsurance)
      setVirtualInitialCost(preset.virtualInitialCost)
      setVirtualRenovationCost(preset.virtualRenovationCost)
      setVirtualRenovationFrequency(preset.virtualRenovationFrequency)
      setMonthlyRevenue(preset.monthlyRevenue)
      setVirtualRevenueBoost(preset.virtualRevenueBoost)
    }
  }, [storeType])

  // Calculate results whenever inputs change
  useEffect(() => {
    if (isMounted) {
      calculateResults()
    }
  }, [
    physicalRent,
    physicalUtilities,
    physicalStaff,
    physicalMaintenance,
    physicalInsurance,
    physicalInitialCost,
    physicalRenovationCost,
    physicalRenovationFrequency,
    virtualRent,
    virtualStaff,
    virtualMaintenance,
    virtualInsurance,
    virtualInitialCost,
    virtualRenovationCost,
    virtualRenovationFrequency,
    monthlyRevenue,
    virtualRevenueBoost,
    timeframe,
    includeInitialCosts,
    includeRenovations,
    isMounted,
  ])

  // Draw charts when results change or when switching to visualizations tab
  useEffect(() => {
    if (isMounted && activeTab === "visualizations") {
      // Use setTimeout to ensure the canvas elements are fully rendered
      const timer = setTimeout(() => {
        drawCostComparisonChart()
        drawProfitComparisonChart()
        drawCostBreakdownChart()
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [physicalTotalCost, virtualTotalCost, physicalProfit, virtualProfit, activeTab, isMounted])

  // Calculate all results
  const calculateResults = () => {
    // Monthly costs
    const physicalMonthlyCost =
      physicalRent + physicalUtilities + physicalStaff + physicalMaintenance + physicalInsurance
    const virtualMonthlyCost = virtualRent + virtualStaff + virtualMaintenance + virtualInsurance

    // Calculate renovation costs over the timeframe
    let physicalRenovationTotal = 0
    let virtualRenovationTotal = 0

    if (includeRenovations) {
      // Calculate how many renovations would occur in the timeframe
      const physicalRenovations = Math.floor(timeframe / physicalRenovationFrequency)
      const virtualRenovations = Math.floor(timeframe / virtualRenovationFrequency)

      physicalRenovationTotal = physicalRenovations * physicalRenovationCost
      virtualRenovationTotal = virtualRenovations * virtualRenovationCost
    }

    // Calculate initial costs if included
    const physicalInitial = includeInitialCosts ? physicalInitialCost : 0
    const virtualInitial = includeInitialCosts ? virtualInitialCost : 0

    // Calculate total costs over the timeframe
    const physicalTotal = physicalMonthlyCost * timeframe * 12 + physicalInitial + physicalRenovationTotal
    const virtualTotal = virtualMonthlyCost * timeframe * 12 + virtualInitial + virtualRenovationTotal

    // Calculate revenue and profit
    const physicalTotalRevenue = monthlyRevenue * timeframe * 12
    const virtualTotalRevenue = monthlyRevenue * (1 + virtualRevenueBoost / 100) * timeframe * 12

    const physicalTotalProfit = physicalTotalRevenue - physicalTotal
    const virtualTotalProfit = virtualTotalRevenue - virtualTotal

    // Calculate savings, ROI, and break-even point
    const totalSavings = physicalTotal - virtualTotal
    const calculatedRoi = (totalSavings / virtualTotal) * 100

    // Break-even calculation (months until virtual store setup costs are recovered from monthly savings)
    const monthlySavings = physicalMonthlyCost - virtualMonthlyCost
    const virtualSetupCost = virtualInitial
    const calculatedBreakEven = monthlySavings > 0 ? virtualSetupCost / monthlySavings : 0

    // Update state with calculated values
    setPhysicalTotalCost(physicalTotal)
    setVirtualTotalCost(virtualTotal)
    setPhysicalProfit(physicalTotalProfit)
    setVirtualProfit(virtualTotalProfit)
    setSavings(totalSavings)
    setRoi(calculatedRoi)
    setBreakEvenMonths(calculatedBreakEven)
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Draw cost comparison chart
  const drawCostComparisonChart = () => {
    const canvas = costChartRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions based on its container
    const container = canvas.parentElement
    if (!container) return

    canvas.width = container.clientWidth
    canvas.height = container.clientHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const width = canvas.width
    const height = canvas.height
    const padding = 40
    const barWidth = 80
    const spacing = 40

    // Calculate bar heights
    const maxValue = Math.max(physicalTotalCost, virtualTotalCost, 1) // Prevent division by zero
    const physicalBarHeight = (physicalTotalCost / maxValue) * (height - padding * 2)
    const virtualBarHeight = (virtualTotalCost / maxValue) * (height - padding * 2)

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw physical store bar
    const physicalX = width / 2 - spacing - barWidth
    const physicalY = height - padding - physicalBarHeight

    const physicalGradient = ctx.createLinearGradient(physicalX, physicalY, physicalX, height - padding)
    physicalGradient.addColorStop(0, "rgba(239, 68, 68, 0.8)")
    physicalGradient.addColorStop(1, "rgba(239, 68, 68, 0.4)")

    ctx.fillStyle = physicalGradient
    ctx.fillRect(physicalX, physicalY, barWidth, physicalBarHeight)

    // Draw virtual store bar
    const virtualX = width / 2 + spacing
    const virtualY = height - padding - virtualBarHeight

    const virtualGradient = ctx.createLinearGradient(virtualX, virtualY, virtualX, height - padding)
    virtualGradient.addColorStop(0, "rgba(16, 185, 129, 0.8)")
    virtualGradient.addColorStop(1, "rgba(16, 185, 129, 0.4)")

    ctx.fillStyle = virtualGradient
    ctx.fillRect(virtualX, virtualY, barWidth, virtualBarHeight)

    // Draw labels
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.font = "12px Inter, sans-serif"

    // Physical store label
    ctx.fillText("Physical Store", physicalX + barWidth / 2, height - padding + 20)
    ctx.fillText(formatCurrency(physicalTotalCost), physicalX + barWidth / 2, physicalY - 10)

    // Virtual store label
    ctx.fillText("Virtual Store", virtualX + barWidth / 2, height - padding + 20)
    ctx.fillText(formatCurrency(virtualTotalCost), virtualX + barWidth / 2, virtualY - 10)

    // Draw title
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.font = "14px Inter, sans-serif"
    ctx.fillText(`${timeframe}-Year Total Cost Comparison`, width / 2, 20)
  }

  // Draw profit comparison chart
  const drawProfitComparisonChart = () => {
    const canvas = profitChartRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions based on its container
    const container = canvas.parentElement
    if (!container) return

    canvas.width = container.clientWidth
    canvas.height = container.clientHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const width = canvas.width
    const height = canvas.height
    const padding = 40
    const barWidth = 80
    const spacing = 40

    // Calculate bar heights
    const maxValue = Math.max(physicalProfit, virtualProfit, 1) // Prevent division by zero
    const physicalBarHeight = (physicalProfit / maxValue) * (height - padding * 2)
    const virtualBarHeight = (virtualProfit / maxValue) * (height - padding * 2)

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw physical store bar
    const physicalX = width / 2 - spacing - barWidth
    const physicalY = height - padding - physicalBarHeight

    const physicalGradient = ctx.createLinearGradient(physicalX, physicalY, physicalX, height - padding)
    physicalGradient.addColorStop(0, "rgba(59, 130, 246, 0.8)")
    physicalGradient.addColorStop(1, "rgba(59, 130, 246, 0.4)")

    ctx.fillStyle = physicalGradient
    ctx.fillRect(physicalX, physicalY, barWidth, physicalBarHeight)

    // Draw virtual store bar
    const virtualX = width / 2 + spacing
    const virtualY = height - padding - virtualBarHeight

    const virtualGradient = ctx.createLinearGradient(virtualX, virtualY, virtualX, height - padding)
    virtualGradient.addColorStop(0, "rgba(139, 92, 246, 0.8)")
    virtualGradient.addColorStop(1, "rgba(139, 92, 246, 0.4)")

    ctx.fillStyle = virtualGradient
    ctx.fillRect(virtualX, virtualY, barWidth, virtualBarHeight)

    // Draw labels
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.font = "12px Inter, sans-serif"

    // Physical store label
    ctx.fillText("Physical Store", physicalX + barWidth / 2, height - padding + 20)
    ctx.fillText(formatCurrency(physicalProfit), physicalX + barWidth / 2, physicalY - 10)

    // Virtual store label
    ctx.fillText("Virtual Store", virtualX + barWidth / 2, height - padding + 20)
    ctx.fillText(formatCurrency(virtualProfit), virtualX + barWidth / 2, virtualY - 10)

    // Draw title
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.font = "14px Inter, sans-serif"
    ctx.fillText(`${timeframe}-Year Total Profit Comparison`, width / 2, 20)
  }

  // Draw cost breakdown chart
  const drawCostBreakdownChart = () => {
    const canvas = breakdownChartRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions based on its container
    const container = canvas.parentElement
    if (!container) return

    canvas.width = container.clientWidth
    canvas.height = container.clientHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 40

    // Physical store cost breakdown
    const physicalRentTotal = physicalRent * timeframe * 12
    const physicalUtilitiesTotal = physicalUtilities * timeframe * 12
    const physicalStaffTotal = physicalStaff * timeframe * 12
    const physicalMaintenanceTotal = physicalMaintenance * timeframe * 12
    const physicalInsuranceTotal = physicalInsurance * timeframe * 12
    const physicalSetupTotal = includeInitialCosts ? physicalInitialCost : 0
    const physicalRenovationTotal = includeRenovations
      ? Math.floor(timeframe / physicalRenovationFrequency) * physicalRenovationCost
      : 0

    const physicalCosts = [
      { name: "Rent", value: physicalRentTotal, color: "rgba(239, 68, 68, 0.8)" },
      { name: "Utilities", value: physicalUtilitiesTotal, color: "rgba(249, 115, 22, 0.8)" },
      { name: "Staff", value: physicalStaffTotal, color: "rgba(234, 179, 8, 0.8)" },
      { name: "Maintenance", value: physicalMaintenanceTotal, color: "rgba(16, 185, 129, 0.8)" },
      { name: "Insurance", value: physicalInsuranceTotal, color: "rgba(59, 130, 246, 0.8)" },
      { name: "Setup", value: physicalSetupTotal, color: "rgba(139, 92, 246, 0.8)" },
      { name: "Renovation", value: physicalRenovationTotal, color: "rgba(236, 72, 153, 0.8)" },
    ].filter((cost) => cost.value > 0) // Only include costs with positive values

    // Draw pie chart
    let startAngle = 0
    const total = physicalTotalCost || 1 // Prevent division by zero

    physicalCosts.forEach((cost) => {
      const sliceAngle = (cost.value / total) * 2 * Math.PI

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()

      ctx.fillStyle = cost.color
      ctx.fill()

      // Draw labels for larger segments
      if (cost.value / total > 0.05) {
        const labelAngle = startAngle + sliceAngle / 2
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7)
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7)

        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.font = "12px Inter, sans-serif"
        ctx.fillText(`${Math.round((cost.value / total) * 100)}%`, labelX, labelY)
      }

      startAngle += sliceAngle
    })

    // Draw title
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.font = "14px Inter, sans-serif"
    ctx.fillText("Physical Store Cost Breakdown", width / 2, 20)

    // Draw legend
    const legendX = 10
    let legendY = height - 120
    ctx.textAlign = "left"
    ctx.font = "10px Inter, sans-serif"

    physicalCosts.forEach((cost) => {
      ctx.fillStyle = cost.color
      ctx.fillRect(legendX, legendY, 10, 10)

      ctx.fillStyle = "white"
      ctx.fillText(`${cost.name}: ${formatCurrency(cost.value)}`, legendX + 15, legendY + 5)

      legendY += 15
    })
  }

  // Reset to defaults
  const resetToDefaults = () => {
    const preset = storePresets[storeType as keyof typeof storePresets]
    if (preset) {
      setPhysicalRent(preset.physicalRent)
      setPhysicalUtilities(preset.physicalUtilities)
      setPhysicalStaff(preset.physicalStaff)
      setPhysicalMaintenance(preset.physicalMaintenance)
      setPhysicalInsurance(preset.physicalInsurance)
      setPhysicalInitialCost(preset.physicalInitialCost)
      setPhysicalRenovationCost(preset.physicalRenovationCost)
      setPhysicalRenovationFrequency(preset.physicalRenovationFrequency)
      setVirtualRent(preset.virtualRent)
      setVirtualStaff(preset.virtualStaff)
      setVirtualMaintenance(preset.virtualMaintenance)
      setVirtualInsurance(preset.virtualInsurance)
      setVirtualInitialCost(preset.virtualInitialCost)
      setVirtualRenovationCost(preset.virtualRenovationCost)
      setVirtualRenovationFrequency(preset.virtualRenovationFrequency)
      setMonthlyRevenue(preset.monthlyRevenue)
      setVirtualRevenueBoost(preset.virtualRevenueBoost)
      setTimeframe(5)
      setIncludeInitialCosts(true)
      setIncludeRenovations(true)
    }
  }

  // Handle export results
  const handleExportResults = () => {
    // Create a text summary of the results
    const summary = `
      Faberland Virtual Store ROI Analysis
      ===================================
      
      COMPARISON OVER ${timeframe} YEARS
      
      Physical Store Total Costs: ${formatCurrency(physicalTotalCost)}
      Virtual Store Total Costs: ${formatCurrency(virtualTotalCost)}
      
      Cost Savings: ${formatCurrency(savings)} (${((savings / physicalTotalCost) * 100).toFixed(1)}%)
      
      Physical Store Profit: ${formatCurrency(physicalProfit)}
      Virtual Store Profit: ${formatCurrency(virtualProfit)}
      Profit Increase: ${formatCurrency(virtualProfit - physicalProfit)}
      
      Return on Investment: ${roi.toFixed(1)}%
      Break-even Point: ${Math.ceil(breakEvenMonths)} months
      
      Generated on ${new Date().toLocaleDateString()}
    `

    // Create a blob and download it
    const blob = new Blob([summary], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `Faberland_ROI_Analysis_${storeType}_${timeframe}yr.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)

    // If switching to visualizations tab, render charts after a short delay
    if (value === "visualizations") {
      setTimeout(() => {
        drawCostComparisonChart()
        drawProfitComparisonChart()
        drawCostBreakdownChart()
      }, 100)
    }
  }

  return (
    <div className="w-full">
      <Card className="border-amber-700/30 bg-black/40 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Calculator className="h-6 w-6 text-amber-400" />
            <span>Metaverse Store ROI Calculator</span>
          </CardTitle>
          <CardDescription className="text-white">
            Compare the costs and returns of a physical retail store versus a virtual store in Faberland
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inputs" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-3 bg-zinc-900">
              <TabsTrigger value="inputs" className="text-white">Calculator Inputs</TabsTrigger>
              <TabsTrigger value="results" className="text-white">Results & Analysis</TabsTrigger>
              <TabsTrigger value="visualizations" className="text-white">Data Visualizations</TabsTrigger>
            </TabsList>

            <TabsContent value="inputs" className="space-y-6 pt-4">
              <div className="flex flex-col gap-6">
                {/* Store Type Selection */}
                <div className="space-y-2">
                  <Label htmlFor="store-type" className="text-white">Store Type</Label>
                  <Select value={storeType} onValueChange={setStoreType}>
                    <SelectTrigger id="store-type" className="border-amber-700/30 bg-black/60 text-white">
                      <SelectValue placeholder="Select store type" className="text-white"/>
                    </SelectTrigger>
                    <SelectContent className="border-amber-700/30 bg-zinc-900 text-white">
                      <SelectItem value="retail">General Retail</SelectItem>
                      <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                      <SelectItem value="furniture">Furniture & Home Decor</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="merch">Merchandise Store (like Faberstore)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Business Metrics */}
                <div className="rounded-lg border border-amber-700/30 bg-zinc-900/50 p-4">
                  <h3 className="mb-4 text-lg font-semibold text-amber-400">Business Metrics</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="monthly-revenue" className="text-white">Monthly Revenue (Physical Store)</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-white">$</span>
                        <Input
                          id="monthly-revenue"
                          type="number"
                          value={monthlyRevenue}
                          onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                          className="border-amber-700/30 bg-black/60 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="virtual-boost" className="text-white">
                        Virtual Revenue Boost (%)
                        <span className="ml-1 text-xs text-white">Due to 24/7 availability and global reach</span>
                      </Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id="virtual-boost"
                          min={0}
                          max={50}
                          step={1}
                          value={[virtualRevenueBoost]}
                          onValueChange={(value) => setVirtualRevenueBoost(value[0])}
                          className="flex-grow"
                        />
                        <span className="w-12 text-right text-amber-400">{virtualRevenueBoost}%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeframe" className="text-white">Calculation Timeframe (Years)</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id="timeframe"
                          min={1}
                          max={10}
                          step={1}
                          value={[timeframe]}
                          onValueChange={(value) => setTimeframe(value[0])}
                          className="flex-grow"
                        />
                        <span className="w-12 text-right text-amber-400">{timeframe} yrs</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between space-y-0 pt-4">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="include-initial"
                            checked={includeInitialCosts}
                            onCheckedChange={setIncludeInitialCosts}
                          />
                          <Label htmlFor="include-initial" className="text-white">Include initial setup costs</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="include-renovations"
                            checked={includeRenovations}
                            onCheckedChange={setIncludeRenovations}
                          />
                          <Label htmlFor="include-renovations" className="text-white">Include renovation costs</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Physical Store Costs */}
                <div className="rounded-lg border border-red-700/30 bg-zinc-900/50 p-4">
                  <h3 className="mb-4 text-lg font-semibold text-red-400">Physical Store Costs</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="physical-rent" className="text-white">Monthly Rent/Mortgage</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-white">$</span>
                        <Input
                          id="physical-rent"
                          type="number"
                          value={physicalRent}
                          onChange={(e) => setPhysicalRent(Number(e.target.value))}
                          className="border-red-700/30 bg-black/60 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="physical-utilities" className="text-white">Monthly Utilities</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-white">$</span>
                        <Input
                          id="physical-utilities"
                          type="number"
                          value={physicalUtilities}
                          onChange={(e) => setPhysicalUtilities(Number(e.target.value))}
                          className="border-red-700/30 bg-black/60 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="physical-staff" className="text-white">Monthly Staff Costs</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-white">$</span>
                        <Input
                          id="physical-staff"
                          type="number"
                          value={physicalStaff}
                          onChange={(e) => setPhysicalStaff(Number(e.target.value))}
                          className="border-red-700/30 bg-black/60 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="physical-maintenance" className="text-white">Monthly Maintenance</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-white">$</span>
                        <Input
                          id="physical-maintenance"
                          type="number"
                          value={physicalMaintenance}
                          onChange={(e) => setPhysicalMaintenance(Number(e.target.value))}
                          className="border-red-700/30 bg-black/60 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="physical-insurance" className="text-white">Monthly Insurance</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-white">$</span>
                        <Input
                          id="physical-insurance"
                          type="number"
                          value={physicalInsurance}
                          onChange={(e) => setPhysicalInsurance(Number(e.target.value))}
                          className="border-red-700/30 bg-black/60 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="physical-initial" className="text-white">Initial Setup Cost</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-white">$</span>
                        <Input
                          id="physical-initial"
                          type="number"
                          value={physicalInitialCost}
                          onChange={(e) => setPhysicalInitialCost(Number(e.target.value))}
                          className="border-red-700/30 bg-black/60 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="physical-renovation" className="text-white">Renovation Cost</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-white">$</span>
                        <Input
                          id="physical-renovation"
                          type="number"
                          value={physicalRenovationCost}
                          onChange={(e) => setPhysicalRenovationCost(Number(e.target.value))}
                          className="border-red-700/30 bg-black/60 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="physical-renovation-freq" className="text-white">Renovation Frequency (Years)</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="physical-renovation-freq"
                          type="number"
                          value={physicalRenovationFrequency}
                          onChange={(e) => setPhysicalRenovationFrequency(Number(e.target.value))}
                          className="border-red-700/30 bg-black/60 text-white"
                        />
                        <span className="text-white">yrs</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Virtual Store Costs */}
                <div className="rounded-lg border border-green-700/30 bg-zinc-900/50 p-4">
                  <h3 className="mb-4 text-lg font-semibold text-green-400">Virtual Store Costs</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="virtual-rent" className="text-white">Monthly Virtual Space Rent</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-white">$</span>
                        <Input
                          id="virtual-rent"
                          type="number"
                          value={virtualRent}
                          onChange={(e) => setVirtualRent(Number(e.target.value))}
                          className="border-green-700/30 bg-black/60 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="virtual-staff" className="text-white">Monthly Support Staff (Optional)</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-white">$</span>
                        <Input
                          id="virtual-staff"
                          type="number"
                          value={virtualStaff}
                          onChange={(e) => setVirtualStaff(Number(e.target.value))}
                          className="border-green-700/30 bg-black/60 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="virtual-maintenance" className="text-white">Monthly Maintenance</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-white">$</span>
                        <Input
                          id="virtual-maintenance"
                          type="number"
                          value={virtualMaintenance}
                          onChange={(e) => setVirtualMaintenance(Number(e.target.value))}
                          className="border-green-700/30 bg-black/60 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="virtual-insurance" className="text-white">Monthly Insurance (Optional)</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-white">$</span>
                        <Input
                          id="virtual-insurance"
                          type="number"
                          value={virtualInsurance}
                          onChange={(e) => setVirtualInsurance(Number(e.target.value))}
                          className="border-green-700/30 bg-black/60 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="virtual-initial" className="text-white">Initial Setup Cost</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-white">$</span>
                        <Input
                          id="virtual-initial"
                          type="number"
                          value={virtualInitialCost}
                          onChange={(e) => setVirtualInitialCost(Number(e.target.value))}
                          className="border-green-700/30 bg-black/60 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="virtual-renovation" className="text-white">Renovation Cost</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-white">$</span>
                        <Input
                          id="virtual-renovation"
                          type="number"
                          value={virtualRenovationCost}
                          onChange={(e) => setVirtualRenovationCost(Number(e.target.value))}
                          className="border-green-700/30 bg-black/60 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="virtual-renovation-freq" className="text-white">Renovation Frequency (Years)</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="virtual-renovation-freq"
                          type="number"
                          value={virtualRenovationFrequency}
                          onChange={(e) => setVirtualRenovationFrequency(Number(e.target.value))}
                          className="border-green-700/30 bg-black/60 text-white"
                        />
                        <span className="text-white">yrs</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <Button
                    variant="outline"
                    className="border-amber-500 text-amber-400 hover:bg-amber-950/20"
                    onClick={resetToDefaults}
                  >
                    Reset to Defaults
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-6 pt-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Cost Comparison</CardTitle>
                    <CardDescription className="text-white">
                      Total costs over {timeframe} {timeframe === 1 ? "year" : "years"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white">Physical Store Total Cost:</span>
                        <span className="text-xl font-bold text-red-400">{formatCurrency(physicalTotalCost)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white">Virtual Store Total Cost:</span>
                        <span className="text-xl font-bold text-green-400">{formatCurrency(virtualTotalCost)}</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
                        <span className="text-white">Cost Savings with Virtual Store:</span>
                        <span className="text-xl font-bold text-amber-400">{formatCurrency(savings)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white">Savings Percentage:</span>
                        <span className="text-lg font-bold text-amber-400">
                          {((savings / (physicalTotalCost || 1)) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Profit Comparison</CardTitle>
                    <CardDescription className="text-white">
                      Total profits over {timeframe} {timeframe === 1 ? "year" : "years"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white">Physical Store Revenue:</span>
                        <span className="text-lg font-bold text-blue-400">
                          {formatCurrency(monthlyRevenue * timeframe * 12)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white">Virtual Store Revenue:</span>
                        <span className="text-lg font-bold text-purple-400">
                          {formatCurrency(monthlyRevenue * (1 + virtualRevenueBoost / 100) * timeframe * 12)}
                        </span>
                      </div>
                      <div className="border-t border-zinc-800 pt-4"></div>
                      <div className="flex items-center justify-between">
                        <span className="text-white">Physical Store Profit:</span>
                        <span className="text-lg font-bold text-blue-400">{formatCurrency(physicalProfit)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white">Virtual Store Profit:</span>
                        <span className="text-lg font-bold text-purple-400">{formatCurrency(virtualProfit)}</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
                        <span className="text-white">Profit Increase:</span>
                        <span className="text-xl font-bold text-amber-400">
                          {formatCurrency(virtualProfit - physicalProfit)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-xl text-white">ROI Analysis</CardTitle>
                  <CardDescription className="text-white">Return on investment and break-even analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-4 text-lg font-semibold text-amber-400">Key Metrics</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-white">Return on Investment (ROI):</span>
                            <span className="text-xl font-bold text-amber-400">{roi.toFixed(1)}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white">Break-even Point:</span>
                            <span className="text-xl font-bold text-amber-400">{Math.ceil(breakEvenMonths)} months</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white">Monthly Savings:</span>
                            <span className="text-lg font-bold text-green-400">
                              {formatCurrency(
                                physicalRent +
                                  physicalUtilities +
                                  physicalStaff +
                                  physicalMaintenance +
                                  physicalInsurance -
                                  (virtualRent + virtualStaff + virtualMaintenance + virtualInsurance),
                              )}
                            </span>
                          </div>
                        </div>
                    </div>
                    <div>
                      <h4 className="mb-4 text-lg font-semibold text-amber-400">Conclusion</h4>
                      <p className="mb-4 text-white">
                        {roi > 100
                          ? "The virtual store provides an exceptional return on investment."
                          : roi > 50
                            ? "The virtual store provides a strong return on investment."
                            : roi > 20
                              ? "The virtual store provides a good return on investment."
                              : "The virtual store provides a positive return on investment."}{" "}
                        {breakEvenMonths < 6
                          ? "You'll recover your initial investment very quickly."
                          : breakEvenMonths < 12
                            ? "You'll recover your initial investment within a year."
                            : `You'll recover your initial investment in ${Math.ceil(breakEvenMonths / 12)} years.`}
                      </p>
                      <Button
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold"
                        onClick={handleExportResults}
                      >
                        Export Results
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="visualizations" className="space-y-6 pt-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Cost Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full">
                      <canvas ref={costChartRef} className="h-full w-full"></canvas>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Profit Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full">
                      <canvas ref={profitChartRef} className="h-full w-full"></canvas>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-amber-700/30 bg-zinc-900/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Physical Store Cost Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <canvas ref={breakdownChartRef} className="h-full w-full"></canvas>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
