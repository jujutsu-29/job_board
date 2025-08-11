-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "benefits" TEXT[] DEFAULT ARRAY[]::TEXT[];
