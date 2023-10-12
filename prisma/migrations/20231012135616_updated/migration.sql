/*
  Warnings:

  - The `status` column on the `bookings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "bookings" ALTER COLUMN "date" SET DATA TYPE TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT DEFAULT 'pending';

-- DropEnum
DROP TYPE "BookingStatus";
