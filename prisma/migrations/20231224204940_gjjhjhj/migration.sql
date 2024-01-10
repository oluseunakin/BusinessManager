/*
  Warnings:

  - You are about to drop the column `invoiceId` on the `ProductOnShelf` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseOrderId` on the `ProductOnShelf` table. All the data in the column will be lost.
  - The primary key for the `PurchaseOrder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PurchaseOrder` table. All the data in the column will be lost.
  - Added the required column `productName` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductOnShelf" DROP CONSTRAINT "ProductOnShelf_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "ProductOnShelf" DROP CONSTRAINT "ProductOnShelf_purchaseOrderId_fkey";

-- DropIndex
DROP INDEX "ProductOnShelf_purchaseOrderId_key";

-- AlterTable
ALTER TABLE "ProductOnShelf" DROP COLUMN "invoiceId",
DROP COLUMN "purchaseOrderId";

-- AlterTable
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_pkey",
DROP COLUMN "id",
ADD COLUMN     "productName" TEXT NOT NULL,
ADD CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("productName");

-- CreateTable
CREATE TABLE "_InvoiceToProductOnShelf" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InvoiceToProductOnShelf_AB_unique" ON "_InvoiceToProductOnShelf"("A", "B");

-- CreateIndex
CREATE INDEX "_InvoiceToProductOnShelf_B_index" ON "_InvoiceToProductOnShelf"("B");

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_productName_fkey" FOREIGN KEY ("productName") REFERENCES "ProductOnShelf"("productName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceToProductOnShelf" ADD CONSTRAINT "_InvoiceToProductOnShelf_A_fkey" FOREIGN KEY ("A") REFERENCES "Invoice"("customerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceToProductOnShelf" ADD CONSTRAINT "_InvoiceToProductOnShelf_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductOnShelf"("productName") ON DELETE CASCADE ON UPDATE CASCADE;
