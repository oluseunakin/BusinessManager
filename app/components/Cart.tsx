import { useMemo } from "react";

export const Cart = (props: {
  cart: { name: string; quantity: number; price: number }[];
  setToShow: React.Dispatch<React.SetStateAction<string>>;
  setPaymentInfo: React.Dispatch<
    React.SetStateAction<{
      cart: string;
      customer: string;
      sum: number;
    }>
  >;
}) => {
  const { cart, setToShow, setPaymentInfo } = props;
  const individualTotals = useMemo(
    () => cart.map((prod) => prod.price * prod.quantity),
    [cart]
  );
  const sum = useMemo(
    () => individualTotals.reduce((prev, current) => prev + current),
    [individualTotals]
  );

  return (
    <div className="mt-5 flex flex-col gap-4 shadow-2xl bg-white p-4 md:w-3/4  mx-auto">
      {cart.map((prod, i) => (
        <div
          key={i}
          className="grid grid-flow-col gap-2 items-center"
        >
          <p>{prod.name}</p>
          <p>{prod.quantity}</p>
          <p>{prod.price}</p>
          <p>{individualTotals[i]}</p>
        </div>
      ))}
      <div className="flex justify-end gap-4 mt-6">
        <p className="gap-3 flex">
          <p>Total: </p>
          <p>{sum}</p>
        </p>
        <button
          className="px-4 py-2 bg-red-500 shadow text-slate-100"
          onClick={() => {
            setToShow("paymentypes");
            setPaymentInfo((info) => ({ ...info, cart: JSON.stringify(cart), sum }));
          }}
        >
          Confirm Purchase
        </button>
      </div>
    </div>
  );
};
