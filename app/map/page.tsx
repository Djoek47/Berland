import type { Metadata } from "next"
import FaberlandMap from "@/components/map/faberland-map"

export const metadata: Metadata = {
  title: "Faberland Map — Pick your exact store",
  description: "Zoomable top-down map of 48 Faberplots with 3D interiors and rental checkout.",
}

export default function MapPage() {
  return <FaberlandMap />
}
