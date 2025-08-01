/*
  Warnings:

  - You are about to drop the column `domain` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[website]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Company_domain_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "domain",
ADD COLUMN     "companyDescription" TEXT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "website" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Company_website_key" ON "Company"("website");
