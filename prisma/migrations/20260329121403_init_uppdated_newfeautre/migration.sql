-- CreateEnum
CREATE TYPE "AmountStatus" AS ENUM ('EMPTY', 'LOW', 'MEDIUM', 'HIGH');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_userId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "amountStatus" "AmountStatus" NOT NULL DEFAULT 'HIGH';

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
