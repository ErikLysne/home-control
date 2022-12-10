/*
  Warnings:

  - You are about to drop the column `data` on the `Model3D` table. All the data in the column will be lost.
  - Added the required column `file` to the `Model3D` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Model3D" DROP COLUMN "data",
ADD COLUMN     "file" TEXT NOT NULL;
