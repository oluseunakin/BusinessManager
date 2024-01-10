-- AlterTable
CREATE SEQUENCE stock_id_seq;
ALTER TABLE "Stock" ALTER COLUMN "id" SET DEFAULT nextval('stock_id_seq');
ALTER SEQUENCE stock_id_seq OWNED BY "Stock"."id";
