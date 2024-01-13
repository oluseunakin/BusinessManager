import { Status } from "@prisma/client";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useParams,
  useRouteError,
} from "@remix-run/react";
import { useState } from "react";
import { getCompanyWithSuppliers, getInventory } from "~/server/model/company";
import { addToShelf, updateProductOnShelf } from "~/server/model/shelf";
import { getUserSession } from "~/server/session";
import { getLedgerByType, createLedger } from "~/server/model/ledger";
import { createTransaction } from "~/server/model/transaction";
import {
  createTodayStock,
  getTodayStockWithProducts,
} from "~/server/model/stock";
import type { ProductOnShelf, TodayStock } from "~/types";
import { createOrder } from "~/server/model/orders";
import { buyMovement } from "~/server/model/movement";
import { prisma } from "~/server/db.server";
import { createSupplier } from "~/server/model/supplier";

export function ErrorBoundary() {
  const error = useRouteError();
  const { id } = useParams();
  return (
    <div className="flex justify-center text-2xl text-blue-700">
      {isRouteErrorResponse(error) && (
        <Link to={`/home/${id}/shelf/stock/takestock`}>{error.data} </Link>
      )}
    </div>
  );
}

export const loader = async ({ params }: LoaderArgs) => {
  const companyId = Number(params.id);
  let stock: TodayStock;
  try {
    stock = await getTodayStockWithProducts(companyId);
  } catch (e) {
    const companyWithInventory = await getInventory(companyId);
    stock = await createTodayStock(companyId, companyWithInventory.products);
  }
  const companyWithSuppliers = await getCompanyWithSuppliers(companyId);
  return json({ companyWithSuppliers, stock });
};

export const action = async ({ request, params }: ActionArgs) => {
  const session = await getUserSession(request);
  const userId = session.get("userid");
  const fd = await request.formData();
  let productInShelf: {
    productName: string;
  };
  const sum = fd.get("sum") as string;
  const today = new Date();
  const todayAsNumber =
    today.getDate() + today.getFullYear() + today.getMonth();
  const supplierName = fd.get("supplierName") as string;
  const phone = fd.get("phone") as string;
  const address = fd.get("address") as string;
  const status = fd.get("status") as string as Status;
  const deliveryDate = fd.get("deliveryDate");
  const companyId = Number(params.id);
  const supplierId = isNaN(Number(fd.get("supplierId" as string)))
    ? (await createSupplier(supplierName, companyId, phone, address)).id
    : Number(fd.get("supplierId" as string));
  const inQuantity = Number(fd.get("inQuantity") as string);
  try {
    await prisma.$transaction(async (tx) => {
      try {
        const product = JSON.parse(
          fd.get("product") as string
        ) as ProductOnShelf;
        const nq = Number(fd.get("nq") as string);
        productInShelf = await updateProductOnShelf(
          product.productName,
          "quantity",
          nq,
          tx
        );
      } catch (e) {
        const name = fd.get("name") as string;
        const costPrice = fd.get("costPrice") as string;
        const sellingPrice = fd.get("sellingPrice") as string;
        const description = fd.get("description") as string;
        const stockId = Number(fd.get("stockId") as string);
        productInShelf = await addToShelf(
          sellingPrice,
          inQuantity,
          stockId,
          companyId,
          name,
          costPrice,
          tx,
          description
        );
      }
      await createOrder(
        tx,
        supplierId,
        status,
        companyId,
        todayAsNumber,
        productInShelf.productName,
        sum,
        deliveryDate,
      );
      await buyMovement(
        productInShelf.productName,
        inQuantity,
        userId!,
        companyId,
        todayAsNumber,
        tx
      );
      let ledger = await getLedgerByType("DEBIT");
      if (!ledger)
        ledger = await createLedger("Purchase", "DEBIT", "ASSET", companyId, tx);
      await createTransaction(sum, ledger!.id, todayAsNumber, userId!, tx);  
    });
    return redirect(`/home/${companyId}/shelf/stock`);
  } catch (e) {
    console.log(e);
    throw json("Something bad happened", 400);
  }
};

export default function () {
  const { companyWithSuppliers, stock } = useLoaderData<typeof loader>();
  const [future, setFuture] = useState(false);
  const [show, setShow] = useState(false);
  const [create, setCreate] = useState(false);
  const [oldQuantity, setOldQuantity] = useState(-1);
  return (
    <Form
      className="mx-auto flex flex-col gap-4 shadow bg-white mt-10 p-4 w-11/12 lg:w-1/2 md:w-3/4"
      method="post"
    >
      <h4 className="text-center flex justify-center text-2xl text-green-700 mt-6 mb-4">
        Add Product to Shelf
      </h4>
      <select
        name="product"
        className="p-3 border"
        onChange={(e) => {
          if (e.target.value === "cnp") setCreate(true);
          else if (e.target.value !== "cnp" && e.target.value !== "scp") {
            const product = JSON.parse(e.target.value) as ProductOnShelf;
            setOldQuantity(product.currentQuantity);
          } else setCreate(false);
        }}
      >
        <option value="scp">Select or create a Product</option>
        {stock?.products.map((product, i) => (
          <option key={i} value={JSON.stringify(product)}>
            {product.productName}
          </option>
        ))}
        <option value="cnp">Create new Product</option>
      </select>
      {oldQuantity != -1 && (
        <>
          <p>{oldQuantity}</p>
          <input name="nq" value={oldQuantity} type="hidden" />
        </>
      )}
      {create && (
        <>
          <input
            name="name"
            placeholder="Name of product"
            required
            className="border p-3"
          />
          <input
            type="number"
            name="costPrice"
            placeholder="Cost Price"
            required
            className="border p-3"
          />
          <input
            type="number"
            name="sellingPrice"
            placeholder="Selling Price"
            required
            className="border p-3"
          />{" "}
        </>
      )}
      <input
        type="number"
        name="inQuantity"
        onBlur={(e) => {
          if (oldQuantity != -1)
            setOldQuantity(oldQuantity + e.target.valueAsNumber);
        }}
        placeholder="Quantity"
        className="border p-3"
        required
      />
      <input
        type="number"
        name="sum"
        placeholder="Value of Purchase"
        className="border p-3"
        required
      />
      <textarea
        placeholder="Brief description"
        name="description"
        className="border p-3 resize-none"
      ></textarea>
      <select
        className="p-3 border "
        name="supplierId"
        required
        onChange={(e) => {
          if (e.target.value === "as") setShow(true);
          else setShow(false);
        }}
      >
        <option>Choose Supplier</option>
        {companyWithSuppliers &&
          companyWithSuppliers.suppliers.map((supplier, i) => (
            <option key={i} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
        <option value="as">Add Supplier</option>
      </select>
      {show && (
        <div className="flex flex-col gap-4">
          <input
            required
            placeholder="Name of Supplier"
            className="p-2 border"
            name="supplierName"
          />
          <input placeholder="Address" className="p-3 border" name="address" />
          <input placeholder="Phone" className="p-3 border" name="phone" />
        </div>
      )}
      <div className="flex gap-2">
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) {
              setFuture(true);
            }
          }}
        />
        <p>Is delivery in the future?</p>
      </div>
      {future && <input type="date" name="deliveryDate" />}
      <input
        type="hidden"
        name="status"
        value={future ? Status.PENDING : Status.RECEIVED}
      />
      <input type="hidden" name="stockId" value={stock!.id} />
      <button
        type="submit"
        className="px-4 py-2 bg-red-700 w-max mx-auto text-white mt-6 rounded-md"
      >
        Add Product
      </button>
    </Form>
  );
}
