import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import authMiddleware from "./middlewares/auth.middleware.js";
import userRouter from "./routes/user.js";
import leaderboardRouter from "./routes/leaderboard.js";
import authRouter from "./routes/auth.js";
import playgameRouter from "./routes/playgame.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const frontEnd = process.env.FRONTEND_URL;

app.use(cors());
// app.use(
//   cors({
//     origin: frontEnd,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   }),
// );

app.use("/user", authMiddleware, userRouter);
app.use("/leaderboard", authMiddleware, leaderboardRouter);
app.use("/auth", authRouter);
app.use("/playgame", authMiddleware, playgameRouter);

export default app;
