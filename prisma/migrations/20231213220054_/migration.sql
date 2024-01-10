/*
  Warnings:

  - A unique constraint covering the columns `[username,password]` on the table `UserActivity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserActivity_username_password_key" ON "UserActivity"("username", "password");
