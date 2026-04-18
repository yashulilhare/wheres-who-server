import { prisma } from "./../lib/prisma.js";

const getAllLeaderboard = async () => {
  const leaderboard = await prisma.mode.findMany({
    select: {
      id: true,
      name: true,
      records: {
        select: {
          id: true,
          duration: true,
          innocentKills: true,
          user: {
            select: {
              username: true,
            },
          },
        },
        orderBy: [
          {
            duration: "asc",
          },
          {
            innocentKills: "asc",
          },
        ],
        take: 7,
      },
    },
  });

  return leaderboard;
};

const getUserHighestRanks = async (userId) => {
  const result = await prisma.$queryRaw`
  SELECT "modeId", "duration", "innocentKills", rank as "bestRank"
  FROM (
    SELECT 
      "userId",
      "modeId",
      "duration",
      "innocentKills",
      RANK() OVER (
        PARTITION BY "modeId"
        ORDER BY duration ASC, "innocentKills" ASC
      ) as rank,
      ROW_NUMBER() OVER (
        PARTITION BY "modeId", "userId"
        ORDER BY duration ASC, "innocentKills" ASC
      ) as rn
    FROM "Record"
  ) ranked
  WHERE "userId" = ${userId}
    AND rn = 1
  ORDER BY "modeId";
`;
  return result;
};

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
