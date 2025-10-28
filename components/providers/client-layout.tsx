"use client"

import { ThirdwebProvider } from "./thirdweb-provider"
import OpeningDayAlert from "@/components/maintenance-alert"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider>
      <OpeningDayAlert />
      {children}
    </ThirdwebProvider>
  )
} 