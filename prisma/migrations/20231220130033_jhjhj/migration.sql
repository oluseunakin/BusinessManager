/*
  Warnings:

  - A unique constraint covering the columns `[companyId]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Stock_companyId_key" ON "Stock"("companyId");
