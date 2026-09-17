"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { ThirdwebProvider } from "./thirdweb-provider"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ThirdwebProvider>{children}</ThirdwebProvider>
    </ThemeProvider>
  )
}
