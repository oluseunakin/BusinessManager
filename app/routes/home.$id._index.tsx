import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Dashboard } from "~/components/Dashboard";
import { balanceSheet } from "~/server/analysis";
import { getCompany } from "~/server/model/company";

export const loader = async ({ params }: LoaderArgs) => {
  const id = Number(params.id);
  const company = await getCompany(id);
  const analysis = await balanceSheet(id)
  return json({company, analysis})
};

export default function () {
  const {company, analysis} = useLoaderData<typeof loader>();
  return (
    <div className="w-11/12 md:w-4/5 mx-auto">
      <Dashboard company={company!} analysis={analysis}/>
    </div>
  );
}
