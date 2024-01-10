export const generateInvoice = async (
  id: number,
  companyId: number,
  bought: { productName: string }[],
  dateAsNumber: number,
  tx: any
) => {
  return await tx.invoice.create({
    data: {
      dateAsNumber,
      bought,
      company: { connect: { id: companyId } },
      customer: {connect: {id}}
    }
  });
};
