/*
  Warnings:

  - The values [ASSET,LIABILITY,EQUITY,REVENUE,EXPENSE] on the enum `AccountType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `ledgerType` to the `Ledger` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LedgerType" AS ENUM ('ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE');

-- AlterEnum
BEGIN;
CREATE TYPE "AccountType_new" AS ENUM ('DEBIT', 'CREDIT');
ALTER TABLE "Ledger" ALTER COLUMN "type" TYPE "AccountType_new" USING ("type"::text::"AccountType_new");
ALTER TYPE "AccountType" RENAME TO "AccountType_old";
ALTER TYPE "AccountType_new" RENAME TO "AccountType";
DROP TYPE "AccountType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Ledger" ADD COLUMN     "ledgerType" "LedgerType" NOT NULL;
