import type { Product } from "@prisma/client";
import { prisma } from "../db.server";

export const createProduct = async (product: Product) => {
  return await prisma.product.create({
    data: {
      ...product,
    },
    select: {name: true}
  });
};

export const deleteProduct = async (name: string) => {
  return await prisma.product.delete({ where: { name } });
};

export const getProduct = async (name: string) => {
  return await prisma.product.findUnique({ where: { name } });
};

export const getProducts = async () => {
  return await prisma.product.findMany({select: {name: true}})
}