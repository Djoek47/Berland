"use client"

import { SiteHeader } from "@/components/site/chrome"
import { ConnectWallet, useAddress } from "@thirdweb-dev/react"
import { useEffect, useState } from "react"

function WalletSlot() {
  const address = useAddress()
  const [connected, setConnected] = useState(false)
  useEffect(() => setConnected(!!address), [address])

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
      <ConnectWallet
        theme="dark"
        btnTitle="Connect Wallet"
        modalSize="wide"
        welcomeScreen={{
          title: "Welcome to Faberland",
          subtitle: "Connect your wallet to get started",
        }}
        modalTitleIconUrl="/images/mark-star.png"
        modalTitle="Connect Wallet"
        style={{
          height: 34,
          backgroundColor: "var(--fl-gold)",
          color: "var(--fl-on-gold)",
          fontWeight: 600,
          borderRadius: 10,
        }}
      />
      {connected ? null : null}
    </div>
  )
}

/** App-shell header — same overhaul chrome, with wallet for rental flows. */
export default function MetaverseNavbar() {
  return <SiteHeader opaque trailing={<WalletSlot />} />
}
