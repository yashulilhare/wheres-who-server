import { Router } from "express";

import { getLeaderboard } from "../controllers/leaderboard.js";

const leaderboardRouter = Router();

leaderboardRouter.get("/", getLeaderboard);

export default leaderboardRouter;
