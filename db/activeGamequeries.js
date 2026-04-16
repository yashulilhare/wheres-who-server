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

const getGameById = async (gameId) => {
  const gameData = await prisma.activeGame.findFirst({
    where: {
      id: gameId,
    },
  });
  return gameData;
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

const increaseInnocentKill = async (gameId, increasedKills, timerScore) => {
  const updated = await prisma.activeGame.update({
    where: {
      id: gameId,
    },
    data: {
      innocentKills: increasedKills,
      lastTimerScore: timerScore,
    },
    select: {
      id: true,
      modeId: true,
      innocentKills: true,
      lastTimerScore: true,
    },
  });
  return updated;
};

const updateCharFound = async ({
  gameId,
  characters,
  totalFound,
  timerScore,
}) => {
  const updated = await prisma.activeGame.update({
    where: { id: gameId },
    data: {
      characterData: characters,
      charactersFound: totalFound,
      lastTimerScore: timerScore,
    },
    select: {
      id: true,
      modeId: true,
      characterData: true,
      lastTimerScore: true,
    },
  });
  return updated;
};

export default {
  createGame,
  getGameById,
  getActiveGames,
  getCharacters,
  deleteGame,
  increaseInnocentKill,
  updateCharFound,
};
