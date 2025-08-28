"use client"

import { ThirdwebProvider as ThirdwebSDKProvider } from "@thirdweb-dev/react"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

export function ThirdwebProvider({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID
  
  // Check if client ID is set
  if (!clientId) {
    console.warn('Thirdweb: NEXT_PUBLIC_THIRDWEB_CLIENT_ID is not set. Wallet connection may not work properly.')
  }
  
  return (
    <ThirdwebSDKProvider
      clientId={clientId || "placeholder-client-id"}
    >
      <VisuallyHidden>
        Thirdweb Provider
      </VisuallyHidden>
      {children}
    </ThirdwebSDKProvider>
  )
} 