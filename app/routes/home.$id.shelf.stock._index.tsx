import { defer, json, redirect } from "@remix-run/node";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import {
  Await,
  useLoaderData,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { Suspense, useEffect, useState } from "react";
import { Cart } from "~/components/Cart";
import { Payment } from "~/components/Payment";
import { ProductOnShelfComponent } from "~/components/ProductOnShelfComponent";
import { getCompanyCustomers } from "~/server/model/company";
import { createCustomer } from "~/server/model/customer";
import { generateInvoice } from "~/server/model/invoice";
import { createLedger, getLedgerByType } from "~/server/model/ledger";
import { sellMovement } from "~/server/model/movement";
import { sellProduct } from "~/server/model/shelf";
import { getTodayStockWithProducts } from "~/server/model/stock";
import { createTransaction } from "~/server/model/transaction";
import { getUserSession } from "~/server/session";
import type { Context } from "~/types";
import { prisma } from "~/server/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  const id = Number(params.id);
  const customers = getCompanyCustomers(id);
  try {
    const today = await getTodayStockWithProducts(id);
    return defer({ today, customers });
  } catch (e) {
    return defer({ today: null, customers });
  }
};

export const action = async ({ request, params }: ActionArgs) => {
  const session = await getUserSession(request);
  const userId = session.get("userid");
  const companyId = Number(params.id);
  const fd = await request.formData();
  const customer = fd.get("customer") as string;
  let customerId = Number(customer);
  if (isNaN(customerId)) {
    const customerFromDb = await createCustomer(customer, companyId);
    customerId = customerFromDb.id;
  }
  const cart = JSON.parse(fd.get("cart") as string) as {
    name: string;
    quantity: number;
    price: number;
    cq: number;
  }[];
  const sum = fd.get("sum") as string;
  const today = new Date();
  const todayAsNumber =
    today.getDate() + today.getFullYear() + today.getMonth();
  try {
    await prisma.$transaction(async (tx) => {
      cart.forEach(async (product, i) => {
        await sellProduct(product.name, product.cq, tx);
        await sellMovement(
          product.name,
          product.quantity,
          userId!,
          companyId,
          todayAsNumber,
          tx
        );
      });
      let ledger = await getLedgerByType("CREDIT");
      if (!ledger)
        ledger = await createLedger("Sales", "CREDIT", "REVENUE", companyId, tx);
      await createTransaction(sum, ledger!.id, todayAsNumber, userId!, tx);
      await generateInvoice(
        customerId,
        companyId,
        cart.map((c) => ({ productName: c.name, quantity: c.quantity })),
        todayAsNumber,
        tx
      );
    });
    return redirect(`/home/${companyId}/shelf/stock`);
  } catch (e) {
    console.log(e);
    throw json("Something bad happened", 400);
  }
};

export default function () {
  const { today, customers } = useLoaderData<typeof loader>();
  const { companyProducts } = useOutletContext<Context>();
  const [cart, addToCart] = useState<
    { name: string; quantity: number; price: number; cq: number }[]
  >([]);
  const [toShow, setToShow] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({
    cart: "",
    customer: "",
    sum: -1,
  });
  const [createCustomer, setCreateCustomer] = useState(false);
  const submit = useSubmit();

  useEffect(() => {
    if (today) {
      companyProducts.productsRef.current = today.products;
      companyProducts.setProducts(today.products);
    }
  }, [today, companyProducts]);

  return (
    <>
      {cart.length > 0 && (
        <div className="flex justify-end mr-2 mb-4">
          <button
            onClick={() => {
              if (toShow === "cart") setToShow("");
              else {
                setToShow("cart");
              }
            }}
          >
            <span className="material-symbols-outlined">
              shopping_cart_checkout
            </span>
          </button>
        </div>
      )}
      {toShow === "cart" && (
        <Cart
          cart={cart}
          setToShow={setToShow}
          setPaymentInfo={setPaymentInfo}
        />
      )}
      {toShow === "paymentypes" && (
        <div className="shadow w-11/12 mx-auto p-2 bg-slate-50 md:w-2/4 lg:w-2/5">
          <Payment setToShow={setToShow} />
        </div>
      )}
      {toShow === "cash" && (
        <div className="w-max mx-auto">
          <button
            className="px-4 py-2 bg-red-600 text-white"
            onClick={() => {
              setToShow("invoice");
            }}
          >
            Acknowledge cash and create invoice
          </button>
        </div>
      )}
      {toShow === "invoice" && (
        <div className="shadow w-11/12 mx-auto p-2 bg-slate-50 md:w-2/4 lg:w-2/5">
          <Suspense>
            <Await resolve={customers}>
              {(customers) => (
                <div className="flex flex-col gap-4 p-4">
                  <select
                    className="mt-2 p-3 text-center border border-black"
                    onChange={(e) => {
                      if (e.target.value === "cc") setCreateCustomer(true);
                      else if (e.target.value === "sc") {
                        /* empty */
                      } else {
                        setCreateCustomer(false);
                        setPaymentInfo({
                          ...paymentInfo,
                          customer: e.target.value,
                        });
                      }
                    }}
                  >
                    <option value="sc">Select or create Customer</option>
                    {customers!.customers.map((customer, i) => (
                      <option value={customer.id} key={i}>
                        {customer.name}
                      </option>
                    ))}
                    <option value="cc">Create Customer</option>
                  </select>
                  {createCustomer && (
                    <input
                      placeholder="Customer name here..."
                      className="p-2"
                      onChange={(e) => {
                        setPaymentInfo({
                          ...paymentInfo,
                          customer: e.target.value,
                        });
                      }}
                    />
                  )}
                  <button
                    className="px-4 py-2 bg-red-600 text-white text-2xl w-max mx-auto"
                    onClick={() => {
                      submit(paymentInfo, { method: "post" });
                    }}
                  >
                    Finish Payment
                  </button>
                </div>
              )}
            </Await>
          </Suspense>
        </div>
      )}
      {companyProducts ? (
        companyProducts.products && companyProducts.products.length >= 1 ? (
          <div className="flex flex-col gap-5 mt-10 w-11/12 md:w-3/4 lg:w-3/5 mx-auto">
            {companyProducts.products.map((product, i) => (
              <ProductOnShelfComponent
                key={i}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center mt-10 text-3xl text-center">
            Nothing to see here
          </div>
        )
      ) : (
        <div className="flex items-center gap-4 flex-col mt-10 text-3xl text-center">
          <p>Stock has not been taken today</p>
          <p>Take stock above</p>
        </div>
      )}
    </>
  );
}
