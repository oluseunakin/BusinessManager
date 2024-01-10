/*
  Warnings:

  - Added the required column `amount` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "costPrice" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ProductOnShelf" ALTER COLUMN "sellingPrice" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "PurchaseOrder" ADD COLUMN     "amount" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "amount" SET DATA TYPE TEXT;
