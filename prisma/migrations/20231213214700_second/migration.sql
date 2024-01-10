/*
  Warnings:

  - Added the required column `activityId` to the `ProductMovement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductMovement" ADD COLUMN     "activityId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductMovement" ADD CONSTRAINT "ProductMovement_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "UserActivity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
