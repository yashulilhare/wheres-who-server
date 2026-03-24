import { Router } from "express";

import { getUser, postUser } from "./../controllers/user.js";

const userRouter = Router();

userRouter.get("/", getUser);

userRouter.post("/", postUser);

export default userRouter;
