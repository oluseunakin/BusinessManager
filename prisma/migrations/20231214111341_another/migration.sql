/*
  Warnings:

  - The primary key for the `ProductMovement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProductMovement` table. All the data in the column will be lost.
  - You are about to drop the column `activityId` on the `Transaction` table. All the data in the column will be lost.
  - The primary key for the `UserActivity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserActivity` table. All the data in the column will be lost.
  - Added the required column `activityId` to the `AuditTrail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductMovement" DROP CONSTRAINT "ProductMovement_activityId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_activityId_fkey";

-- DropIndex
DROP INDEX "ProductMovement_productName_key";

-- DropIndex
DROP INDEX "UserActivity_userId_key";

-- AlterTable
ALTER TABLE "AuditTrail" ADD COLUMN     "activityId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductMovement" DROP CONSTRAINT "ProductMovement_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ProductMovement_pkey" PRIMARY KEY ("productName");

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "activityId";

-- AlterTable
ALTER TABLE "UserActivity" DROP CONSTRAINT "UserActivity_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserActivity_pkey" PRIMARY KEY ("userId");

-- AddForeignKey
ALTER TABLE "ProductMovement" ADD CONSTRAINT "ProductMovement_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "UserActivity"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditTrail" ADD CONSTRAINT "AuditTrail_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "UserActivity"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
