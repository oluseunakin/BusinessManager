import { prisma } from "../db.server";

export const createTransaction = async (
  amount: string,
  accountId: number,
  timeAsNumber: number,
  userId: number,
  tx: any,
  description?: string
) => {
  return await tx.transaction.create({
    data: {
      amount,
      account: { connect: { id: accountId } },
      description,
      trail: {
        create: {
          activity: {
            connectOrCreate: {
              where: { userId },
              create: {
                user: { connect: { id: userId } },
                lastloginAsNumber: timeAsNumber,
                userId
              },
            },
          },
        },
      },
    },
    select: { id: true },
  });
};

export const getTransaction = async (id: number) => {
  return await prisma.transaction.findUnique({
    where: { id },
    include: { account: true },
  });
};
