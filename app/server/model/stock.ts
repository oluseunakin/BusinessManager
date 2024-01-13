import { prisma } from "../db.server";
import { getInventory } from "./company";

export const createTodayStock = async (
  companyId: number,
  inventory: {
    productName: string;
  }[]
) => {
  const today = new Date();
  const dateAsNumber = today.getDate() + today.getMonth() + today.getFullYear();
  return await prisma.stock.create({
    data: {
      dateAsNumber,
      date: today,
      company: { connect: { id: companyId } },
      products: { connect: inventory },
    },
    include: {
      products: {
        select: {
          productName: true,
          inQuantity: true,
          currentQuantity: true,
          sellingPrice: true,
          stockId: true,
          companyId: true,
        },
      },
    },
  });
};

export const getTodayStockWithProducts = async (companyId: number) => {
  const today = new Date();
  const dateAsNumber = today.getDate() + today.getMonth() + today.getFullYear();
  try {
    return await prisma.stock.findUniqueOrThrow({
      where: { dateAsNumber_companyId: { dateAsNumber, companyId } },
      include: {
        products: {
          select: {
            productName: true,
            inQuantity: true,
            currentQuantity: true,
            sellingPrice: true,
            stockId: true,
            companyId: true,
          },
        },
      },
    });
  } catch (e) {
    return await createTodayStock(companyId, (await getInventory(companyId)).products);
  }
};

export const getStock = async (id: number) => {
  return await prisma.stock.findUniqueOrThrow({
    where: { id },
    include: { products: true },
  });
};

export const getStocks = async () => {
  return await prisma.stock.findMany();
};

export const removeStocks = async () => {
  await prisma.stock.deleteMany();
};
