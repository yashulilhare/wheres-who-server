import jwt from "jsonwebtoken";

const generateToken = async (user, secret) => {
  return jwt.sign({ ...user }, secret, {
    expiresIn: "30d",
  });
};

export default generateToken;
