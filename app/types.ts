import type { Company, Prisma } from "@prisma/client";
import type { getUserWithCompanies } from "./server/model/user";
import type {
  getCompany,
  getCompanyInventory,
  getCompanyInvoices,
  getCompanyMovements,
  getCompanyStaff,
  getCompanyWithOwner,
  getCompanyWithSuppliers,
} from "./server/model/company";
import type { getTransaction } from "./server/model/transaction";
import type { getAuditTrailsActivity } from "./server/model/activity";
import type { getTodayStockWithProducts } from "./server/model/stock";

export type UserWithoutPassword = Prisma.PromiseReturnType<
  typeof getUserWithCompanies
>;

export type Product = Prisma.ProductGetPayload<Prisma.ProductArgs>;

export type Supplier = Omit<
  Prisma.SupplierGetPayload<Prisma.SupplierArgs>,
  "id"
>;

export type FullCompany = Prisma.CompanyInclude & Company;

export type ProductOnShelf =
  Prisma.ProductOnShelfGetPayload<Prisma.ProductOnShelfArgs>;

export type DashboardCompany = Prisma.PromiseReturnType<typeof getCompany>;

export type CompanyOwner = Prisma.PromiseReturnType<typeof getCompanyWithOwner>;

export type CompanySuppliers = Prisma.PromiseReturnType<
  typeof getCompanyWithSuppliers
>;

export type CompanyInvoices = Prisma.PromiseReturnType<typeof getCompanyInvoices>

export type CompanyStaff = Prisma.PromiseReturnType<typeof getCompanyStaff>;

export type CompanyProducts = Prisma.PromiseReturnType<typeof getCompanyInventory>

export type CompanyMovements = Prisma.PromiseReturnType<typeof getCompanyMovements>

export type CompanyTodayStock = Prisma.PromiseReturnType<typeof getTodayStockWithProducts>

export type ProductMovement =
  Prisma.ProductMovementGetPayload<Prisma.ProductMovementArgs>;

export type Transaction = Prisma.PromiseReturnType<typeof getTransaction>;

export type AuditTrails = Prisma.PromiseReturnType<
  typeof getAuditTrailsActivity
>;

export type TodayStock = Prisma.PromiseReturnType<
  typeof getTodayStockWithProducts
>;

export type Context = {
  user: UserWithoutPassword;
  setShowCreate: React.Dispatch<React.SetStateAction<boolean>>;
  companyProducts: {
    products:
      | {
        productName: string;
        inQuantity: number;
        currentQuantity: number;
        sellingPrice: string;
        stockId: number;
        companyId: number;
    }[]
      | undefined;
    setProducts: React.Dispatch<
      React.SetStateAction<
        | {
          productName: string;
          inQuantity: number;
          currentQuantity: number;
          sellingPrice: string;
          stockId: number;
          companyId: number;
          }[]
        | undefined
      >
    >;
    productsRef: React.MutableRefObject<
      | {
        productName: string;
        inQuantity: number;
        currentQuantity: number;
        sellingPrice: string;
        stockId: number;
        companyId: number;
        }[]
      | undefined
    >;
  };
};
