/*
  Warnings:

  - The primary key for the `Invoice` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id");
