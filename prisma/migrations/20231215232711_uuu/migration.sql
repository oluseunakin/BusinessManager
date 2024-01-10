/*
  Warnings:

  - A unique constraint covering the columns `[activityId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `activityId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserActivity" DROP CONSTRAINT "UserActivity_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activityId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_activityId_key" ON "User"("activityId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "UserActivity"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
