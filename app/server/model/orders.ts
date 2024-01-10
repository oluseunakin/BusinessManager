import type { Status } from "@prisma/client"

export const createOrder = async (
  tx: any,
  supplierId: number,
  supplierName: string,
  status: Status,
  companyId: number,
  dateAsNumber: number,
  productName: string,
  sum: string,
  deliveryDate: FormDataEntryValue | null,
  phone?: string,
  address?: string
) => {
  if (deliveryDate) {
    const dd = new Date(deliveryDate as string);
    dateAsNumber = dd.getDate() + dd.getMonth() + dd.getFullYear();
    
  }
  return await tx.purchaseOrder.create({
    data: {
      supplier: {
        connectOrCreate: {
          where: { id: supplierId },
          create: {
            name: supplierName,
            phone,
            address,
            companies: { connect: [{ id: companyId }] },
          },
        },
      },
      dateAsNumber,
      status,
      product: { connect: { productName } },
      company: { connect: { id: companyId } },
      deliveryDate: deliveryDate as string,
      amount: sum
    },
  });
};
