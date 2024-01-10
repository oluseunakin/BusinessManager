/*
  Warnings:

  - A unique constraint covering the columns `[dateAsNumber,companyId]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Stock_date_companyId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Stock_dateAsNumber_companyId_key" ON "Stock"("dateAsNumber", "companyId");
