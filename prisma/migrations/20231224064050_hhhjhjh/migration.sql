-- CreateTable
CREATE TABLE "_CompanyToCustomer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyToCustomer_AB_unique" ON "_CompanyToCustomer"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanyToCustomer_B_index" ON "_CompanyToCustomer"("B");

-- AddForeignKey
ALTER TABLE "_CompanyToCustomer" ADD CONSTRAINT "_CompanyToCustomer_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToCustomer" ADD CONSTRAINT "_CompanyToCustomer_B_fkey" FOREIGN KEY ("B") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
