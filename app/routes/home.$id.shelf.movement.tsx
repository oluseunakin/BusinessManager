import { MovementType } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { defer, json } from "@remix-run/node";
import { Await, useLoaderData, useSearchParams } from "@remix-run/react";
import { Suspense, useEffect, useRef, useState } from "react";
import { PMC } from "~/components/ProductMovementComponent";
import { Spinner } from "~/components/Spinner";
import { getCompanyMovements } from "~/server/model/company";
import type { ProductMovement } from "~/types";

export const loader = async ({ params }: LoaderArgs) => {
  try {
    const companyId = Number(params.id);
    return defer({ company: getCompanyMovements(companyId) });
  } catch (e) {
    console.log(e);
    throw json("Error getting Orders");
  }
};

export default function () {
  const { company } = useLoaderData<typeof loader>();
  const companyRef = useRef<any[]>();
  const [movements, setMovements] = useState<ProductMovement[]>();
  const [query] = useSearchParams()
  const type = query.get("type")
  const inwardRef = useRef<HTMLInputElement>(null), outwardRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (companyRef.current && outwardRef.current && inwardRef.current) {
      setMovements(companyRef.current);
      if(type === "inward") {
        inwardRef.current.checked = true
        const filtered = companyRef.current.filter(
          (movement) => movement.type === MovementType.INWARD
        );
        setMovements(filtered);
      }else {
        outwardRef.current.checked = true
        const filtered = companyRef.current.filter(
          (movement) => movement.type === MovementType.OUTWARD
        );
        setMovements(filtered);
      }
    }
  }, [type]);

  return (
    <>
      <div className="flex justify-center mb-10 gap-3">
        <label htmlFor="inward">
          <input
            type="radio"
            id="inward"
            ref={inwardRef}
            name="movement"
            onChange={(e) => {
              const cm = companyRef.current;
              if (e.target.checked && cm) {
                const filtered = cm.filter(
                  (movement) => movement.type === MovementType.INWARD
                );
                setMovements(filtered);
              }
            }}
          />{" "}
          Inward
        </label>
        <label htmlFor="outward">
          <input
            type="radio"
            ref={outwardRef}
            id="outward"
            name="movement"
            onChange={(e) => {
              const cm = companyRef.current;
              if (e.target.checked && cm) {
                const filtered = cm.filter(
                  (movement) => movement.type === MovementType.OUTWARD
                );
                setMovements(filtered);
              }
            }}
          />{" "}
          Outward
        </label>
        <label htmlFor="reset">
          <input
            type="radio"
            id="reset"
            name="movement"
            onChange={(e) => {
              const cm = companyRef.current;
              if (e.target.checked && cm) {
                setMovements(cm);
              }
            }}
          />{" "}
          Reset
        </label>
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
            companyRef.current = company.movements;
            return movements && movements.length >= 1 ? (
              <div className="flex flex-col gap-5 w-11/12 md:w-4/5 mx-auto">
                <div className="grid grid-cols-4 text-center text-lg text-amber-700">
                  <span>Product</span>
                  <span>Quantity</span>
                  <span>Movement</span>
                  <span>Date</span>
                </div>
                <div className="flex flex-col gap-5 mt-10 ">
                  {movements.map((movement, i) => (
                    <PMC key={i} p={movement} />
                  ))}
                </div>
              </div>
            ) : (
              <h4 className="m-10 w-max mx-auto">Nothing to see here</h4>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}
