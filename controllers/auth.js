import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbUser from "./../db/userQueries.js";
import { validationResult, matchedData, body } from "express-validator";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

const SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({
      messageArray: errors.array(),
    });
  }

  const { username, password } = matchedData(req);

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await dbUser.createUser(username, hash);

    jwt.sign(
      { id: user.id, username: user.username },
      SECRET,
      { expiresIn: "30d" },
      (err, token) => {
        if (err) {
          console.log(err);
          return res.status(401).json({
            message: "Something went wrong.",
            error: err,
          });
        }
        res.json({
          message: "User created successfully.",
          token: token,
          user: {
            id: user.id,
            username: user.username,
          },
        });
      },
    );
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError || err?.code === "P2002") {
      return res.status(401).json({
        message: "username already exists.",
      });
    }
    res.status(500).json(err);
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    return res.status(403).json({
      message: "No username or password found;",
    });
  }

  try {
    const user = await dbUser.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({
        message: "username doesn't exists.",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        message: "Incorrect password.",
      });
    }
    jwt.sign(
      { id: user.id, username: user.username },
      SECRET,
      {
        expiresIn: "30d",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          return res.status(403).json({
            message: "Token generation failure.",
          });
        }
        return res.json({
          token,
          user: {
            id: user.id,
            username: user.username,
          },
        });
      },
    );
  } catch (err) {
    next(err);
  }
};

export default { registerUser, loginUser };
