import { prisma } from "../lib/prisma.js";

const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      records: true,
    },
  });
  return user;
};

const getUserByUsername = async (username) => {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  return user;
};

const createUser = async (username, password) => {
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });

  return user;
};

export default { getUserById, createUser, getUserByUsername };
