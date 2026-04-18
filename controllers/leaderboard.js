import db from "./../db/leaderboardQueries.js";

export const getLeaderboard = async (req, res, next) => {
  console.log("got");
  const user = req.user;
  try {
    // const leaderboard = await db.getAllLeaderboard();
    const [leaderboard, userRanks] = await Promise.all([
      db.getAllLeaderboard(),
      db.getUserHighestRanks(user.id),
    ]);

    const formatted = await leaderboard.map((mode) => {
      const userRank = userRanks.find((rank) => mode.id === rank.modeId);
      return {
        ...mode,
        userRank: userRank
          ? {
              ...userRank,
              bestRank: Number(userRank.bestRank),
              username: user.username,
            }
          : null,
      };
    });

    return res.json(formatted);
  } catch (err) {
    res.status(400).json(err);
    next(err);
  }
};
