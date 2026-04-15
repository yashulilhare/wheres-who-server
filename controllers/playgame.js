import db from "./../db/activeGamequeries.js";
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
    const prevGames = await db.getActiveGames(user.id);
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

    if (prevGames.length > 0) {
      // todo: do bulk delete than loop queries
      prevGames.map((game) => {
        db.deleteGame(game.id);
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
    next(err);
  }
};

export default { startGame };
