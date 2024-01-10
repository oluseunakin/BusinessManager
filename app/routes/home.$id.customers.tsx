import type { Customer } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense, useEffect, useRef, useState } from "react";
import { Spinner } from "~/components/Spinner";
import { getCompanyCustomers } from "~/server/model/company";

export const loader = async ({ params }: LoaderArgs) => {
  return defer({ company: getCompanyCustomers(Number(params.id)) });
};

export default function () {
  const { company } = useLoaderData<typeof loader>();
  const companyRef = useRef<Customer[]>();
  const [customers, setCustomers] = useState<Customer[]>();

  useEffect(() => {
    if (companyRef.current) {
      setCustomers(companyRef.current);
    }
  }, []);

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <input
          placeholder="Search..."
          className="border-b p-2"
          onChange={(e) => {
            const cc = companyRef.current;
            if (cc) {
              const toSearch = e.target.value;
              if (toSearch.match(/^\s*$/)) {
                setCustomers(cc);
              } else {
                const filtered = cc.filter((customer) =>
                  customer.name.toLowerCase().match(toSearch)
                );
                setCustomers(filtered);
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
            companyRef.current = company!.customers;
            return customers ? (
              <div className="md:w-3/5 w-9/12 mx-auto flex flex-col gap-4 items-center">
                {customers.map((customer, i) => (
                  <p key={i}>{customer.name}</p>
                ))}
              </div>
            ) : (
              <div>Nothing to see here</div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
