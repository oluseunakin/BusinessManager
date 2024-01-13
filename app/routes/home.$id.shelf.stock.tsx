import { Link, Outlet } from "@remix-run/react";
import { useRef, useState } from "react";

export default function () {
  const [products, setProducts] = useState<
    {
      productName: string;
      inQuantity: number;
      currentQuantity: number;
      sellingPrice: string;
      stockId: number;
      companyId: number;
    }[]
  >();
  const productsRef = useRef<
    {
      productName: string;
      inQuantity: number;
      currentQuantity: number;
      sellingPrice: string;
      stockId: number;
      companyId: number;
    }[]
  >();
  return (
    <>
      <div className="flex gap-10 items-center flex-wrap">
        <div className="flex gap-4 lg:w-2/5 ml-4 justify-around flex-grow lg:flex-grow-0">
          <Link to="previous" className="text-blue-600">
            See Previous Stocks{" "}
          </Link>
        </div>
        <input
          placeholder="Search for a product"
          className="p-2 border-2 rounded-md flex-grow mx-4"
          onChange={(e) => {
            const cp = productsRef.current;
            if (cp) {
              const toSearch = e.target.value;
              if (toSearch.match(/^\s*$/)) {
                setProducts(cp)
              } else {
                const filtered = cp.filter((product) =>
                  product.productName.toLowerCase().match(toSearch)
                );
                setProducts(filtered);
              }
            }
          }}
        />
      </div>
      <div className="mt-10">
        <Outlet
          context={{
            companyProducts: { products, setProducts, productsRef },
          }}
        />
      </div>
    </>
  );
}
