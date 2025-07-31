/*
  Warnings:

  - You are about to drop the column `expeience` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "expeience",
ADD COLUMN     "experience" TEXT;
