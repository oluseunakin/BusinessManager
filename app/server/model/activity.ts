import { prisma } from "../db.server";

export const getActivity = async (userId: number) => {
  return await prisma.userActivity.findUnique({
    where: { userId },
    include: { user: { select: { username: true } }},
  });
};

export const getActivities = async () => {
  return await prisma.userActivity.findMany();
};

export const getProductMovementActivity = async (id: number) => {
  return await prisma.userActivity.findUnique({
    where: { userId: id },
    select: { productMovements: true },
  });
};

export const getAuditTrailsActivity = async (id: number) => {
  return await prisma.userActivity.findUnique({
    where: { userId: id },
    include: {
      trails: { include: { transaction: { include: { account: true } } } },
    },
  });
};

export const updateLastLogin = async (userId: number, lastloginAsNumber: number, lastlogin: Date) => {
  return await prisma.userActivity.update({where: {userId}, data: {lastlogin, lastloginAsNumber}})
}
