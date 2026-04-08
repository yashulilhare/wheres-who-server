import express from "express";
import cors from "cors";

import authMiddleware from "./middlewares/auth.middleware.js";
import userRouter from "./routes/user.js";
import leaderboardRouter from "./routes/leaderboard.js";
import authRouter from "./routes/auth.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/user", authMiddleware, userRouter);
app.use("/leaderboard", authMiddleware, leaderboardRouter);
app.use("/auth", authRouter);

export default app;
