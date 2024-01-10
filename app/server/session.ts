import { createCookieSessionStorage, redirect } from "@remix-run/node"; // or cloudflare/deno

type SessionData = {
  userid: number;
};

type SessionFlashData = {
  error: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",

      // all of these are optional
      httpOnly: true,
      maxAge: 60,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: true,
    },
  });

export const createUserSession = async (request: Request, id: number) => {
  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);
  session.set("userid", id);
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session, { maxAge: 60 * 60 * 24 }),
    },
  });
};

export const getUserSession = async (request: Request) => {
  return await getSession(request.headers.get("Cookie"))
}

export {destroySession}