-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "basicQualifications" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "expeience" TEXT,
ADD COLUMN     "jobType" TEXT,
ADD COLUMN     "keyResponsibilities" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "locationsAvailable" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "requirements" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "salary" TEXT,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "technicalSkills" TEXT[] DEFAULT ARRAY[]::TEXT[];
