"use client"

import { ThirdwebProvider } from "./thirdweb-provider"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return <ThirdwebProvider>{children}</ThirdwebProvider>
} 