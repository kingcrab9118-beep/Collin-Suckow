/*
  Warnings:

  - You are about to drop the column `directory` on the `Sketch` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Sketch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sketch" DROP COLUMN "directory",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Sketch" ADD CONSTRAINT "Sketch_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
