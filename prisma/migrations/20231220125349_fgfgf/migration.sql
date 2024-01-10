/*
  Warnings:

  - You are about to drop the column `companyId` on the `ProductOnShelf` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductOnShelf" DROP CONSTRAINT "ProductOnShelf_companyId_fkey";

-- AlterTable
ALTER TABLE "ProductOnShelf" DROP COLUMN "companyId";

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
