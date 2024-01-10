import { AccountType } from "@prisma/client";
import { getCompanyLedger } from "./model/company";

export const balanceSheet = async (companyId: number) => {
  const companyWithLedgers = await getCompanyLedger(companyId);
  let creditValue = 0;
  let debitValue = 0;
  companyWithLedgers?.ledgers.forEach((ledger) => {
    if (ledger.type === AccountType.CREDIT) {
      const creditTransactions = ledger.transactions;
      creditValue = creditTransactions!.reduce<number>(
        (prev, next) => prev + Number(next.amount),
        0
      );
    } else {
      const debitTransactions = ledger.transactions;
      debitValue = debitTransactions.reduce<number>(
        (prev, next) => prev + Number(next.amount),
        0
      );
    }
  });
  return { debitValue, creditValue };
};
