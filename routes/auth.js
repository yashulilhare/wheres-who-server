import { Router } from "express";
import { validateUser } from "../middlewares/validate-user.js";
import controller from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/register", validateUser, controller.registerUser);
authRouter.post("/login", controller.loginUser);

export default authRouter;
