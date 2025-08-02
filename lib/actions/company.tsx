import { prisma } from "../prisma";

export async function getAllCompanies() {
  try {
    const companies = await prisma.company.findMany({});
    return companies;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw new Error("Failed to fetch companies");
    
  }
}
