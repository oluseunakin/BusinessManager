import { defer, type LoaderArgs } from "@remix-run/node";
import { Await, useLoaderData, useOutletContext } from "@remix-run/react";
import { Suspense } from "react";
import { ProductOnShelfComponent } from "~/components/ProductOnShelfComponent";
import { Spinner } from "~/components/Spinner";
import { getStock } from "~/server/model/stock";
import type { Context } from "~/types";

export const loader = async ({ params }: LoaderArgs) => {
  const stockId = Number(params.stockId);
  return defer({ stock: getStock(stockId) });
};

export default function () {
  const { stock } = useLoaderData<typeof loader>();
  const { companyProducts } = useOutletContext<Context>();

  return (
    <Suspense
      fallback={
        <div className="flex justify-center">
          <Spinner width="w-10" height="h-10" />
        </div>
      }
    >
      <Await resolve={stock}>
        {(stock) => {
          companyProducts.productsRef.current = stock.products;
          return (
            <div className="flex flex-col gap-5 mt-10 w-11/12 md:w-3/4 lg:w-3/5 mx-auto">
              {companyProducts.products &&
                companyProducts.products.map((product, i) => (
                  <ProductOnShelfComponent product={product} key={i} />
                ))}
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
