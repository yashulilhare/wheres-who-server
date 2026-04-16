import { Router } from "express";
import controller from "./../controllers/playgame.js";

const playgameRouter = Router();

playgameRouter.post("/start", controller.startGame);
playgameRouter.post("/attempt", controller.handleAttempt);

export default playgameRouter;
