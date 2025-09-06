import JobForm from "@/components/jobs/JobForm";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

async function getJob(slug: string) {
  const job = await prisma.job.findUnique({
    where: { slug: slug },
    include: {
      company: {
        select: {
          name: true,
        },
      },
    },
  });
  return job;
}

export default async function EditJobPage({ params }: { params: { slug: string } }) {
  const slug = (await params).slug
  const job = await getJob(slug);

  console.log("job", job);

  if (!job) {
    notFound();
  }

  // Transform the data to match the form structure
  const initialData = {
    title: job.title,
    companyName: job.company.name,
    description: job.description,
    batches: job.batches || "",
    image: job.image || "",
    applyUrl: job.applyUrl,
    status: job.status,
    isFeatured: job.isFeatured,
    source: job.source || "",
    postedAt: job.postedAt?.toISOString() || "",
    expiresAt: job.expiresAt?.toISOString() || "",
    jobType: job.jobType || "",
    salary: job.salary || "",
    experience: job.experience || "",
    requirements: Array.isArray(job.requirements) ? job.requirements.join("\n") : job.requirements,
    basicQualifications: Array.isArray(job.basicQualifications) ? job.basicQualifications.join("\n") : job.basicQualifications,
    keyResponsibilities: Array.isArray(job.keyResponsibilities) ? job.keyResponsibilities.join("\n") : job.keyResponsibilities,
    technicalSkills: Array.isArray(job.technicalSkills) ? job.technicalSkills.join("\n") : job.technicalSkills,
    locationsAvailable: Array.isArray(job.locationsAvailable)
      ? job.locationsAvailable
      : typeof job.locationsAvailable === "string"
        ? [job.locationsAvailable]
        : [],
    tags: Array.isArray(job.tags) ? job.tags.join("\n") : job.tags,
  };

  return (
    <JobForm 
      mode="edit" 
      initialData={initialData} 
      slug={slug} 
    />
  );
}