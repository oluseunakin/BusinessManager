import { prisma } from "../db.server";

export const getSupplier = async (id: number) => {
  return await prisma.supplier.findUnique({ where: { id } });
};

export const getSuppliers = async () => {
  return await prisma.supplier.findMany();
};

export const createSupplier = async (
  name: string,
  companyId: number,
  phone?: string,
  address?: string
) => {
  return await prisma.supplier.create({
    data: {
      name,
      phone,
      address,
      companies: {connect: [{id: companyId}]}
    },
    select: {id: true}
  });
};

export const getSuppliedOrders = async (id: number) => {
  return await prisma.supplier.findUnique({where: {id}, select: {orders: true}})
}

export const getSupplierByName = async (name: string) => {
  return await prisma.supplier.findUnique({where: {name}})
}