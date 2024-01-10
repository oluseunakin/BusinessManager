/*
  Warnings:

  - A unique constraint covering the columns `[activityId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `activityId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserActivity" DROP CONSTRAINT "UserActivity_userId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "activityId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_activityId_key" ON "User"("activityId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "UserActivity"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
