/*
  Warnings:

  - You are about to drop the column `currentQuantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `inQuantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseOrderId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_purchaseOrderId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "ProductMovement" DROP CONSTRAINT "ProductMovement_productName_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "currentQuantity",
DROP COLUMN "inQuantity",
DROP COLUMN "purchaseOrderId",
DROP COLUMN "supplierId",
ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "ProductOnShelf" (
    "productName" TEXT NOT NULL,
    "supplierId" INTEGER,
    "inQuantity" INTEGER NOT NULL,
    "currentQuantity" INTEGER NOT NULL DEFAULT 0,
    "purchaseOrderId" INTEGER NOT NULL,

    CONSTRAINT "ProductOnShelf_pkey" PRIMARY KEY ("productName")
);

-- AddForeignKey
ALTER TABLE "ProductOnShelf" ADD CONSTRAINT "ProductOnShelf_productName_fkey" FOREIGN KEY ("productName") REFERENCES "Product"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOnShelf" ADD CONSTRAINT "ProductOnShelf_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOnShelf" ADD CONSTRAINT "ProductOnShelf_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductMovement" ADD CONSTRAINT "ProductMovement_productName_fkey" FOREIGN KEY ("productName") REFERENCES "ProductOnShelf"("productName") ON DELETE RESTRICT ON UPDATE CASCADE;
