import { prisma } from "../db.server";

export const lowStockAlert = async (productName: string) => {
  const product = await prisma.productOnShelf.findUnique({
    where: { productName },
    select: { currentQuantity: true, inQuantity: true },
  });
  if (product!.inQuantity - product!.currentQuantity <= 10) {
    //send alert
  }
};

export const addToShelf = async (
  sellingPrice: string,
  inQuantity: number,
  stockId: number,
  companyId: number,
  name: string,
  costPrice: string,
  tx: any,
  description?: string,
  
) => {
  return await prisma.productOnShelf.create({
    data: {
      product: {
        create: { costPrice, name, description },
      },
      inQuantity,
      currentQuantity: inQuantity,
      stock: { connect: { id: stockId } },
      sellingPrice,
      company: {
        connect: { id: companyId },
      },
    },
    select: { productName: true },
  });
};

export const updateProductOnShelf = async (
  productName: string,
  toUpdate: string,
  newValue: string | number,
  tx: any
) => {
  if (toUpdate === "quantity")
    return await tx.productOnShelf.update({
      where: { productName },
      data: { currentQuantity: Number(newValue) },
      select: { productName: true },
    });
  else
    return await tx.productOnShelf.update({
      where: { productName },
      data: { sellingPrice: newValue.toString() },
      select: { productName: true },
    });
};

export const deleteProductsOnShelf = async () => {
  await prisma.productOnShelf.deleteMany();
};

export const sellProduct = async (
  productName: string,
  currentQuantity: number,
  tx: any
) => {
  return await tx.productOnShelf.update({
    where: { productName },
    data: { currentQuantity },
  });
};
