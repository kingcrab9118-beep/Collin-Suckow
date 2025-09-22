/*
  Warnings:

  - The primary key for the `SketchesOnSchedules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `activeDisplayType` on table `ExhibitHeartbeat` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ExhibitHeartbeat" ALTER COLUMN "activeDisplayType" SET NOT NULL;

-- AlterTable
ALTER TABLE "SketchesOnSchedules" DROP CONSTRAINT "SketchesOnSchedules_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SketchesOnSchedules_pkey" PRIMARY KEY ("id");
