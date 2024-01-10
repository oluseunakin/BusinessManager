/*
  Warnings:

  - Added the required column `companyId` to the `ProductOnShelf` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductOnShelf" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductOnShelf" ADD CONSTRAINT "ProductOnShelf_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
