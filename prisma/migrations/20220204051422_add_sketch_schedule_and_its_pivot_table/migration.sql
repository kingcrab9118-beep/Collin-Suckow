-- CreateTable
CREATE TABLE "SketchSchedule" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "periodSeconds" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SketchSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SketchesOnSchedules" (
    "scheduleId" INTEGER NOT NULL,
    "sketchId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "SketchesOnSchedules_pkey" PRIMARY KEY ("scheduleId","sketchId")
);

-- AddForeignKey
ALTER TABLE "SketchesOnSchedules" ADD CONSTRAINT "SketchesOnSchedules_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "SketchSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SketchesOnSchedules" ADD CONSTRAINT "SketchesOnSchedules_sketchId_fkey" FOREIGN KEY ("sketchId") REFERENCES "Sketch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
