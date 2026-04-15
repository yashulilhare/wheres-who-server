import { Router } from "express";
import controller from "./../controllers/playgame.js";

const playgameRouter = Router();

playgameRouter.post("/start", controller.startGame);

export default playgameRouter;
