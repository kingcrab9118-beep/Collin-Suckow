/*
  Warnings:

  - You are about to drop the `SelectedSketch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SelectedSketch";

-- CreateTable
CREATE TABLE "SelectedDisplay" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "displayId" INTEGER NOT NULL,

    CONSTRAINT "SelectedDisplay_pkey" PRIMARY KEY ("id")
);
