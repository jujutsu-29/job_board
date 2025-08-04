import { Building2, ArrowRight, Edit } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Company } from "@/types/types";

export function CompanyCard({
  company,
  isAdmin,
}: {
  company: Company;
  isAdmin: boolean;
}) {
  return (
    <Card
      className="relative h-full shadow-md border border-blue-100 dark:border-blue-900 bg-white dark:bg-blue-950 rounded-2xl flex flex-col group overflow-hidden transition-all duration-300 hover:shadow-lg"
      style={{
        boxShadow:
          "0 4px 24px 0 rgba(30, 64, 175, 0.06), 0 1.5px 6px 0 rgba(239,68,68,0.04)",
      }}
    >
      {/* Animated accent bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-red-500 to-blue-400 animate-accent-move" />

      <CardHeader className="relative z-10 pb-2">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900 rounded-lg flex items-center justify-center shadow-sm border border-blue-100 dark:border-blue-800">
            <Building2 className="h-6 w-6 text-blue-700 dark:text-blue-200" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-blue-900 dark:text-blue-100">
              {company.name}
            </CardTitle>
            <CardDescription className="text-sm font-medium text-blue-700 dark:text-blue-300">
              {company.industry}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between relative z-10">
        <p className="text-neutral-800 dark:text-blue-100/90 line-clamp-3 mb-6 font-normal text-[1rem]">
          {company.description}
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-2">
          <Button
            asChild
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition-all duration-200"
          >
            <Link target="_blank" href={`/companies/${company.slug}`}>
              View Company <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          {isAdmin && (
            <Button
              asChild
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-blue-500 text-white font-semibold shadow hover:from-red-600 hover:to-blue-600 transition-all duration-200"
            >
              <Link
                target="_blank"
                href={`/admin/companies/edit/${company.slug}`}
              >
                Edit Company <Edit className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          )}
        </div>
      </CardContent>

      {/* Animations and accent bar */}
      <style jsx>{`
        .animate-accent-move {
          background-size: 200% 200%;
          animation: accent-move 4s linear infinite alternate;
        }
        @keyframes accent-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </Card>
  );
}
