import { prisma } from "./../lib/prisma.js";

const createGame = async ({ userId, modeId, characters }) => {
  const createdGame = await prisma.activeGame.create({
    data: {
      userId: userId,
      modeId: modeId,
      characterData: characters,
      innocentKills: 0,
      lastTimerScore: 0,
      charactersFound: 0,
    },
  });
  return createdGame;
};

const getCharacters = async (modeName) => {
  const characters = await prisma.mode.findFirst({
    where: {
      name: modeName,
    },
    include: {
      characters: {
        select: {
          id: true,
          name: true,
          modeId: true,
          imageCode: true,
          xposition: true,
          yposition: true,
        },
      },
    },
  });

  return characters;
};

const getActiveGames = async (userId) => {
  const games = await prisma.activeGame.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });
  return games;
};

const deleteGame = async (gameId) => {
  const deleted = await prisma.activeGame.delete({
    where: {
      id: gameId,
    },
  });

  return deleted;
};

export default { createGame, getActiveGames, getCharacters, deleteGame };
