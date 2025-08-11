import { getCompaniesForWhole } from "@/lib/server/company";
import CompaniesClient from "@/components/companies/CompanyClient";

export const dynamic = "force-static";
export const revalidate = false;

export default async function CompaniesPage() {
  const companies = await getCompaniesForWhole(); // fetched at build time
  return <CompaniesClient companies={companies} />;
}


