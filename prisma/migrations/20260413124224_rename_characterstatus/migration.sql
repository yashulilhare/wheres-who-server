/*
  Warnings:

  - You are about to drop the column `characterStatus` on the `ActiveGame` table. All the data in the column will be lost.
  - Added the required column `characterData` to the `ActiveGame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActiveGame" DROP COLUMN "characterStatus",
ADD COLUMN     "characterData" JSONB NOT NULL;
