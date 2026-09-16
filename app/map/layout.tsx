import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Faberland Map",
}

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ height: "100vh", overflow: "hidden", background: "#0A0A09" }}>
      {children}
    </div>
  )
}
