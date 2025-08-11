"use server";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import { createJobWithUniqueSlug, isAdminFunction } from "../utils";
import slugify from "slugify";

export const jobsBySlug = cache(async (slug: string) =>
  await prisma.job.findUnique({
    where: { slug: slug },
    include: { company: true },
  }));

export async function createJob(submitData: any) {
  try {
    const { isAdmin, session } = await isAdminFunction();
    if (!isAdmin) {
      return { success: false, error: "Unauthorized" };
    }

    const {
      title,
      companyName,
      description,
      applyUrl,
      status,
      isFeatured,
      source,
      postedAt,
      expiresAt,
      createdById = session?.user?.id ?? "",
      jobType,
      salary,
      experience,
      requirements,
      basicQualifications,
      keyResponsibilities,
      technicalSkills,
      locationsAvailable,
      tags,
      batches
    } = submitData;

    const existingCompany = await prisma.company.findFirst({
      where: { name: companyName },
    });

    const newCompany = existingCompany || await prisma.company.create({
      data: {
        name: companyName,
        slug: slugify(companyName, { lower: true, strict: true }),
        description: "",
        logo: "",
        website: "",
        companyType: "",
      },
    });

    const job = await createJobWithUniqueSlug(
      {
        title,
        company: { connect: { id: newCompany.id } },
        description,
        applyUrl,
        status,
        isFeatured,
        source,
        createdById,
        jobType,
        salary,
        experience,
        requirements,
        basicQualifications,
        keyResponsibilities,
        technicalSkills,
        locationsAvailable,
        tags,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        postedAt: status === "published" ? new Date() : null,
        batches
      },
      title
    );

    revalidatePath("/jobs");
    revalidatePath("/companies");

    return { success: true, data: job };
  } catch (err: any) {
    console.error("Error in createJob:", err);
    return { success: false, error: err.message || "Internal server error" };
  }
}

export async function updateJob(slug: string, submitData: any) {
  try {
    const { isAdmin } = await isAdminFunction();
    if (!isAdmin) {
      return { success: false, error: "Unauthorized" };
    }

    let company = await prisma.company.findFirst({
      where: { name: submitData.companyName },
    });

    if (!company) {
      company = await prisma.company.create({
        data: {
          name: submitData.companyName,
          slug: submitData.companyName.toLowerCase().replace(/\s+/g, "-"),
          description: "",
          logo: "",
          website: "",
          companyType: "",
        },
      });
    }

    const updatedJob = await prisma.job.update({
      where: { slug },
      data: {
        ...submitData,
        companyId: company.id,
        requirements: Array.isArray(submitData.requirements) ? submitData.requirements : [],
        basicQualifications: Array.isArray(submitData.basicQualifications) ? submitData.basicQualifications : [],
        keyResponsibilities: Array.isArray(submitData.keyResponsibilities) ? submitData.keyResponsibilities : [],
        technicalSkills: Array.isArray(submitData.technicalSkills) ? submitData.technicalSkills : [],
        locationsAvailable: Array.isArray(submitData.locationsAvailable) ? submitData.locationsAvailable : [],
        tags: Array.isArray(submitData.tags) ? submitData.tags : [],
        expiresAt: submitData.expiresAt ? new Date(submitData.expiresAt) : null,
        postedAt:
          submitData.status === "published" && !submitData.postedAt
            ? new Date()
            : submitData.postedAt
            ? new Date(submitData.postedAt)
            : null,
      },
      include: {
        company: { select: { slug: true } },
      },
    });

    revalidatePath("/jobs");
    revalidatePath(`/jobs/${slug}`);
    revalidatePath(`/companies/${updatedJob.company.slug}`);

    return { success: true, data: updatedJob };
  } catch (err: any) {
    console.error("Error in updateJob:", err);
    return { success: false, error: err.message || "Internal server error" };
  }
}
