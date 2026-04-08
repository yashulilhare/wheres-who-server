import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({
      message: "Authorization header missing;",
    });
  }

  const [schema, token] = authHeader.split(" ");

  if (schema !== "Bearer" || !token) {
    return res.status(403).json({
      message: "Invalid Authorization header format.",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({
        message: "Invalid or expired token.",
      });
    }
    req.user = user;
    next();
  });
};

export default authMiddleware;
