/*
  Warnings:

  - You are about to drop the column `sellingPrice` on the `Product` table. All the data in the column will be lost.
  - Added the required column `sellingPrice` to the `ProductOnShelf` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sellingPrice";

-- AlterTable
ALTER TABLE "ProductOnShelf" ADD COLUMN     "sellingPrice" INTEGER NOT NULL;
