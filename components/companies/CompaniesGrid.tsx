import { Company } from "@/types/types";
import { CompanyCard } from "./CompanyCard";
import { Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function CompaniesGrid({ companies }: { companies: Company[] }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const pathname = usePathname();
  useEffect(() => {
    if (pathname.includes("admin")) {
      setIsAdmin(true);
    }
  }, [pathname]);
  if (companies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Building2 className="h-12 w-12 text-blue-300 dark:text-blue-700 mb-4" />
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          No companies found
        </h3>
        <p className="text-blue-700 dark:text-blue-200">
          Try adjusting your search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {companies.map((c) => (
        <div key={c.id}>
          <CompanyCard company={c} isAdmin={isAdmin} />
        </div>
      ))}
    </div>
  );
}
