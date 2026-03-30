"use strict";

import { CharacterDB } from "./characters.js";
import separateCoordinate from "./separateCoordinate.js";

const formatCharacter =  (
  name,
  imageCode,
  coordinate,
  imageXLength,
  imageYLength,
) => {
  const [xcoordinate, ycoordinate] = separateCoordinate(coordinate);

  const xPercent = (xcoordinate / imageXLength) * 100;
  const xPercentRound = Math.round(xPercent * 100) / 100;

  const yPercent = (ycoordinate / imageYLength) * 100;
  const yPercentRound = Math.round(yPercent * 100) / 100;

  return new CharacterDB(name, Number(imageCode), xPercentRound, yPercentRound);
};

export default formatCharacter;
