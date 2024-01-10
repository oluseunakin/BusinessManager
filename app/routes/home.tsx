import { json, redirect } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getUser } from "~/server/model/user";
import { getUserSession } from "~/server/session";

export const loader = async ({ request }: LoaderArgs) => {
  const session = await getUserSession(request);
  const userid = session.get("userid");
  if (userid) {
    const user = await getUser(userid);
    return json({ user });
  }
  throw redirect("/auth");
};

export default function () {
  const { user } = useLoaderData<typeof loader>();

  return (
    <main className="h-full mb-2">
      <div className="bg-gray-800 text-white fixed p-3 top-0 left-0 right-0 h-auto">
        <div>
          <Link className="text-3xl pt-3 p-2" to="/">
            My Business
          </Link>
        </div>
        <div className="flex justify-end mr-1">
          <Link to="logout" className="absolute right-1 top-5">
            <span className="material-symbols-outlined">logout</span>
          </Link>
        </div>
      </div>
      <div className="absolute top-14 w-full">
        <Outlet context={{ user }} />
      </div>
    </main>
  );
}
