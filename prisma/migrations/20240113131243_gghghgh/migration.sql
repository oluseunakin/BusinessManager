-- DropForeignKey
ALTER TABLE "ProductOnShelf" DROP CONSTRAINT "ProductOnShelf_stockId_fkey";

-- AddForeignKey
ALTER TABLE "ProductOnShelf" ADD CONSTRAINT "ProductOnShelf_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE CASCADE ON UPDATE CASCADE;
