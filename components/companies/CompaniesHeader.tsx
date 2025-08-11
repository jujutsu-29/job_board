'use client'

import { Search, Building2, Briefcase } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface CompaniesHeaderProps {
  title: string
  description: string
  showNewButton: boolean
  newButtonHref?: string
  searchTerm: string
  onSearchChange: (value: string) => void
}

export function CompaniesHeader({
  title,
  description,
  showNewButton,
  newButtonHref,
  searchTerm,
  onSearchChange,
}: CompaniesHeaderProps) {
  return (
    <header className="mb-8">
      <div className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="font-medium">{title}</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Building2 className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h1>
            </div>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>

          {/* {showNewButton && newButtonHref && (
            <Button asChild className="self-start">
              <Link href={newButtonHref} className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Post a New Company</span>
              </Link>
            </Button>
          )} */}
        </div>

        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
    </header>
  )
}
