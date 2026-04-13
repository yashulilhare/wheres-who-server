import { Router } from "express";

const playgameRouter = Router();

playgameRouter.post("/start", (req, res, next) => {
  res.send("okay got start");
});

export default playgameRouter