import { getCompany } from "@/lib/server/company";
import { Metadata } from "next";
import CompanyProfileClient from "@/components/companies/CompanyProfileSingle";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const company = await getCompany(params.slug);
  if (!company) return { title: "Company Not Found" };

  return {
    title: `${company.name} - Company Profile`,
    description: company.description,
    openGraph: {
      images: company.logo ? [{ url: company.logo }] : [],
    },
  };
}

export default async function CompanyProfilePage({ params }: { params: { slug: string } }) {
  const company = await getCompany(params.slug);
  return <CompanyProfileClient company={company} />;
}