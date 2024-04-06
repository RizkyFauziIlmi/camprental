/*
  Warnings:

  - You are about to drop the column `bookingId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_bookingId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "bookingId";

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "bookingId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
