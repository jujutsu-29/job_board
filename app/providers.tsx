"use client"

import { GA_MEASUREMENT_ID, pageview } from "@/lib/gtag"
import { SessionProvider } from "next-auth/react"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return
    pageview(pathname)
  }, [pathname])

  return <SessionProvider>{children}</SessionProvider>
}
