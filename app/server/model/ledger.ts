import type { AccountType, LedgerType } from "@prisma/client";
import { prisma } from "../db.server";

export const createLedger = async (
  name: string,
  type: AccountType,
  ledgerType: LedgerType,
  companyId: number,
  tx: any
) => {
  return await tx.ledger.create({
    data: { name, type, ledgerType, companyId },
    include: { transactions: { include: { account: true } } },
  });
};

export const getLedgerByType = async (type: AccountType) => {
  return await prisma.ledger.findUnique({
    where: { type },
  });
};

export const getLedgerByTypeIncludeTransactions = async (type: AccountType) => {
  return await prisma.ledger.findUnique({
    where: { type },
    include: { transactions: { include: { account: true } } },
  });
};

export const getLedgerByLedgerType = async (ledgerType: LedgerType) => {
  return await prisma.ledger.findUnique({
    where: { ledgerType },
    include: { transactions: { include: { account: true } } },
  });
};

export const getLedgerByTypeAndLedgerType = async (
  ledgerType: LedgerType,
  type: AccountType
) => {
  return await prisma.ledger.findMany({
    where: { ledgerType, type },
    include: { transactions: true },
  });
};

export const getLedgers = async () => {
  return await prisma.ledger.findMany();
};
