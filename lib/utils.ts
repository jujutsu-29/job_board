import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { prisma } from "./prisma"
import { Prisma } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }) + " at " + date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 50);
}

export async function createJobWithUniqueSlug(data: Omit<Prisma.JobCreateInput, "slug">, title: string) {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let suffix = 1;

  while (true) {
    try {
      const job = await prisma.job.create({
        data: {
          ...data,
          slug,
        },
      });
      return job;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002" // Unique constraint failed
      ) {
        slug = `${baseSlug}-${suffix++}`;
        continue;
      }
      throw error; // Unknown error — rethrow
    }
  }
}

export const locationOptions = [
  "Remote", "Pune", "New Delhi", "Karnataka",
  "Bengaluru", "Noida", "Nashik", "Gurugram"
];