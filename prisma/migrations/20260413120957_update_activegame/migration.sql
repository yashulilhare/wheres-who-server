/*
  Warnings:

  - You are about to drop the column `lastTimeCheck` on the `ActiveGame` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `ActiveGame` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `characterStatus` on the `ActiveGame` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ActiveGame" DROP CONSTRAINT "ActiveGame_modeId_fkey";

-- AlterTable
ALTER TABLE "ActiveGame" DROP COLUMN "lastTimeCheck",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "characterStatus",
ADD COLUMN     "characterStatus" JSONB NOT NULL;

-- CreateIndex
CREATE INDEX "ActiveGame_userId_idx" ON "ActiveGame"("userId");

-- AddForeignKey
ALTER TABLE "ActiveGame" ADD CONSTRAINT "ActiveGame_modeId_fkey" FOREIGN KEY ("modeId") REFERENCES "Mode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
