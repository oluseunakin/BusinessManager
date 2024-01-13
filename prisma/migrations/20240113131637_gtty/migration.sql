-- DropForeignKey
ALTER TABLE "AuditTrail" DROP CONSTRAINT "AuditTrail_activityId_fkey";

-- DropForeignKey
ALTER TABLE "AuditTrail" DROP CONSTRAINT "AuditTrail_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "ProductMovement" DROP CONSTRAINT "ProductMovement_activityId_fkey";

-- DropForeignKey
ALTER TABLE "ProductMovement" DROP CONSTRAINT "ProductMovement_productName_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_productName_fkey";

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_productName_fkey" FOREIGN KEY ("productName") REFERENCES "ProductOnShelf"("productName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductMovement" ADD CONSTRAINT "ProductMovement_productName_fkey" FOREIGN KEY ("productName") REFERENCES "ProductOnShelf"("productName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductMovement" ADD CONSTRAINT "ProductMovement_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "UserActivity"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditTrail" ADD CONSTRAINT "AuditTrail_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditTrail" ADD CONSTRAINT "AuditTrail_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "UserActivity"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
