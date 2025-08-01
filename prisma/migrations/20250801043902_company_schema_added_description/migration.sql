/*
  Warnings:

  - You are about to drop the column `companyDescription` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "companyDescription",
ADD COLUMN     "companyType" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
