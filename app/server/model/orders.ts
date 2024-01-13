import type { Status } from "@prisma/client"

export const createOrder = async (
  tx: any,
  supplierId: number,
  status: Status,
  companyId: number,
  dateAsNumber: number,
  productName: string,
  sum: string,
  deliveryDate: FormDataEntryValue | null,
) => {
  if (deliveryDate) {
    const dd = new Date(deliveryDate as string);
    dateAsNumber = dd.getDate() + dd.getMonth() + dd.getFullYear();
    
  }
  return await tx.purchaseOrder.create({
    data: {
      dateAsNumber,
      status,
      product: { connect: { productName } },
      company: { connect: { id: companyId } },
      deliveryDate: deliveryDate as string,
      amount: sum,
      supplier: {
        connect: {id: supplierId}
      }
    },
  });
};
