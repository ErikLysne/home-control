/*
  Warnings:

  - You are about to drop the column `modelId` on the `Home` table. All the data in the column will be lost.
  - You are about to drop the column `modelId` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the `Model3D` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Home" DROP COLUMN "modelId";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "modelId";

-- DropTable
DROP TABLE "Model3D";

-- CreateTable
CREATE TABLE "HomeModel" (
    "id" SERIAL NOT NULL,
    "file" TEXT NOT NULL,
    "homeId" INTEGER,

    CONSTRAINT "HomeModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomModel" (
    "id" SERIAL NOT NULL,
    "file" TEXT NOT NULL,
    "roomId" INTEGER,

    CONSTRAINT "RoomModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HomeModel_homeId_key" ON "HomeModel"("homeId");

-- CreateIndex
CREATE UNIQUE INDEX "RoomModel_roomId_key" ON "RoomModel"("roomId");

-- AddForeignKey
ALTER TABLE "HomeModel" ADD CONSTRAINT "HomeModel_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "Home"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomModel" ADD CONSTRAINT "RoomModel_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
