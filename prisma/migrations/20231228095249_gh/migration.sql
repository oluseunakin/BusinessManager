/*
  Warnings:

  - The primary key for the `ProductMovement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PurchaseOrder` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ProductMovement" DROP CONSTRAINT "ProductMovement_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ProductMovement_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id");
