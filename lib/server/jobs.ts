import { prisma } from "../prisma";
import { cache } from "react";

export const jobsBySlug = cache(async (id: string) =>
  await prisma.job.findUnique({
    where: { slug: id },
    include: { company: true },
  }));
