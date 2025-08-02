import { Company } from "@/types/types"
import { CompanyCard } from "./CompanyCard"

export function CompaniesGrid({ companies }: { companies: Company[] }) {
  if (companies.length === 0) {
    return <p className="text-center text-muted-foreground">No companies found.</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((c) => (
        <CompanyCard key={c.id} company={c} />
      ))}
    </div>
  )
}
