import { Link, Outlet, useOutletContext } from "@remix-run/react";
import type { Context } from "~/types";

export default function () {
  const { user } = useOutletContext<Context>();

  return (
    <>
      <div className="mt-8 flex gap-2 justify-around flex-wrap text-orange-700">
        <Link to="stock" className="border px-4 py-2 rounded shadow bg-white">
          Stock
        </Link>
        <Link
          to="movement"
          className="border px-4 py-2 rounded shadow bg-white"
        >
          Product Movement
        </Link>
        <Link to="orders" className="border px-4 py-2 rounded shadow bg-white">
          Purchase Orders
        </Link>
      </div>
      <div className="mt-10">
        <Outlet context={{ user }} />
      </div>
    </>
  );
}