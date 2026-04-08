import { Router } from "express";

import { getUser } from "./../controllers/user.js";

const userRouter = Router();

userRouter.get("/", getUser);

export default userRouter;
