/*
  Warnings:

  - You are about to drop the column `deliveryDate` on the `PurchaseOrder` table. All the data in the column will be lost.
  - Added the required column `timeAsNumber` to the `AuditTrail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateAsNumber` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateAsNumber` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeAsNumber` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastloginAsNumber` to the `UserActivity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuditTrail" ADD COLUMN     "timeAsNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "dateAsNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PurchaseOrder" DROP COLUMN "deliveryDate",
ADD COLUMN     "dateAsNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "timeAsNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserActivity" ADD COLUMN     "lastloginAsNumber" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
