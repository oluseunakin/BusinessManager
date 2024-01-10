import { defer, redirect } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { getUserSession } from "~/server/session";
import { getUser } from "~/server/model/user";
import { getOwnerWithCompanies } from "~/server/model/owner";
import { useLoaderData, Await, Link } from "@remix-run/react";
import { Suspense } from "react";
import { CompaniesList } from "~/components/CompaniesList";
import { Spinner } from "~/components/Spinner";

export const loader = async ({ request }: LoaderArgs) => {
  const session = await getUserSession(request);
  const userid = session.get("userid");
  if (userid) {
    const user = await getUser(userid);
    if (user.role === "ADMIN") {
      return defer({ owner: getOwnerWithCompanies(userid) });
    }
    const companyId = user.companyId;
    throw redirect(`${companyId}`);
  }
};

export default function () {
  const { owner } = useLoaderData<typeof loader>();

  return (
    <Suspense
      fallback={
        <div className="flex justify-center mt-28">
          <Spinner width="w-10" height="h-10" />
        </div>
      }
    >
      <Await resolve={owner}>
        {(owner) =>
          owner ? (
            <CompaniesList list={owner!.company} />
          ) : (
            <div className="mt-40 bg-orange-300 p-4 w-11/12 mx-auto md:w-3/5 lg:w-2/5">
              <h2 className="text-center text-3xl mb-5">
                You have not registered any company yet
              </h2>
              <div className="flex justify-center">
                <Link to="register" className="text-2xl text-red-500">
                  Click here to register
                </Link>
              </div>
            </div>
          )
        }
      </Await>
    </Suspense>
  );
}
