import express from "express";

import userRouter from "./routes/user.js";
import leaderboardRouter from "./routes/leaderboard.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRouter);
app.use("/leaderboard", leaderboardRouter);

export default app;
