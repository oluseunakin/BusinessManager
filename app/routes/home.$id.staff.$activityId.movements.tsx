import { defer, type LoaderArgs } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { PMC } from "~/components/ProductMovementComponent";
import { getProductMovementActivity } from "~/server/model/activity";

export const loader = async ({ params }: LoaderArgs) => {
  const activityId = Number(params.activityId);
  return defer({ activity: getProductMovementActivity(activityId) });
};

export default function () {
  const { activity } = useLoaderData<typeof loader>();
  return (
    <Suspense>
      <Await resolve={activity}>
        {(activity) =>
          activity!.productMovements.length > 0 ? (
            <div className="flex flex-col gap-5 mt-10 ">
              {activity?.productMovements.map((p, i) => (
                <PMC key={i} p={p} />
              ))}
            </div>
          ) : (
            <p className="text-center text-2xl mt-20">Nothing to see here</p>
          )
        }
      </Await>
    </Suspense>
  );
}
