/*
  Warnings:

  - Added the required column `xLength` to the `Mode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yLength` to the `Mode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mode" ADD COLUMN     "xLength" INTEGER NOT NULL,
ADD COLUMN     "yLength" INTEGER NOT NULL;
