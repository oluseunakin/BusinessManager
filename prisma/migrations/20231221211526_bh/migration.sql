/*
  Warnings:

  - Added the required column `companyId` to the `ProductMovement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductMovement" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductMovement" ADD CONSTRAINT "ProductMovement_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
