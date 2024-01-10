/*
  Warnings:

  - You are about to drop the column `password` on the `AuditTrail` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `AuditTrail` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `password` on the `UserActivity` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `UserActivity` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `AuditTrail` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username,password]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `UserActivity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `AuditTrail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserActivity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AuditTrail" DROP CONSTRAINT "AuditTrail_username_password_fkey";

-- DropForeignKey
ALTER TABLE "UserActivity" DROP CONSTRAINT "UserActivity_username_password_fkey";

-- DropIndex
DROP INDEX "AuditTrail_username_password_key";

-- DropIndex
DROP INDEX "UserActivity_username_password_key";

-- AlterTable
ALTER TABLE "AuditTrail" DROP COLUMN "password",
DROP COLUMN "username",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserActivity" DROP COLUMN "password",
DROP COLUMN "username",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AuditTrail_userId_key" ON "AuditTrail"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_password_key" ON "User"("username", "password");

-- CreateIndex
CREATE UNIQUE INDEX "UserActivity_userId_key" ON "UserActivity"("userId");

-- AddForeignKey
ALTER TABLE "AuditTrail" ADD CONSTRAINT "AuditTrail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
