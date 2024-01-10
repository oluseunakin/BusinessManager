/*
  Warnings:

  - A unique constraint covering the columns `[date,companyId]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Stock_companyId_key";

-- DropIndex
DROP INDEX "Stock_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "Stock_date_companyId_key" ON "Stock"("date", "companyId");
