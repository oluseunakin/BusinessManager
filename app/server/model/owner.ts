import { prisma } from "../db.server";

export const createOwner = async (userId: number) => {
  return await prisma.owner.create({
    data: { user: { connect: { id: userId } } },
  });
};

export const getOwnerWithCompanies = async (userId: number) => {
  return await prisma.owner.findUnique({
    where: { userId },
    include: { company: { select: { id: true, name: true } } },
  });
};
