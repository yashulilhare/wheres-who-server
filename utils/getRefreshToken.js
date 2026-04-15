import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

const getRefreshToken = async (payload) => {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: "30d" });
  return token;
};

export default getRefreshToken;
