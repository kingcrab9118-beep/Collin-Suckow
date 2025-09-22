/*
  Warnings:

  - You are about to drop the column `activeSketch` on the `ExhibitHeartbeat` table. All the data in the column will be lost.
  - Added the required column `activeDisplayType` to the `ExhibitHeartbeat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExhibitHeartbeat" DROP COLUMN "activeSketch",
ADD COLUMN     "activeDisplayId" INTEGER NOT NULL DEFAULT -1,
ADD COLUMN     "activeDisplayType" TEXT DEFAULT '';
