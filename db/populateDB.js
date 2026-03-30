import { prisma } from "./../lib/prisma.js";
import formatCharacterForDB from "../utils/formatCharacterForDB.js";

// importing data
import data from "./initialData.js";

const main = async () => {
  const undrcityMode = await data.getUndrcityMode();
  const universe113Mode = await data.getUniverse113Mode();
  const pokeverseMode = await data.getPokeverseMode();

  try {
    const countMode = await prisma.mode.count();

    // to avoid duplicate modes
    if (countMode < 3) {
      const modes = await prisma.mode.createMany({
        data: [
          {
            name: undrcityMode.name,
            xLength: undrcityMode.xLength,
            yLength: undrcityMode.yLength,
          },
          {
            name: universe113Mode.name,
            xLength: universe113Mode.xLength,
            yLength: universe113Mode.yLength,
          },
          {
            name: pokeverseMode.name,
            xLength: pokeverseMode.xLength,
            yLength: pokeverseMode.yLength,
          },
        ],
      });

      console.log("Added modes", modes);
    } else {
      console.log(
        "Modes were already available in database. No new mode are added.",
      );
    }

    const countCharacter = await prisma.character.count();

    // using hard value 16 because all mode contain 16 characters in total and total modes are 3
    if (!(countCharacter < 16 * 3)) {
      return console.log(
        "Characters were already stored in database, no new characters are added.",
      );
    }

    const undrcityCharacters = await data.getUndrcityCharacters();
    const universe113Characters = await data.getUniverse113Characters();
    const pokeverseCharacters = await data.getPokeverseCharacters();

    const savedMode = await prisma.mode.findMany();

    const undrcityModeId = savedMode.find(
      (mode) => mode.name === "undrcity",
    ).id;
    const universe113ModeId = savedMode.find(
      (mode) => mode.name === "universe113",
    ).id;
    const pokeverseModeId = savedMode.find(
      (mode) => mode.name === "pokeverse",
    ).id;

    const formattedUndrcity = await formatCharacterForDB(
      undrcityModeId,
      undrcityCharacters,
    );

    const formattedUniverse113 = await formatCharacterForDB(
      universe113ModeId,
      universe113Characters,
    );

    const formattedPokeverse = await formatCharacterForDB(
      pokeverseModeId,
      pokeverseCharacters,
    );

    const savedUndrcity = await prisma.character.createMany({
      data: formattedUndrcity,
    });

    const savedUniverse113 = await prisma.character.createMany({
      data: formattedUniverse113,
    });

    const savedPokeverse = await prisma.character.createMany({
      data: formattedPokeverse,
    });

    console.log("Added undrcity characters", savedUndrcity);
    console.log("Added universe113 characters", savedUniverse113);
    console.log("Added pokeverse characters", savedPokeverse);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
    console.log("Process completed.");
  }
};

main();
