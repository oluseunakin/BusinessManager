/*
  Warnings:

  - You are about to drop the column `time` on the `AuditTrail` table. All the data in the column will be lost.
  - You are about to drop the column `timeAsNumber` on the `AuditTrail` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `ProductMovement` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `timeAsNumber` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `_InvoiceToProductOnShelf` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bought` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_InvoiceToProductOnShelf" DROP CONSTRAINT "_InvoiceToProductOnShelf_A_fkey";

-- DropForeignKey
ALTER TABLE "_InvoiceToProductOnShelf" DROP CONSTRAINT "_InvoiceToProductOnShelf_B_fkey";

-- AlterTable
ALTER TABLE "AuditTrail" DROP COLUMN "time",
DROP COLUMN "timeAsNumber";

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "bought" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "ProductMovement" DROP COLUMN "time";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "time",
DROP COLUMN "timeAsNumber";

-- DropTable
DROP TABLE "_InvoiceToProductOnShelf";
