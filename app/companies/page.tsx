"use client"

import { useState, useEffect } from "react"
import { CompaniesHeader } from "@/components/companies/CompaniesHeader"
import { CompaniesGrid } from "@/components/companies/CompaniesGrid"
import { Company } from "@/types/types"

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/company") 
      .then((r) => r.json())
      .then(setCompanies)
  }, [])

  // console.log("Companies:", companies)

  const filtered = companies.filter((c) =>
    `${c.name} ${c.industry}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <CompaniesHeader
        title="Companies"
        description="Discover amazing companies and explore career opportunities."
        showNewButton={false}
        searchTerm={search}
        onSearchChange={setSearch}
      />
      <main className="container mx-auto px-4 py-8">
        <CompaniesGrid companies={filtered} />
      </main>
    </>
  )
}
