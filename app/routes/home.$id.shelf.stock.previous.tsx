import { defer, type LoaderArgs } from "@remix-run/node";
import { Await, Link, useLoaderData, useParams } from "@remix-run/react";
import { Suspense } from "react";
import { MyDate } from "~/components/Date";
import { Spinner } from "~/components/Spinner";
import { getCompanyWithStocks } from "~/server/model/company";

export const loader = async ({ params }: LoaderArgs) => {
  const companyId = Number(params.id);
  return defer({ previous: getCompanyWithStocks(companyId) });
};

export default function () {
  const { previous } = useLoaderData<typeof loader>();
  const { id } = useParams();
  return (
    <Suspense
      fallback={
        <div className="flex justify-center">
          <Spinner width="w-10" height="h-10" />
        </div>
      }
    >
      <Await resolve={previous}>
        {(previous) =>
          previous!.stocks.length >= 1 ? (
            <ul className="flex flex-col gap-4 w-3/4 md:w-1/4 mx-auto">
              {previous?.stocks.map((stock, i) => {
                const date = new Date(stock.date)
                return (
                <li key={i} className="shadow bg-white p-4">
                  <Link to={`/home/${id}/shelf/stock/${stock.id}`} className="text-sky-700 text-center text-3xl">
                    <MyDate day={date.getDate()} month={date.getMonth() + 1} year={date.getFullYear()} />
                  </Link>
                </li>
              )})}
            </ul>
          ) : (
            <p>Nothing to see here</p>
          )
        }
      </Await>
    </Suspense>
  );
}
