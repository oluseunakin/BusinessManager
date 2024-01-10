/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Ledger` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[type]` on the table `Ledger` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ledgerType]` on the table `Ledger` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Ledger_name_type_ledgerType_key";

-- CreateIndex
CREATE UNIQUE INDEX "Ledger_name_key" ON "Ledger"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ledger_type_key" ON "Ledger"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Ledger_ledgerType_key" ON "Ledger"("ledgerType");
