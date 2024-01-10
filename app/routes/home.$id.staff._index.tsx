import type { LoaderArgs } from "@remix-run/node";
import { defer } from "@remix-run/node";
import { Await, Link, useLoaderData } from "@remix-run/react";
import { Suspense, useEffect, useRef, useState } from "react";
import { Spinner } from "~/components/Spinner";
import { getCompanyStaff } from "~/server/model/company";

export const loader = ({ params }: LoaderArgs) => {
  return defer({ company: getCompanyStaff(Number(params.id)) });
};

export default function () {
  const { company } = useLoaderData<typeof loader>();
  const [staff, setStaff] =
    useState<{ username: string; activityId: number }[]>();
  const staffRef = useRef<{ username: string; activityId: number }[]>();

  useEffect(() => {
    if(staffRef.current) setStaff(staffRef.current)
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center">
        <input
          placeholder="Enter to search..."
          className="p-2 border"
          onChange={(e) => {
            const cs = staffRef.current;
            if (cs) {
              const toSearch = e.target.value;
              if (toSearch.match(/^\s*$/)) {
                /* empty */
              } else {
                const filtered = cs.filter((user) =>
                  user.username.toLowerCase().match(toSearch)
                );
                setStaff(filtered);
              }
            }
          }}
        />
      </div>
      <Suspense
        fallback={
          <div className="w-max mx-auto">
            <Spinner width="w-10" height="h-10" />
          </div>
        }
      >
        <Await resolve={company}>
          {(company) => {
            staffRef.current = company?.staff;
            return staff && staff.length > 0 ? (
              <div className="flex flex-wrap flex-row gap-4 items-center justify-around">
                {staff.map((user, i) => (
                  <div
                    key={i}
                    className="flex gap-3 p-4 shadow bg-white flex-col"
                  >
                    <Link
                      className="text-2xl text-center text-sky-950"
                      to={`${user.activityId}`}
                    >
                      {user.username}
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <h4 className="text-3xl flex justify-center">
                Nothing to see here
              </h4>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
