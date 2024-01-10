-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_activityId_fkey";

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("activityId") ON DELETE RESTRICT ON UPDATE CASCADE;
