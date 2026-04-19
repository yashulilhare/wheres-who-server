import db from "./../db/activeGamequeries.js";
import dbLeaderboard from "./../db/leaderboardQueries.js";
import getRandomChar from "../utils/getRandomChar.js";
import getRefreshToken from "../utils/getRefreshToken.js";

const startGame = async (req, res, next) => {
  const user = req.user;
  if (!req.body || !req.body.modeName) {
    return res.status(400).json({
      message: "Mode not selected.",
    });
  }
  const { modeName } = req.body;
  try {
    const deleted = await db.deleteGame(user.id);
    const modeData = await db.getCharacters(modeName);

    if (!modeData) {
      return res.status(400).json({
        message: "Invalid mode selected. Please check your selection.",
      });
    }

    // get  random 3 characters
    const randomThree = getRandomChar(modeData.characters).map((char) => {
      return {
        id: char.id,
        name: char.name,
        imageCode: char.imageCode,
        modeId: char.modeId,
        found: false,
        foundDuration: 0,
        position: {
          x: char.xposition,
          y: char.yposition,
        },
      };
    });

    const createdGame = await db.createGame({
      userId: user.id,
      modeId: modeData.id,
      characters: randomThree,
    });

    if (createdGame) {
      const refreshJWT = await getRefreshToken({
        id: user.id,
        username: user.username,
      });
      res.json({
        user,
        token: refreshJWT,
        gameData: {
          ...createdGame,
          modeName: modeData.name,
          characterData: createdGame.characterData.map((char) => ({
            id: char.id,
            name: char.name,
            imageCode: char.imageCode,
            modeId: char.modeId,
            found: false,
          })),
        },
        message: "Game started. Find all the criminals.",
      });
    } else {
      res.status(403).json({
        message: "Couldn't start game",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
    next(err);
  }
};

const isMatch = (stored, clicked) => {
  // use pythagoras theorem to detect click in circular area
  const distance = Math.hypot(stored.x - clicked.x, stored.y - clicked.y);
  return distance <= 5;
};

const handleAttempt = async (req, res, next) => {
  const user = req.user;

  if (!req.body) {
    return res.status(400).json({
      message: "No data received.",
    });
  }

  const { gameId, charId, modeId, charName, timerScore, x, y } = req?.body;
  try {
    const gameData = await db.getGameById(gameId);

    if (gameData.userId !== user.id) {
      return res.status(403).json({
        message: "User credentials doesn't match with the game's player.",
      });
    }
    const character = gameData.characterData.find((char) => char.id === charId);

    if (!character || character.modeId !== modeId) {
      return res.status(400).json({
        message: "Character not found with selected value.",
      });
    }

    const match = isMatch(
      { x: character.position.x, y: character.position.y },
      { x, y },
    );

    if (!match) {
      console.log(`increaseInnocentKill`);
      const updatedData = await db.increaseInnocentKill(
        gameId,
        gameData.innocentKills + 1,
        timerScore,
      );
      return res.json({
        ...updatedData,
        attemptResult: "FAILED",
        message: `Oh,no, that's not ${charName} !`,
      });
    }

    if (match) {
      const updatedCharacters = await gameData.characterData.map((char) => {
        if (char.id === character.id)
          return { ...char, found: true, foundDuration: timerScore };
        else return char;
      });

      const updateGame = await db.updateCharFound({
        gameId,
        characters: updatedCharacters,
        totalFound: gameData.charactersFound + 1,
        timerScore,
      });

      // calculate total found character, max = 3
      const foundCount = updateGame.characterData.reduce((prev, char) => {
        if (char.found) return prev + 1;
        else return prev;
      }, 0);

      const removePos = updateGame.characterData.map((char) => {
        return {
          id: char.id,
          name: char.name,
          imageCode: char.imageCode,
          modeId: char.modeId,
          found: char.found,
        };
      });

      if (foundCount < 3) {
        return res.json({
          id: updateGame.id,
          gameState: updateGame.gameState,
          modeId: updateGame.modeId,
          lastTimerScore: updateGame.lastTimerScore,
          attemptResult: "SUCCESS",
          message: `Woow, you caught ${charName}`,
          characters: removePos,
        });
      }

      if (foundCount >= 3) {
        const topFive = await dbLeaderboard.getTopFive(updateGame.modeId);
        res.json({
          id: updateGame.id,
          username: user.username,
          gameState: "COMPLETED",
          modeId: updateGame.modeId,
          lastTimerScore: updateGame.lastTimerScore,
          attemptResult: "SUCCESS",
          message: `Great job. You found ${charName}. You found them all.`,
          characters: removePos,
          topFive: topFive,
        });
        if (updateGame.id) {
          await db.deleteGame(updateGame.id).then(() => {
            console.log(`Removed game with id: ${updateGame.id}`);
          });
        }

        // store record in Record
        await dbLeaderboard
          .createRecord(
            gameData.userId,
            modeId,
            updateGame.lastTimerScore,
            gameData.innocentKills,
          )
          .then(() => {
            console.log(`Record added for  game with id: ${updateGame.id}`);
          });
      }
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export default { startGame, handleAttempt };
