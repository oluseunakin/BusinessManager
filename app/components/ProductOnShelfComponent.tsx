import { useEffect, useState } from "react";
import type { ProductOnShelf } from "~/types";

export const ProductOnShelfComponent = (props: {
  product: ProductOnShelf;
  addToCart?: React.Dispatch<
    React.SetStateAction<
      { name: string; quantity: number; price: number; cq: number }[]
    >
  >;
}) => {
  const { product, addToCart} = props;
  const [toAdd, setToAdd] = useState({
    name: product.productName,
    price: Number(product.sellingPrice),
    quantity: -1,
    cq: product.currentQuantity,
  });

  useEffect(() => {
    if (addToCart && toAdd.quantity != -1) {
      addToCart(oldCart => [...oldCart, toAdd]);
    }
  }, [addToCart, toAdd.cq]);
  
  return (
    <div className="rounded flex gap-4 justify-around flex-wrap items-center shadow-md bg-white p-4">
      <div>
        <h3 className="text-center text-lg text-cyan-950">
          {product?.productName}
        </h3>
        <p className="text-sm text-cyan-900">Stock: {toAdd.cq}</p>
      </div>
      {addToCart && (
        <p className="flex gap-2 items-center">
          <input
            type="number"
            className="border p-2"
            onChange={(e) => {
              const inputted = e.target.valueAsNumber;
              if (inputted > product.currentQuantity)
                e.target.valueAsNumber = product.currentQuantity;
              else setToAdd({ ...toAdd, quantity: e.target.valueAsNumber });
            }}
          />
          <button
            onClick={() => {
              setToAdd({ ...toAdd, cq: toAdd.cq - toAdd.quantity });
            }}
            className="px-4 py-2 border w-max bg-slate-800 text-white rounded-lg"
          >
            <span className="material-symbols-outlined">add_shopping_cart</span>
          </button>
        </p>
      )}
    </div>
  );
};
