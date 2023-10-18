/*
  Warnings:

  - You are about to drop the column `publisher` on the `blogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "publisher",
ADD COLUMN     "published" BOOLEAN DEFAULT true;

-- CreateTable
CREATE TABLE "up_service" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "up_service_pkey" PRIMARY KEY ("id")
);
