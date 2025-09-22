-- CreateTable
CREATE TABLE "Sketch" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "directory" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Sketch_pkey" PRIMARY KEY ("id")
);
