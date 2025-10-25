"use server";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import { createJobWithUniqueSlug, isAdminFunction } from "../utils";
import slugify from "slugify";
import { getJobDetailsFromUrl, rephraseItStructured } from "./gemini";

export const jobsBySlug = cache(async (slug: string) =>
  await prisma.job.findUnique({
    where: { slug: slug },
    include: { company: true },
  }));

export async function createJob(submitData: any, state: boolean) {
  try {
    const { isAdmin, session } = await isAdminFunction();
    if (!isAdmin) {
      return { success: false, error: "Unauthorized" };
    }

    let job = null;
    if(!state) {
    const {
      title,
      image,
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

    
    const rephrasedJobData = await rephraseItStructured({
      title,
      description,
      requirements,
      keyResponsibilities,
      basicQualifications,
    });

    let rephrasedTitle = rephrasedJobData.title ?? title;
    let rephrasedDescription = rephrasedJobData.description ?? description;
    let rephrasedRequirements = rephrasedJobData.requirements ?? requirements;
    let rephrasedBasicQualifications = rephrasedJobData.basicQualifications ?? basicQualifications;
    let rephrasedKeyResponsibilities = rephrasedJobData.keyResponsibilities ?? keyResponsibilities;

    job = await createJobWithUniqueSlug(
      {
        title: rephrasedTitle,
        company: { connect: { id: newCompany.id } },
        image,
        description: rephrasedDescription,
        applyUrl,
        status,
        isFeatured,
        source,
        createdById,
        jobType,
        salary,
        experience,
        requirements: rephrasedRequirements,
        basicQualifications: rephrasedBasicQualifications,
        keyResponsibilities: rephrasedKeyResponsibilities,
        technicalSkills,
        locationsAvailable,
        tags,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        postedAt: status === "published" ? new Date() : null,
        batches
      },
      title
    );
  } else {
    const dataFromGemini = await getJobDetailsFromUrl(submitData);
    const company = dataFromGemini.company;

    const existingCompany = await prisma.company.findFirst({
      where: { name: company },
    });
    const newCompany = existingCompany || await prisma.company.create({
      data: {
        name: company,
        slug: slugify(company, { lower: true, strict: true }),
        description: "",
        logo: "",
        website: dataFromGemini.companyWebsite || "",
        companyType: "",
      },
    });

    job = await createJobWithUniqueSlug(
      {
       title: dataFromGemini.title,
        company: { connect: { id: newCompany.id } },
        // image,
        description: dataFromGemini.description,
        applyUrl: dataFromGemini.applyUrl,
        // status,
        // isFeatured,
        // source,
        // createdById,
        jobType: dataFromGemini.jobType,
        salary: dataFromGemini.salary,
        experience: dataFromGemini.experience,
        requirements: dataFromGemini.requirements,
        basicQualifications: dataFromGemini.basicQualifications,
        keyResponsibilities: dataFromGemini.keyResponsibilities,
        technicalSkills: dataFromGemini.technicalSkills,
        locationsAvailable: dataFromGemini.locationsAvailable,
        tags: dataFromGemini.tags,
        // expiresAt: expiresAt ? new Date(expiresAt) : null,
        // postedAt: status === "published" ? new Date() : null,
        // batches
      },
      dataFromGemini.title
    );
  }
    revalidatePath("/jobs");
    revalidatePath("/companies");

    return { success: true };
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

    const { companyName, ...jobData } = submitData;

    let company = await prisma.company.findFirst({
      where: { name: companyName },
    });

    if (!company) {
      company = await prisma.company.create({
        data: {
          name: companyName,
          slug: companyName.toLowerCase().replace(/\s+/g, "-"),
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
        ...jobData,
        companyId: company.id,
        requirements: Array.isArray(jobData.requirements) ? jobData.requirements : [],
        basicQualifications: Array.isArray(jobData.basicQualifications) ? jobData.basicQualifications : [],
        keyResponsibilities: Array.isArray(jobData.keyResponsibilities) ? jobData.keyResponsibilities : [],
        technicalSkills: Array.isArray(jobData.technicalSkills) ? jobData.technicalSkills : [],
        locationsAvailable: Array.isArray(jobData.locationsAvailable) ? jobData.locationsAvailable : [],
        tags: Array.isArray(jobData.tags) ? jobData.tags : [],
        expiresAt: jobData.expiresAt ? new Date(jobData.expiresAt) : null,
        postedAt:
          jobData.status === "published" && !jobData.postedAt
            ? new Date()
            : jobData.postedAt
            ? new Date(jobData.postedAt)
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
