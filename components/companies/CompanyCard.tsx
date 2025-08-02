import { Building2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Company } from "@/types/types"

export function CompanyCard({ company }: { company: Company }) {
  return (
    <Card className="h-full shadow-sm border bg-card hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl font-semibold text-foreground">{company.name}</CardTitle>
            <CardDescription className="mt-1">{company.industry}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-6">
          {company.description}
        </p>
        <Button asChild className="w-full shadow-sm hover:shadow-md transition-shadow">
          <Link href={`/companies/${company.slug}`} className="flex items-center justify-center">
            View Company <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
