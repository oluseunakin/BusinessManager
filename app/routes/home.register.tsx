import { json, type ActionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createId } from "~/helper";
import { createCompany } from "~/server/model/company";
import { getUserSession } from "~/server/session";

export const action = async ({ request }: ActionArgs) => {
  const session = await getUserSession(request);
  const userid = session.get("userid");
  if (userid) {
    const userId = Number(userid);
    const fd = await request.formData();
    const name = fd.get("company") as string;
    const address = fd.get("address") as string;
    const companyId = createId([name, address]);
    try {
      await createCompany(name, companyId, userId, address);
      return redirect("/");
    } catch (e) {
      console.log(e);
      throw json("Choose a different name for your Business", 400);
    }
  } else throw redirect("/auth");
};

export default function () {
  return (
    <>
      <h1 className="sm:w-3/5 lg:w-2/5 w-4/5 bg-amber-600 mx-auto p-4 px-6 text-white text-5xl mt-10 mb-10 text-center">
        Register your business
      </h1>
      <p className="w-4/5 md:w-3/5 text-center mx-auto text-3xl mb-7">
        This registration makes you an admin which gives you priviledges to
        confirm other users of this app
      </p>
      <Form
        method="post"
        className="w-11/12 lg:w-3/5 mx-auto bg-slate-700 text-slate-950 p-5 md:p-10 rounded-lg mb-2"
      >
        <div className="flex flex-col gap-7 my-4">
          <input
            name="company"
            placeholder="Name of Organisation or Company"
            className="p-2 rounded"
            required
          />
          <input
            name="address"
            placeholder="Address to show on your profile"
            className="p-2 rounded"
          />
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="p-2 px-4 rounded-md bg-red-500 w-max text-white"
          >
            Register
          </button>
        </div>
      </Form>
    </>
  );
}
