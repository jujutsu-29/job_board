"use client";

import { useState, useEffect } from "react";
import { CompaniesHeader } from "@/components/companies/CompaniesHeader";
import { CompaniesGrid } from "@/components/companies/CompaniesGrid";
import { Company } from "@/types/types";
import Header from "@/components/Header";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/company")
      .then((r) => r.json())
      .then((data) => {
        setCompanies(data);
        setLoading(false);
      });
  }, []);

  const filtered = companies.filter((c) =>
    `${c.name} ${c.industry}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0a1627] transition-colors">
      <Header/>
      <CompaniesHeader
        title="Companies"
        description="Discover amazing companies and explore career opportunities."
        showNewButton={false}
        searchTerm={search}
        onSearchChange={setSearch}
      />
      <main className="container mx-auto px-2 md:px-4 py-8">
        <div className="rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-lg border border-blue-100 dark:border-blue-900/40 p-4 md:p-8">
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
            </div>
          ) : (
            <CompaniesGrid companies={filtered} />
          )}
        </div>
      </main>
    </div>
  );
}
