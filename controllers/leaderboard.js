import db from "./../db/leaderboardQueries.js";

export const getLeaderboard = async (req, res, next) => {
  const { userId } = req.body;
  try {
    // const leaderboard = await db.getAllLeaderboard();
    const [leaderboard, userRanks] = await Promise.all([
      db.getAllLeaderboard(),
      db.getUserHighestRanks(userId),
    ]);

    return res.json({ leaderboard, userRanks });
  } catch (err) {
    res.status(400).json(err);
    next(err);
  }
};

export const postLeaderboard = async (req, res, next) => {
  const { userId, duration, modeId } = req.body;
  try {
    const record = await db.createRecord(
      userId,
      Number(modeId),
      Number(duration),
    );
    return res.json(record);
  } catch (err) {
    res.status(400).json(err);
    next(err);
  }
};
