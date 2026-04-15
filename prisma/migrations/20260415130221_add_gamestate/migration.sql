/*
  Warnings:

  - Added the required column `innocentKills` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GameState" AS ENUM ('CONTINUE', 'COMPLETED');

-- AlterTable
ALTER TABLE "ActiveGame" ADD COLUMN     "gameState" "GameState" NOT NULL DEFAULT 'CONTINUE';

-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "innocentKills" INTEGER NOT NULL;
