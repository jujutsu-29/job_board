// import { getCompany } from "@/lib/server/company";
// import { Metadata } from "next";
// import CompanyProfileClient from "@/components/companies/CompanyProfileSingle";

// export const dynamic = "force-static";
// export const revalidate = false;

// export async function generateMetadata(
//   { params }: { params: { slug: string } }
// ): Promise<Metadata> {
//   const company = await getCompany(params.slug);
//   if (!company) return { title: "Company Not Found" };

//   return {
//     title: `${company.name} - Company Profile`,
//     description: company.description,
//     openGraph: {
//       images: company.logo ? [{ url: company.logo }] : [],
//     },
//   };
// }

// export default async function CompanyProfilePage({ params }: { params: { slug: string } }) {
//   const company = await getCompany(params.slug);
//   return <CompanyProfileClient company={company} />;
// }



import { getCompany } from "@/lib/server/company"
import { Metadata } from "next"
import CompanyProfileClient from "@/components/companies/CompanyProfileSingle"
import { notFound } from "next/navigation"

export const dynamic = "force-static"
export const revalidate = false

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {

  const { slug } = await params

  const company = await getCompany(slug)

  if (!company) {
    return { title: "Company Not Found" }
  }

  return {
    title: `${company.name} - Company Profile`,
    description: company.description,
    openGraph: {
      images: company.logo ? [{ url: company.logo }] : [],
    },
  }
}

export default async function CompanyProfilePage(
  { params }: { params: Promise<{ slug: string }> }
) {

  const { slug } = await params

  const company = await getCompany(slug)

  if (!company) {
    notFound()
  }

  return <CompanyProfileClient company={company} />
}