"use client"
import { useSession } from "next-auth/react"

export default function DebugPage() {
  const { data: session, status } = useSession()

  return (
    <div>
      <h2>Status: {status}</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}
