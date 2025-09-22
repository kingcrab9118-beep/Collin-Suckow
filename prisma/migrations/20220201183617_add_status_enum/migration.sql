/*
  Warnings:

  - You are about to drop the column `approved` on the `Sketch` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Sketch" DROP COLUMN "approved",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT E'PENDING';
