import {
  Link,
  Outlet,
  useNavigation,
  useOutletContext,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import type { Context } from "~/types";

export default function () {
  const { user } = useOutletContext<Context>();
  const isAdmin = user.role === "ADMIN";
  const isCashier = user.role === "USER";
  const [showSettings, setShowSettings] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "loading") setShowSettings(false);
  }, [navigation.state]);

  return (
    <>
      <div className="fixed text-white bg-gray-700 w-full p-3">
        <h1 className="text-xl float-left">{user.username}</h1>
        <div className="flex justify-end gap-2 float-right">
          <button
            onClick={() => {
              setShowSettings(!showSettings);
            }}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <button
            onClick={() => {
              history.back();
            }}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>
      </div>
      {showSettings && (
        <ul
          className="left-0 mt-mt-53 fixed right-0 text-xl overflow-auto bg-gray-700 text-center
         text-white flex flex-col gap-8 px-7 py-9 shadow-transparent md:left-auto z-30"
        >
          {isAdmin && (
            <li key={0}>
              <Link to="staff">Manage Staff</Link>
            </li>
          )}
          <li key={5}>
            <Link to="suppliers">Suppliers</Link>
          </li>
          {(isAdmin || isCashier) && (
            <li key={6}>
              <Link to="addproduct">Add Product to Shelf</Link>
            </li>
          )}
          <li key={7}>
            <Link to={`shelf`}>Shelf</Link>
          </li>
          <li key={9}>
            <Link to={`invoices`}>Invoices</Link>
          </li>
          <li key={10}>
            <Link to={`ledger`}>Ledger</Link>
          </li>
          <li key={11}>
            <Link to="">Dashboard</Link>
          </li>
        </ul>
      )}
      <div className="mt-24">
        <Outlet context={{ user }} />
      </div>
    </>
  );
}
