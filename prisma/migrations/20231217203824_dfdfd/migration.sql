/*
  Warnings:

  - Added the required column `companyId` to the `ProductOnShelf` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductOnShelf" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "super" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "_CompanyToSupplier" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyToSupplier_AB_unique" ON "_CompanyToSupplier"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanyToSupplier_B_index" ON "_CompanyToSupplier"("B");

-- AddForeignKey
ALTER TABLE "ProductOnShelf" ADD CONSTRAINT "ProductOnShelf_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToSupplier" ADD CONSTRAINT "_CompanyToSupplier_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToSupplier" ADD CONSTRAINT "_CompanyToSupplier_B_fkey" FOREIGN KEY ("B") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
