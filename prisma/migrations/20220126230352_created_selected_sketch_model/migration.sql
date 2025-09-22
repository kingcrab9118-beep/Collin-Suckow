-- CreateTable
CREATE TABLE "SelectedSketch" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sketchId" INTEGER NOT NULL,

    CONSTRAINT "SelectedSketch_pkey" PRIMARY KEY ("id")
);
