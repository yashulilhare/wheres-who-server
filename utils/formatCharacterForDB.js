"use strict";

import { v4 as uuidv4 } from "uuid";

const formatCharacterForDB = async (modeId, characters) => {
  const arr = characters.map((character) => {
    return {
      name: character.name,
      imageCode: character.imageCode,
      xposition: character.xposition,
      yposition: character.yposition,
      modeId,
      id: uuidv4(),
    };
  });
  return arr;
};

export default formatCharacterForDB;
