import { prisma } from "../db.server";

export const getCompany = async (id: number) => {
  return await prisma.company.findUnique({
    where: { id },
    include: {
      _count: { select: { products: true, suppliers: true, customers: true } },
      movements: {
        select: { quantity: true, type: true },
      },
    },
  });
};

export const getCompanyLedger = async (id: number) => {
  return await prisma.company.findUnique({where: {id}, select: {ledgers: {include: {transactions: true}}}})
}

export const getCompanyWithOwner = async (id: number) => {
  return await prisma.company.findUnique({
    where: { id },
    include: { owner: true },
  });
};

export const createCompany = async (
  name: string,
  id: number,
  userId: number,
  address?: string
) => {
  return await prisma.company.create({
    data: {
      name,
      address,
      id,
      owner: {
        connectOrCreate: {
          where: { userId },
          create: { user: { connect: { id: userId } } },
        },
      },
      staff: { connect: [{ id: userId }] },
    },
    select: { id: true },
  });
};

export const getCompanies = async () => {
  return await prisma.company.findMany({ select: { name: true, id: true } });
};

export const getCompanyWithSuppliers = async (id: number) => {
  return await prisma.company.findUnique({
    where: { id },
    select: { suppliers: true },
  });
};

export const getInventory = async (id: number) => {
  return await prisma.company.findUniqueOrThrow({
    where: { id },
    select: { products: { select: { productName: true } } },
  });
};

export const getCompanyInventory = async (id: number) => {
  return await prisma.company.findUniqueOrThrow({
    where: { id },
    select: { products: true },
  });
};

export const getCompanyMovements = async (id: number) => {
  return await prisma.company.findUniqueOrThrow({
    where: { id },
    select: { movements: true },
  });
};

export const getCompanyWithStocks = async (id: number) => {
  return await prisma.company.findUnique({
    where: { id },
    select: { stocks: { take: 10 } },
  });
};

export const getCompanyTodayStock = async (companyId: number) => {
  const today = new Date();
  const dateAsNumber = today.getDate() + today.getMonth() + today.getFullYear();
  return await prisma.stock.findUniqueOrThrow({
    where: { dateAsNumber_companyId: { dateAsNumber, companyId } },
  });
};

export const getCompanyOrders = async (companyId: number) => {
  return await prisma.company.findUnique({
    where: { id: companyId },
    select: {
      orders: {
        select: {
          supplier: { select: { name: true } },
          product: { select: { productName: true, inQuantity: true } },
          amount: true,
          date: true,
          dateAsNumber: true,
        },
      },
    },
  });
};

export const getCompanyInvoices = async (companyId: number) => {
  return await prisma.company.findUnique({
    where: { id: companyId },
    select: {
      invoices: {
        include: { customer: true },
      },
    },
  });
};

export const getCompanyCustomers = async (companyId: number) => {
  return await prisma.company.findUnique({
    where: { id: companyId },
    select: { customers: true },
  });
};

export const getCompanyStaff = async (companyId: number) => {
  return await prisma.company.findUnique({
    where: { id: companyId },
    select: { staff: { select: { username: true, activityId: true } } },
  });
};
