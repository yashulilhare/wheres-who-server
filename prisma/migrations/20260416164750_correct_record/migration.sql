-- DropIndex
DROP INDEX "Record_modeId_duration_createdAt_idx";

-- CreateIndex
CREATE INDEX "Record_modeId_idx" ON "Record"("modeId");
