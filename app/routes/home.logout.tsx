import { redirect, type LoaderArgs } from "@remix-run/node";
import { destroySession, getUserSession } from "~/server/session";

export const loader = async ({ request }: LoaderArgs) => {
  const session = await getUserSession(request);
  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
};
