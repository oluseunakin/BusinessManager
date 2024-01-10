import { prisma } from "../db.server";

export const createCustomer = async (name: string, companyId: number) => {
  return await prisma.customer.create({
    data: { name, companies: { connect: [{ id: companyId }] } },
  });
};

export const getCustomer = async (id: number) => {
  return await prisma.customer.findUnique({ where: { id } });
};

export const getCustomers = async () => {
  return await prisma.customer.findMany();
};
