import { prisma } from "./../lib/prisma.js";

const getAllLeaderboard = async () => {
  const leaderboard = await prisma.mode.findMany({
    include: {
      records: {
        orderBy: {
          duration: "asc",
        },
        include: {
          user: true,
        },
      },
    },
  });

  return leaderboard;
};

const getUserHighestRanks = async (userId) => {
  const userRanks = await prisma.$queryRaw`
SELECT "modeId", "duration", "createdAt", "rank"
FROM (
  SELECT 
    "userId", 
    "modeId", 
    "duration",
    "createdAt",
    ROW_NUMBER() OVER (
      PARTITION BY "modeId" 
      ORDER BY "duration" ASC, "createdAt" ASC
    ) as "rank"
  FROM "Record"
) AS ranked_records
WHERE "userId" = ${userId};
`;

  return userRanks;
};
// const getLeaderBoardForMode = async () => {};

const createRecord = async (userId, modeId, duration, innocentKills) => {
  const data = await prisma.record.create({
    data: {
      userId,
      modeId,
      duration,
      innocentKills,
    },
  });

  return data;
};

const getTopFive = async (modeId) => {
  const data = await prisma.record.findMany({
    where: {
      modeId: modeId,
    },
    orderBy: [{ duration: "asc" }, { innocentKills: "asc" }],
    take: 5,
    select: {
      id: true,
      innocentKills: true,
      duration: true,
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return data;
};

export default {
  getAllLeaderboard,
  getUserHighestRanks,
  createRecord,
  getTopFive,
};
