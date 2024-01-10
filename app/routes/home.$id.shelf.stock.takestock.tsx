import { json, redirect, type LoaderArgs } from "@remix-run/node";
import { getInventory } from "~/server/model/company";
import { createTodayStock } from "~/server/model/stock";

export const loader = async ({ params }: LoaderArgs) => {
  const companyId = Number(params.id);
  try {
    const companyWithInventory = await getInventory(companyId);
    await createTodayStock(companyId, companyWithInventory.products)
    return redirect(`/home/${companyId}/shelf/stock`)
  } catch (e) {
    console.log(e)
    throw json("Error getting inventory", 401);
  }
};
