/*
  Warnings:

  - A unique constraint covering the columns `[name,type,ledgerType]` on the table `Ledger` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Ledger_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Ledger_name_type_ledgerType_key" ON "Ledger"("name", "type", "ledgerType");
