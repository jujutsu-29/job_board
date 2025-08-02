import { prisma } from "../prisma";

export async function getAllCompanies() {
  const companies = await prisma.company.findMany({});
  return companies;
}
