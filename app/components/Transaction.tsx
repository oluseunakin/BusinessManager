import type { Transaction } from "~/types";

export const TransactionComponent = (props: { transaction: Transaction }) => {
  const { transaction } = props;
  return (
    <div className="grid grid-flow-col gap-2 shadow bg-white p-3 text-center">
      <p>{transaction?.account.name}</p>
      <p>{transaction?.account.type}</p>
      <p>{transaction?.account.ledgerType}</p>
      <p>{transaction?.amount}</p>
      {transaction?.description && <p>{transaction?.description}</p>}
    </div>
  );
};
