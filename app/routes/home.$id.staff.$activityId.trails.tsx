import { defer, type LoaderArgs } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { Trail } from "~/components/Trail";
import { getAuditTrailsActivity } from "~/server/model/activity";

export const loader = async ({ params }: LoaderArgs) => {
  const activityId = Number(params.activityId);
  return defer({ activity: getAuditTrailsActivity(activityId) });
};

export default function () {
  const { activity } = useLoaderData<typeof loader>();
  return (
    <Suspense>
      <Await resolve={activity}>
        {(activity) =>activity!.trails.length> 0?
          <Trail trails={activity}/>: (
            <p className="text-center text-2xl">Nothing to see here</p>
          )
        }
      </Await>
    </Suspense>
  );
}
