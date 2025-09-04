import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { prisma } from "./prisma"
import { Prisma } from "@prisma/client";
import { auth } from "./auth";
import { toast } from "@/hooks/use-toast";
import { GoogleGenAI } from "@google/genai";

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
    // .slice(0, 50);
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

export const copyJobLink = (slug: string) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${slug}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Success",
      description: "Job link copied to clipboard",
    });
  };

export async function handleImageUpload(file: File) {
    // console.log("handleImageUpload called with file:", file);
    if (!file) return;
    // 1. ask backend for presigned url
    const { url } = await fetch("/api/s3/presign", {
      method: "POST",
      body: JSON.stringify({ fileName: file.name, fileType: file.type }),
    }).then((res) => res.json());

    // console.log("Presigned URL received:", url);
    // 2. upload directly to S3
    const responseAfterUpload = await fetch(url, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });
    // console.log("response after upload:", responseAfterUpload);

    // 3. image is available at url.split("?")[0]
    return url.split("?")[0];
  }

export function stripQuotes(str: string): string {
  if (str.startsWith('"') && str.endsWith('"')) {
    return str.slice(1, -1);
  }
  return str;
}


  export async function geminiResponseGetter ({prompt, schema, ai}: {prompt: any, schema: any, ai: GoogleGenAI}) {
    const models = [
        "gemini-2.5-pro",
        "gemini-2.5-flash",
        "gemini-2.5-flash-lite",
        "gemini-2.0-flash",
        "gemini-2.0-flash-lite",
      ]; // fallback list
      let response;
    
      for (const model of models) {
        try {
          response = await callGemini(model, prompt, schema);
          console.log(`✅ Success with model: ${model}`);
          break; // stop on first success
        } catch (err: any) {
          console.warn(`❌ Model ${model} failed: ${err.message}`);
          if (err.status === 503) {
            continue; // overloaded → try next model
          }
          throw err; // other errors bubble up
        }
      }
    
      if (!response) {
        throw new Error("All Gemini models overloaded. Try later.");
      }
    
      async function callGemini(model: string, prompt: any, schema?: any) {
        return ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: schema,
            maxOutputTokens: 2000,
          },
        });
      }

      return response;
  }