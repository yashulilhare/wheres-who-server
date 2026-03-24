import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res, next) => {
  res.send("got get to user");
});

userRouter.post("/", (req, res, next) => {
  res.send("posted to user");
});

export default userRouter;
