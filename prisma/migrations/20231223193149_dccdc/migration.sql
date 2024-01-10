/*
  Warnings:

  - A unique constraint covering the columns `[purchaseOrderId]` on the table `ProductOnShelf` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PurchaseOrder" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProductOnShelf_purchaseOrderId_key" ON "ProductOnShelf"("purchaseOrderId");

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
