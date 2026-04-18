/*
  Warnings:

  - The values [KÄLLARE] on the enum `StorageLocation` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StorageLocation_new" AS ENUM ('KYL', 'FRYS', 'SKAFFERI');
ALTER TABLE "public"."Product" ALTER COLUMN "location" DROP DEFAULT;
ALTER TABLE "Product" ALTER COLUMN "location" TYPE "StorageLocation_new" USING ("location"::text::"StorageLocation_new");
ALTER TYPE "StorageLocation" RENAME TO "StorageLocation_old";
ALTER TYPE "StorageLocation_new" RENAME TO "StorageLocation";
DROP TYPE "public"."StorageLocation_old";
ALTER TABLE "Product" ALTER COLUMN "location" SET DEFAULT 'SKAFFERI';
COMMIT;
