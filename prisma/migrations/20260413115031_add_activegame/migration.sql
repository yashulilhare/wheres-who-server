-- CreateTable
CREATE TABLE "ActiveGame" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "modeId" INTEGER NOT NULL,
    "characterStatus" TEXT NOT NULL,
    "innocentKills" INTEGER NOT NULL,
    "lastTimerScore" INTEGER NOT NULL,
    "charactersFound" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastTimeCheck" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActiveGame_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActiveGame" ADD CONSTRAINT "ActiveGame_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveGame" ADD CONSTRAINT "ActiveGame_modeId_fkey" FOREIGN KEY ("modeId") REFERENCES "Mode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
