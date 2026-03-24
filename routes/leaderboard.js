import { Router } from "express";

import { getLeaderboard, postLeaderboard } from "../controllers/leaderboard.js";

const leaderboardRouter = Router();

leaderboardRouter.get("/", getLeaderboard);

leaderboardRouter.post("/", postLeaderboard);

export default leaderboardRouter;
