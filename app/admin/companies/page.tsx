"use client"

import { useState, useEffect } from "react"
import { CompaniesHeader } from "@/components/companies/CompaniesHeader"
import { CompaniesGrid } from "@/components/companies/CompaniesGrid"
import { Company } from "@/types/types"

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/admin/company") 
      .then((r) => r.json())
      .then(setCompanies)
  }, [])

  const filtered = companies.filter((c) =>
    `${c.name} ${c.industry}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <CompaniesHeader
        title="Admin: Companies"
        description="Manage your company listings"
        showNewButton={true}
        newButtonHref="/admin/companies/new"
        searchTerm={search}
        onSearchChange={setSearch}
      />
      <main className="container mx-auto px-4 py-8">
        <CompaniesGrid companies={filtered} />
      </main>
    </>
  )
}
