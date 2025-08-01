"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Search, Building2, Users, MapPin, Briefcase, ArrowRight } from "lucide-react"
import Link from "next/link"

// Mock companies data
const companiesData = [
  {
    id: "1",
    name: "{{companyName1}}",
    slug: "{{companySlug1}}",
    description: "{{companyDescription1}}",
    industry: "{{industry1}}",
    size: "{{companySize1}}",
    location: "{{location1}}",
    openPositions: 5,
  },
  {
    id: "2",
    name: "{{companyName2}}",
    slug: "{{companySlug2}}",
    description: "{{companyDescription2}}",
    industry: "{{industry2}}",
    size: "{{companySize2}}",
    location: "{{location2}}",
    openPositions: 3,
  },
  {
    id: "3",
    name: "{{companyName3}}",
    slug: "{{companySlug3}}",
    description: "{{companyDescription3}}",
    industry: "{{industry3}}",
    size: "{{companySize3}}",
    location: "{{location3}}",
    openPositions: 8,
  },
]

interface Company {
  id: string;
  name: string;
  companyType: string;
  description: string;
  industry: string;
  slug: string;
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    fetchCompanies();
    setMounted(true)
  }, [])

  const fetchCompanies = async () => {
    try {
      const response = await fetch("/api/admin/company");
      if (!response.ok) {
        throw new Error("Failed to fetch companies");
      }
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  }

  // console.log("Companies data:", companies)
  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Navigation */}
      <div className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="font-medium">Companies</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Companies</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Discover amazing companies and explore career opportunities with top employers.
          </p>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search companies or industries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </header>

        {/* Companies Grid */}
        <section aria-labelledby="companies-heading">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <article key={company.id} className="group">
                <Card className="h-full shadow-sm border bg-card hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {company.name}
                        </CardTitle>
                        <CardDescription className="mt-1">{company.industry}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="space-y-4 mb-6">
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {company.description}
                      </p>
                      {/* <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">
                          <Users className="h-3 w-3 mr-1" />
                          {company.size}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          {company.location}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          <Briefcase className="h-3 w-3 mr-1" />
                          {company.openPositions} open positions
                        </Badge>
                      </div> */}
                    </div>
                    <Button asChild className="w-full shadow-sm hover:shadow-md transition-shadow">
                      <Link href={`/companies/${company.slug}`}>
                        View Company
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <Card className="shadow-sm border bg-card">
              <CardContent className="text-center py-12">
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Companies Found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria to find companies.</p>
              </CardContent>
            </Card>
          )}
        </section>
      </main>
    </div>
  )
}
