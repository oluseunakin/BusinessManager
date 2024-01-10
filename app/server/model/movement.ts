export const sellMovement = async (
  productName: string,
  quantity: number,
  userId: number,
  companyId: number,
  timeAsNumber: number,
  tx: any
) => {
  return await tx.productMovement.create({
    data: {
      product: { connect: { productName } },
      quantity,
      type: "OUTWARD",
      activity: {
        connect: { userId },
      },
      company: { connect: { id: companyId } },
      timeAsNumber,
    },
  });
};

export const buyMovement = async (
  productName: string,
  quantity: number,
  userId: number,
  companyId: number,
  timeAsNumber: number,
  tx: any
) => {
  return await tx.productMovement.create({
    data: {
      product: { connect: { productName } },
      quantity,
      type: "INWARD",
      activity: {
        connect: { userId },
      },
      company: { connect: { id: companyId } },
      timeAsNumber,
    },
  });
};
