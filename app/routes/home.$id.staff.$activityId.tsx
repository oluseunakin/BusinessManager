import type { LoaderArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { MyDate } from "~/components/Date";
import { getActivity } from "~/server/model/activity";

export const loader = async ({ params }: LoaderArgs) => {
  return await getActivity(Number(params.activityId));
};

export default function () {
  const activity = useLoaderData<typeof loader>();
  const date = new Date(activity!.lastlogin);
  return (
    <>
      <div className="flex justify-end m-4 gap-2">
        <p>{activity?.user?.username}</p>
        <p>Last login </p>
        <MyDate
          day={date.getDate()}
          month={date.getMonth() + 1}
          year={date.getFullYear()}
        />
      </div>
      <div className="flex gap-3 justify-around m-4">
        <Link to="movements" className="text-blue-500">
          Product Movements
        </Link>
        <Link to="trails" className="text-blue-500">
          Audit Trails
        </Link>
      </div>
      <Outlet />
    </>
  );
}
