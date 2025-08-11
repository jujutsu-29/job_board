"use server"
import { prisma } from "@/lib/prisma";
import { Company, JobFormData } from "@/types/types";
import { auth } from "../auth";
import { isAdminFunction } from "../utils";
import { revalidatePath } from "next/cache";

interface CompanyIndividual {
  name: string;
  website: string;
  description: string;
  companyType: string;
  tags: string[];
  slug: string;
  benefits: string[];
  jobs: {
    title: string;
    jobType: string;
    postedAt: Date;
    slug: string;
  }[];
}

export async function getCompany(slug: string): Promise<CompanyIndividual> {
  const response = await prisma.company.findUnique({
    where: { slug },
    include: {
      jobs: {
        select: {
          title: true,
          jobType: true,
          postedAt: true,
          slug: true,
        },
      },
    },
  });

  if (!response) {
    throw new Error("Company not found");
  }

  return {
    name: response.name,
    website: response.website ?? "",
    description: response.description ?? "",
    companyType: response.companyType ?? "",
    tags: response.tags ?? [],
    slug: response.slug ?? "",
    benefits: response.benefits ?? [],
    jobs: response.jobs.map((job) => ({
      title: job.title,
      jobType: job.jobType ?? "",
      postedAt: job.postedAt ? job.postedAt : new Date(0),
      slug: job.slug,
    })),
  };
}

export async function getCompaniesForWhole(): Promise<Company[]> {
  const response = await prisma.company.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      slug: true,
    },
  });

  if (!response) return [];
  return response.map((company) => ({
    id: company.id,
    name: company.name,
    description: company.description ?? "",
    slug: company.slug ?? "",
  }));
}

export async function editCompany({
  slug,
  formData,
}: {
  slug: string;
  formData: JobFormData;
}) {
  try {
    const { isAdmin, session } = await isAdminFunction();

    if (!isAdmin) {
      throw new Error("Unauthorized");
    }

    const updatedCompany = await prisma.company.update({
      where: { slug },
      data: {
        name: formData.name,
        website: formData.website,
        description: formData.description,
        companyType: formData.companyType,
        tags: formData.tags
          .split("\n")
          .map((tag) => tag.trim())
          .filter(Boolean),
      },
    });

    revalidatePath(`/companies/${slug}`);
    revalidatePath("/companies");
    return { success: true, data: updatedCompany };
  } catch (error) {
    console.error("Error updating company:", error);
    return { success: false, error: "Internal server error" };
  }
}
