import type { AccountType } from "@prisma/client";
import { LedgerType } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import { Spinner } from "~/components/Spinner";
import { TransactionComponent } from "~/components/Transaction";
import { getLedgerByLedgerType, getLedgerByTypeIncludeTransactions } from "~/server/model/ledger";
import type { Transaction } from "~/types";

export const action = async ({ request }: ActionArgs) => {
  const fd = await request.formData();
  const type = fd.get("type") as string as AccountType;
  const ledgerType = fd.get("ledgerType") as string as LedgerType;
  if (type) return await getLedgerByTypeIncludeTransactions(type);
  else return await getLedgerByLedgerType(ledgerType);
};

export default function () {
  const fetcher = useFetcher();
  const [transactions, setTransactions] = useState<Transaction[]>();

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setTransactions(fetcher.data.transactions);
      return;
    }
    if (fetcher.data == null) setTransactions(fetcher.data);
  }, [fetcher.data, fetcher.state]);

  return (
    <div className="flex flex-col gap-6 mt-6 md:w-2/4 w-11/12 mx-auto">
      <div className="shadow flex flex-col gap-10 p-3 bg-white mt-4 ">
        <div className="flex flex-col gap-4">
          <h4 className="w-max mx-auto text-center text-xl mt-4">
            Select Account type
          </h4>
          <select
            name="accountype"
            className="p-2 border"
            onChange={(e) => {
              const accountType = e.target.value;
              if (accountType !== "sa") {
                fetcher.submit({ type: accountType }, { method: "post" });
              }
            }}
          >
            <option value="sa">Select Account type</option>
            <option>DEBIT</option>
            <option>CREDIT</option>
          </select>
        </div>
        <hr />
        <div className="flex flex-col gap-4">
          <h4 className="w-max mx-auto text-center text-xl">
            Select Ledger type
          </h4>
          <select
            className="p-2 border"
            onChange={(e) => {
              const ledgerType = e.target.value;
              if (ledgerType !== "sl")
                fetcher.submit({ ledgerType }, { method: "post" });
            }}
          >
            <option value="sl">Select Ledger type</option>
            <option>{LedgerType.ASSET}</option>
            <option>{LedgerType.LIABILITY}</option>
            <option>{LedgerType.EQUITY}</option>
            <option>{LedgerType.EXPENSE}</option>
            <option>{LedgerType.REVENUE}</option>
          </select>
        </div>
      </div>
      {fetcher.state === "submitting" && (
        <div className="flex justify-center">
          <Spinner width="w-10" height="h-10" />
        </div>
      )}
      {transactions &&
        transactions.map((transaction, i) => (
          <TransactionComponent transaction={transaction} key={i} />
        ))}
    </div>
  );
}
