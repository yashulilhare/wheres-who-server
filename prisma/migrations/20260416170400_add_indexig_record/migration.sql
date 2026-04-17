-- DropIndex
DROP INDEX "Record_modeId_idx";

-- CreateIndex
CREATE INDEX "Record_modeId_duration_innocentKills_idx" ON "Record"("modeId", "duration", "innocentKills");
