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

const createUser = async (username) => {
  const user = await prisma.user.create({
    data: {
      username: username,
    },
  });

  return user;
};

export default { getUserById, createUser };
