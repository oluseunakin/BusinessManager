import type { Role } from "@prisma/client";
import { prisma } from "../db.server";
import { createId } from "~/helper";

export const getUser = async (id: number) => {
  return await prisma.user.findUniqueOrThrow({
    where: { id },
  });
};

export const getUserWithCompanies = async (id: number) => {
  return await prisma.user.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      username: true,
      role: true,
      activity: true,
    },
  });
};

export const getUserActivities = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    select: { activity: true },
  });
};

export const createUser = async (
  username: string,
  password: string,
  role: Role,
  lastloginAsNumber: number,
  companyId: number
) => {
  const id = createId([username, password]);
  if (!isNaN(companyId)) {
    return await prisma.user.create({
      data: {
        username,
        password,
        role,
        id,
        company: { connect: { id: companyId } },
        activity: { create: { userId: id, lastloginAsNumber } },
      },
      select: { id: true, username: true, role: true },
    });
  }
  return await prisma.user.create({
    data: {
      username,
      password,
      role,
      id,
      activity: { create: { userId: id, lastloginAsNumber } },
    },
    select: { id: true, username: true, role: true, activity: true },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};
