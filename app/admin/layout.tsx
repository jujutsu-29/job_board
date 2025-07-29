import type React from "react"
import getServerSession from "next-auth"
// import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export default async function AdminLayout(
    {
  children,
}: {
  children: React.ReactNode}){
//   const session = await getServerSession(authOptions)
//   const session = await getServerSession()

//   if (!session || session.user?.role !== "admin") {
//     redirect("/login")
//   }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
