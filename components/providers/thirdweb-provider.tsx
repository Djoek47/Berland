"use client"

import { ThirdwebProvider as ThirdwebSDKProvider } from "@thirdweb-dev/react"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

export function ThirdwebProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebSDKProvider
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
    >
      <VisuallyHidden>
        Thirdweb Provider
      </VisuallyHidden>
      {children}
    </ThirdwebSDKProvider>
  )
} 