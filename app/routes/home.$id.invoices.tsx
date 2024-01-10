import type { Prisma } from "@prisma/client";
import { defer, type LoaderArgs } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense, useEffect, useRef, useState } from "react";
import { MyDate } from "~/components/Date";
import { Spinner } from "~/components/Spinner";
import { getCompanyInvoices } from "~/server/model/company";

export const loader = ({ params }: LoaderArgs) => {
  const companyId = Number(params.id);
  return defer({ company: getCompanyInvoices(companyId) });
};

export default function () {
  const { company } = useLoaderData<typeof loader>();
  const invoiceRef = useRef<any>();
  const [invoices, setInvoices] = useState<
    {
      customer: {
        id: number;
        name: string;
      };
      customerId: number;
      bought: Prisma.JsonValue[];
      date: Date;
      dateAsNumber: number;
      companyId: number;
    }[]
  >();

  useEffect(() => {
    if (invoiceRef.current) {
      setInvoices(invoiceRef.current);
    }
  }, []);

  return (
    <>
      <div className="flex justify-around flex-wrap gap-2 mb-10">
        <div>
          <input
            placeholder="Search by Customer"
            className="p-2 border-b-2"
            onChange={(e) => {
              const ci = invoiceRef.current;
              if (ci) {
                const toSearch = e.target.value;
                if (toSearch.match(/^\s*$/)) {
                  setInvoices(ci);
                } else {
                  const filtered = ci.filter(
                    (invoice: { customer: { name: string } }) =>
                      invoice.customer.name.toLowerCase().match(toSearch)
                  );
                  setInvoices(filtered);
                }
              }
            }}
          />
        </div>
        <label className="flex gap-3 items-center">
          <p>Search by date</p>
          <input
            className="p-2 border-b-2"
            type="date"
            onChange={(e) => {
              const ci = invoiceRef.current;
              if (ci) {
                const toSearch = new Date(e.target.valueAsDate!);
                const toSearchAsNumber =
                  toSearch.getDate() +
                  toSearch.getMonth() +
                  toSearch.getFullYear();
                const filtered = ci.filter(
                  (invoice: { dateAsNumber: number }) =>
                    invoice.dateAsNumber == toSearchAsNumber
                );
                setInvoices(filtered);
              }
            }}
          />
        </label>
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
            invoiceRef.current = company?.invoices;
            return invoices && invoices.length > 0 ? (
              <div className="flex gap-5 flex-col">
                <div className="grid grid-cols-3 text-center text-lg text-amber-700">
                  <div className="text-center">Customer</div>
                  <div className="text-center">Products</div>
                  <div className="text-center">Date</div>
                </div>
                {invoices.map((invoice, i) => {
                  const date = new Date(invoice.date);
                  return (
                    <div
                      key={i}
                      className="grid grid-cols-3 text-center shadow mx-1 bg-white p-2"
                    >
                      <div className="text-center font-bold">{invoice.customer.name}</div>
                      <>
                        {invoice.bought.map((value, i) => {
                          const val = value as {
                            productName: string;
                            quantity: number;
                          };
                          return (
                            <div key={i} className="flex gap-2">
                              <p>{val.productName}</p>
                              <p>{val.quantity}</p>
                            </div>
                          );
                        })}
                      </>
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
              <p className="text-center mt-16 text-lg">Nothing to see here</p>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}
