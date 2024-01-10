/*
  Warnings:

  - You are about to drop the column `userId` on the `AuditTrail` table. All the data in the column will be lost.
  - You are about to drop the column `journalId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Journal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AuditTrail" DROP CONSTRAINT "AuditTrail_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_journalId_fkey";

-- DropIndex
DROP INDEX "AuditTrail_userId_key";

-- AlterTable
ALTER TABLE "AuditTrail" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "journalId";

-- DropTable
DROP TABLE "Journal";
