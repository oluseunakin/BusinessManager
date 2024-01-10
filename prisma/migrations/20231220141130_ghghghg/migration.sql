/*
  Warnings:

  - You are about to drop the column `supplierId` on the `ProductOnShelf` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductOnShelf" DROP CONSTRAINT "ProductOnShelf_supplierId_fkey";

-- AlterTable
ALTER TABLE "ProductOnShelf" DROP COLUMN "supplierId";
