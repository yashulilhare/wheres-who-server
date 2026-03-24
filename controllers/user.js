import db from "./../db/userQueries.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

export const getUser = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const user = await db.getUserById(userId);
    if (user === null) {
      return res.status(404).json({
        message: "user did not found!",
        result: "not-found",
      });
    }
    return res.json(user);
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return res.status(200).json({
        message: "cannot find user with  the userid.",
      });
    }
    next(err);
  }
};

export const postUser = async (req, res, next) => {
  const { username } = req.body;

  try {
    const userData = await db.createUser(username);
    return res.json({ userData });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return res.status(400).json({
        message: "username already exists",
        code: err.code,
      });
    }

    next(err);
  }
};
