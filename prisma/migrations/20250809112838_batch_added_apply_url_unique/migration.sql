/*
  Warnings:

  - A unique constraint covering the columns `[applyUrl]` on the table `Job` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "batches" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Job_applyUrl_key" ON "Job"("applyUrl");
