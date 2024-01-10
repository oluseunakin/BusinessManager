/*
  Warnings:

  - Added the required column `dateAsNumber` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `date` on the `Stock` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "dateAsNumber" INTEGER NOT NULL,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Stock_date_companyId_key" ON "Stock"("date", "companyId");
