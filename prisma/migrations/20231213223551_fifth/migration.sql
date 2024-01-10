/*
  Warnings:

  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.
  - Added the required column `inQuantity` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "quantity",
ADD COLUMN     "currentQuantity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "inQuantity" INTEGER NOT NULL;
