import { Job } from "@/types/types";
import { prisma } from "../prisma";

export async function getAllJobs(): Promise<Job[]> {
  const jobs = await prisma.job.findMany({
        select: {
          id: true,
          experience: true,
          title: true,
          applyUrl: true,
          locationsAvailable: true,
          jobType: true,
          salary: true,
          postedAt: true,
          description: true,
          slug: true,
          company: {
            select: { name: true },
          },
        },
        orderBy: { createdAt: "desc" },
      }) as [];
  return jobs;
}
