import { Link } from "@remix-run/react";
import { useMemo } from "react";
import type { DashboardCompany } from "~/types";

export const Dashboard = (props: {
  company: DashboardCompany;
  analysis: {
    debitValue: number;
    creditValue: number;
  };
}) => {
  const { company, analysis} = props;
  const movements = useMemo(() => {
    const movements = company!.movements;
    let inward = 0,
      outward = 0;
    movements!.forEach((m) => {
      if (m.type === "INWARD") inward += m.quantity;
      else outward += m.quantity;
    });
    return [inward, outward];
  }, [company]);
  return (
    <>
      <h2 className="text-slate-700 text-4xl text-center w-max mx-auto mt-2 mb-6">
        {company!.name}
      </h2>
      <div className="flex flex-wrap justify-around gap-6 mt-16 text-white">
        <Link
          className="shadow bg-amber-800 p-4 rounded-xl text-center"
          to="customers"
        >
          <p className="text-center text-4xl font-bold">
            {company?._count.customers}
          </p>
          <p>Customers</p>
        </Link>
        <Link
          className="shadow bg-red-600 p-4 rounded-xl text-center"
          to="shelf/stock"
        >
          <p className="text-center text-4xl font-bold">
            {company?._count.products}
          </p>
          <p>Products</p>
        </Link>
        <Link
          className="shadow bg-slate-700 p-4 rounded-xl text-center"
          to="suppliers"
        >
          <p className="text-center text-4xl font-bold">
            {company?._count.suppliers}
          </p>
          <p>Suppliers</p>
        </Link>
        <Link
          className="shadow bg-emerald-900 p-4 rounded-xl text-center"
          to="shelf/movement?type=inward"
        >
          <p className="text-center text-4xl font-bold">{movements[0]}</p>
          <p>Products Inward</p>
        </Link>
        <Link
          className="shadow bg-orange-600 p-4 rounded-xl text-center"
          to="shelf/movement?type=outward"
        >
          <p className="text-center text-4xl font-bold">{movements[1]}</p>
          <p>Products Outward</p>
        </Link>
        <Link
          className="shadow bg-cyan-700 p-4 rounded-xl text-center"
          to=""
        >
          <p className="text-center text-4xl font-bold">{analysis.creditValue}</p>
          <p>Monies in</p>
        </Link>
        <Link
          className="shadow bg-teal-800 p-4 rounded-xl text-center"
          to=""
        >
          <p className="text-center text-4xl font-bold">{analysis.debitValue}</p>
          <p>Monies out</p>
        </Link>
      </div>
    </>
  );
};
