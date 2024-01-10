import { defer, type LoaderArgs } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense, useEffect, useRef, useState } from "react";
import { MyDate } from "~/components/Date";
import { Spinner } from "~/components/Spinner";
import { getCompanyOrders } from "~/server/model/company";

export const loader = async ({ params }: LoaderArgs) => {
  const companyId = Number(params.id);
  return defer({ company: getCompanyOrders(companyId) });
};

export default function () {
  const { company } = useLoaderData<typeof loader>();
  const ordersRef = useRef<any[]>();
  const [orders, setOrders] = useState<
    {
      supplier: {
        name: string;
      };
      product: {
        productName: string;
        inQuantity: number;
      };
      amount: string;
      date: Date;
    }[]
  >();

  useEffect(() => {
    if (ordersRef.current) {
      setOrders(ordersRef.current);
    }
  }, []);

  return (
    <>
      <div className="flex justify-around gap-4 flex-wrap mb-10">
        <input
          placeholder="Search by Supplier"
          className="border-b p-2"
          onChange={(e) => {
            const co = ordersRef.current;
            if (co) {
              const toSearch = e.target.value;
              if (toSearch.match(/^\s*$/)) {
                setOrders(co);
              } else {
                const filtered = co.filter((order) =>
                  order.supplier.name.toLowerCase().match(toSearch)
                );
                setOrders(filtered);
              }
            }
          }}
        />
        <label>
          {" "}
          <span className="mr-3">Search by date</span>
          <input
            type="date"
            placeholder="Search by Date"
            className="border-b p-2"
            onChange={(e) => {
              const co = ordersRef.current;
              if (co) {
                const toSearch = new Date(e.target.valueAsDate!);
                const toSearchAsNumber =
                  toSearch.getDate() +
                  toSearch.getMonth() +
                  toSearch.getFullYear();
                const filtered = co.filter(
                  (order) => order.dateAsNumber == toSearchAsNumber
                );
                setOrders(filtered);
              }
            }}
          />
        </label>
        <input
          placeholder="Search by Product"
          className="border-b p-2"
          onChange={(e) => {
            const co = ordersRef.current;
            if (co) {
              const toSearch = e.target.value;
              if (toSearch.match(/^\s*$/)) {
                setOrders(co);
              } else {
                const filtered = co.filter((order) =>
                  order.product.productName.toLowerCase().match(toSearch)
                );
                setOrders(filtered);
              }
            }
          }}
        />
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center">
            <Spinner width="w-10" height="h-10" />
          </div>
        }
      >
        <Await resolve={company}>
          {(company) => {
            ordersRef.current = company!.orders;
            return orders && orders.length > 0 ? (
              <div className="flex gap-5 flex-col">
                <div className="grid grid-cols-5 text-center text-amber-700 text-lg">
                  <span className="text-center">Supplier</span>
                  <span className="text-center">Product</span>
                  <span className="text-center">Quantity</span>
                  <span className="text-center">Value</span>
                  <span className="text-center">Date</span>
                </div>
                {orders.map((order, i) => {
                  const date = new Date(order.date);
                  return (
                    <div
                      key={i}
                      className="grid grid-cols-5 text-center shadow bg-white p-2 mx-1"
                    >
                      <span className="text-center">{order.supplier.name}</span>
                      <span className="text-center">
                        {order.product?.productName}
                      </span>
                      <span className="text-center">
                        {order.product.inQuantity}
                      </span>
                      <span className="text-center">{order.amount}</span>
                      <MyDate
                        month={date.getMonth() + 1}
                        day={date.getDate()}
                        year={date.getFullYear()}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="flex justify-center text-3xl mt-10">
                Nothing to see here
              </p>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}
