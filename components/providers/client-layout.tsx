"use client"

import { ThirdwebProvider } from "./thirdweb-provider"
import MaintenanceAlert from "@/components/maintenance-alert"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider>
      <MaintenanceAlert />
      {children}
    </ThirdwebProvider>
  )
} 