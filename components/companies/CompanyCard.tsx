import { Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Company } from "@/types/types";

export function CompanyCard({ company }: { company: Company }) {
  return (
    <Card
      className="relative h-full shadow-md border-0 bg-white/80 dark:bg-blue-950/80 backdrop-blur-md rounded-2xl flex flex-col group overflow-hidden hover:shadow-2xl hover:border-blue-400/70 dark:hover:border-blue-500/70 transition-all duration-300"
      style={{
        boxShadow:
          "0 4px 24px 0 rgba(30, 64, 175, 0.08), 0 1.5px 6px 0 rgba(30, 64, 175, 0.04)",
      }}
    >
      {/* Glassy blue highlight on hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-200/40 via-blue-100/30 to-blue-400/10 dark:from-blue-900/30 dark:via-blue-800/20 dark:to-blue-900/10 rounded-2xl z-0" />
      <CardHeader className="relative z-10">
        <div className="flex items-center space-x-4 mb-2">
          <div className="w-12 h-12 bg-blue-100/80 dark:bg-blue-900/40 rounded-lg flex items-center justify-center shadow-sm">
            <Building2 className="h-6 w-6 text-blue-700 dark:text-blue-300" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-blue-900 dark:text-blue-100">
              {company.name}
            </CardTitle>
            <CardDescription className="text-lg font-medium text-blue-700 dark:text-blue-200">
              {company.industry}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between relative z-10">
        <p className="text-blue-900/80 dark:text-blue-100/80 line-clamp-3 mb-6 font-medium">
          {company.description}
        </p>
        <Button
          asChild
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 shadow-md transition"
        >
          <Link target="_blank" href={`/companies/${company.slug}`}>
            View Company <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
