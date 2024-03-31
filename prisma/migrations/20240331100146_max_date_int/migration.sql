/*
  Warnings:

  - The `maxDate` column on the `Item` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "maxDate",
ADD COLUMN     "maxDate" INTEGER NOT NULL DEFAULT 1;
