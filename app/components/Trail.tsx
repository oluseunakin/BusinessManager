import type { Transaction } from "~/types";
import { TransactionComponent } from "./Transaction";

export const Trail = (props: { trails: any }) => {
  const { trails } = props;
  return (
    <div className="flex flex-col mx-auto w-11/12 md:w-3/5 gap-3">
      {trails!.trails.map((trail: { transaction: Transaction }, i: number) => (
        <TransactionComponent key={i} transaction={trail.transaction} />
      ))}
    </div>
  );
};
