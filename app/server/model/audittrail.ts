import { prisma } from "../db.server";
import { createTransaction } from "./transaction";

export const createTrail = async (
  accountId: number,
  amount: number,
  userId: number,
  description?: string
) => {
  const today = new Date();
  const timeAsNumber = today.getDate() + today.getMonth() + today.getFullYear();
  const lastloginAsNumber = timeAsNumber;
  const transactionId = await createTransaction(
    amount,
    accountId,
    timeAsNumber,
    userId,
    description
  );
  await prisma.auditTrail.create({
    data: {
      transaction: { connect: { id: transactionId.id } },
      activity: {
        connectOrCreate: {
          where: { userId },
          create: {
            user: { connect: { id: userId } },
            lastloginAsNumber,
            userId,
          },
        },
      },
    },
  });
};

export const getTrail = async (id: number) => {
  return await prisma.auditTrail.findUnique({
    where: { id },
    include: { transaction: true },
  });
};
