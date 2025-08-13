import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { prisma } from "./prisma"
import { Prisma } from "@prisma/client";
import { auth } from "./auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(date: Date): string {
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

export async function isAdminFunction() {
  const session = await auth();
  return { isAdmin: (session && session.user?.role === "admin"), session };
}

export const locationOptions = [
  "Remote", "Pune", "Nashik", "Mumbai", 
  "Bengaluru", "New Delhi", "Noida", "Gurugram", "Chennai", "Hyderabad", "Kolkata", "All Over India"
];

export const jobTypes = [
  "Full Time", "Part Time", "Internship", "Freelance"
];

export const socials = [
  "facebook", "twitter", "linkedin"
]