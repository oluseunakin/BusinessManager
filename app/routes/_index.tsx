import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getUserSession } from "~/server/session";

export function headers({
  loaderHeaders,
  parentHeaders,
}: {
  loaderHeaders: Headers;
  parentHeaders: Headers;
}) {
  return {
    // This is an example of how to set caching headers for a route
    // For more info on headers in Remix, see: https://remix.run/docs/en/v1/route/headers
    "Cache-Control": "public, max-age=60, s-maxage=60",
  };
}

export const meta: V2_MetaFunction = () => [{ title: "My Business Manager" }];

export const loader = async ({ request }: LoaderArgs) => {
  const session = await getUserSession(request);
  const userid = session.get("userid");
  if (userid) {
    return redirect("home")
  }
  return redirect("auth");
};

