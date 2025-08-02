import { prisma } from "../prisma";

export async function getAllJobs() {
  const companies = await prisma.job.findMany({
        include: {
          company: {
            select: { name: true },
          },
        },
        orderBy: { createdAt: "desc" },
      });
  return companies;
}
