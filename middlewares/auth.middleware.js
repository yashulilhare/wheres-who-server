import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(403).json({ message: "Authorization header missing" });
    }

    const [schema, token] = authHeader.split(" ");

    if (schema !== "Bearer" || !token) {
      return res.status(403).json({ message: "Invalid Authorization format" });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET); // sync

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};


export default authMiddleware;
