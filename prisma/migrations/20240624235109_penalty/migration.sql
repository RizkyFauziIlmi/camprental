-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE 'PENALTY';

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "penaltyAmount" DOUBLE PRECISION;
