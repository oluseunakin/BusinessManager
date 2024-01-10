import { defer } from "@remix-run/node";
import type { LoaderArgs, ActionArgs } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense, useEffect, useRef, useState } from "react";
import { Spinner } from "~/components/Spinner";
import { getCompanyWithSuppliers } from "~/server/model/company";
import { getSupplierByName } from "~/server/model/supplier";

export const loader = ({ params }: LoaderArgs) => {
  const id = Number(params.id);
  return defer({ company: getCompanyWithSuppliers(id) });
};

export const action = async ({ request }: ActionArgs) => {
  const fd = await request.formData();
  const supplierToSearch = fd.get("supplier") as string;
  return await getSupplierByName(supplierToSearch);
};

export default function () {
  const { company } = useLoaderData<typeof loader>();
  const suppliersRef = useRef<{
    id: number;
    name: string;
    address: string | null;
    phone: string | null;
  }[]>();
  const [suppliers, setSuppliers] = useState<
    {
      id: number;
      name: string;
      address: string | null;
      phone: string | null;
    }[]
  >();
  useEffect(() => {
    setSuppliers(suppliersRef.current);
  }, []);
  return (
    <div className="flex gap-10 flex-col">
      <div className="flex justify-end mr-2">
        <input
          type="search"
          name="supplier"
          placeholder="Search for a Supplier"
          className="px-4 py-2 border rounded"
          onChange={(e) => {
            const companySuppliers = suppliersRef.current;
            if (companySuppliers) {
              const toSearch = e.target.value;
              if (toSearch.match(/^\s*$/)){setSuppliers(companySuppliers)}
              else {
                const filtered = companySuppliers.filter((supplier,i, arr) =>
                  supplier.name.toLowerCase().includes(toSearch)
                );
                setSuppliers(filtered);
              }
            }
          }}
        />
      </div>
      <Suspense
        fallback={
          <div className="w-max mx-auto">
            <Spinner width="w-10" height="h-10" />
          </div>
        }
      >
        <Await resolve={company}>
          {(company) => {
            suppliersRef.current = company?.suppliers;
            return (
              suppliers &&
              suppliers.map((supplier, i) => (
                <div
                  className="w-3/4 mx-auto flex flex-col gap-2 text-center shadow-lg bg-white py-5 px-2 my-4"
                  key={i}
                >
                  <h3 className="text-2xl">{supplier.name}</h3>
                  <p>{supplier.phone}</p>
                  <p>{supplier.address}</p>
                </div>
              ))
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
