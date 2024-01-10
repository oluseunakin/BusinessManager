import { Await, useFetcher, useLoaderData } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/router";
import { Suspense, useEffect, useRef, useState } from "react";
import { Role } from ".prisma/client";
import { createUserSession } from "~/server/session";
import { createId } from "~/helper";
import { createUser, getUser } from "~/server/model/user";
import { defer, json } from "@remix-run/node";
import { getCompanies } from "~/server/model/company";
import { Spinner } from "~/components/Spinner";
import { updateLastLogin } from "~/server/model/activity";

export const loader = () => {
  return defer({ companies: getCompanies() });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  const username = fd.get("username") as string;
  const password = fd.get("password") as string;
  const role = fd.get("role") as Role;
  const companyId = Number(fd.get("companyId") as string);
  const type = fd.get("type") as string;
  const date = new Date();
  const asNumber = date.getDate() + date.getFullYear() + date.getMonth();
  if (type === "signup") {
    try {
      const createdUser = await createUser(
        username,
        password,
        role,
        asNumber,
        companyId
      );
      return await createUserSession(request, createdUser.id);
    } catch (e) {
      console.log(e);
      return "Signup failed";
    }
  } else {
    try {
      const id = createId([username, password]);
      const userInDb = await getUser(id);
      if (userInDb) await updateLastLogin(userInDb.id, asNumber, date);
      return await createUserSession(request, userInDb!.id);
    } catch (e) {
      return json("User doesn't exists", 404);
    }
  }
};

export default function () {
  const [type, setType] = useState<string>();
  const fetcher = useFetcher();
  const [error, setError] = useState<string>();
  const { companies } = useLoaderData<typeof loader>();
  const passwordRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const companyRef = useRef<HTMLSelectElement>(null);
  const [showId, setShowId] = useState(false);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setError(fetcher.data);
    }
  }, [fetcher.data, fetcher.state]);

  return (
    <div>
      <div className="flex bg-slate-900 flex-wrap items-center text-white">
        <h1 className="m-4 text-2xl p-2 text-slate-400">MyBusinessManager</h1>
        <div className="flex justify-end gap-4 flex-grow mt-2 mr-2">
          <button
            className="px-4 py-2 rounded-md bg-amber-600 border"
            onClick={() => {
              setError(undefined);
              setType("signup");
            }}
          >
            Sign Up
          </button>
          <button
            className="px-4 py-2 rounded-md border bg-cyan-700 "
            onClick={() => {
              setError(undefined);
              setType("login");
            }}
          >
            Login
          </button>
        </div>
      </div>
      {!type ? null : (
        <div>
          <h1 className="sm:w-3/5 lg:w-2/5 w-4/5 text-red-500 rounded mx-auto px-6 text-5xl my-8 p-4 text-center">
            {type === "signup" ? "Sign up here" : "Login here"}
          </h1>
          <fetcher.Form
            method="post"
            className="w-11/12 lg:w-3/5 mx-auto bg-slate-700 text-slate-950 p-5 pb-5 md:p-10 rounded-lg mb-2"
          >
            <div className="flex flex-col gap-4">
              <input type="hidden" name="type" value={type} />
              <input name="username" className="p-3 rounded" required />
              <input
                type="password"
                name="password"
                className="p-3 rounded"
                required
                ref={passwordRef}
              />
              {type === "signup" && (
                <div className="flex flex-col gap-4">
                  <Suspense
                    fallback={
                      <div className="flex justify-center">
                        <Spinner width="w-10" height="h-10" />
                      </div>
                    }
                  >
                    <Await resolve={companies}>
                      {(resolvedCompanies) => (
                        <select
                          className="p-3 rounded"
                          required
                          name="companyId"
                          ref={companyRef}
                          onChange={(e) => {
                            if (e.target.value === "cc") {
                              setShowId(false);
                            } else {
                              setError(undefined);
                              submitRef.current!.disabled = false;
                              setShowId(true);
                            }
                          }}
                        >
                          <option value="cc">Choose Company</option>
                          {resolvedCompanies.map((company, i) => (
                            <option
                              key={i}
                              value={company.id}
                              className="text-lg p-3"
                            >
                              {company.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </Await>
                  </Suspense>
                  <select
                    name="role"
                    className="p-3 rounded"
                    required
                    onChange={(e) => {
                      if (e.target.value === Role.ADMIN) {
                        if (companyRef.current?.value === "cc") {
                          setShowId(false);
                          setError(undefined);
                          submitRef.current!.disabled = false;
                        } else {
                          setError("You can't be admin of someone else's company lol")
                          submitRef.current!.disabled = true;
                          setShowId(false)
                        }
                      } else {
                        if (companyRef.current?.value === "cc") {
                          setError("You have to choose your company");
                          submitRef.current!.disabled = true;
                          setShowId(false);
                        } else {
                          setShowId(true);
                          submitRef.current!.disabled = false;
                          setError(undefined)
                        }
                      }
                    }}
                  >
                    <option>Select role</option>
                    <option value={Role.USER}>Cashier</option>
                    <option value={Role.ADMIN}>Admin</option>
                  </select>
                </div>
              )}
              {showId && (
                <input
                  placeholder="Company secret key here..."
                  className="p-3 rounded"
                  onChange={(e) => {
                    if (e.target.value !== companyRef.current!.value) {
                      setError("Key is not correct");
                      submitRef.current!.disabled = true;
                    } else {
                      setError(undefined);
                      submitRef.current!.disabled = false;
                    }
                  }}
                />
              )}
              {error && (
                <p className="text-red-500 flex justify-center text-lg">
                  {error}
                </p>
              )}
              <button
                type="submit"
                ref={submitRef}
                onClick={() => {
                  const password = passwordRef.current!;
                  const id = createId([password.value]);
                  password.value = id.toString(2);
                }}
                className="mt-4 bg-red-500 text-white p-3 w-max mx-auto rounded-sm"
              >
                {type === "signup" ? "Sign Up" : "Login"}
              </button>
            </div>
          </fetcher.Form>
        </div>
      )}
    </div>
  );
}
