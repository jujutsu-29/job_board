import { prisma } from "../prisma";
import { cache } from "react";

export const jobsBySlug = cache(async (slug: string) =>
  await prisma.job.findUnique({
    where: { slug: slug },
    include: { company: true },
  }));
