"use strict";

import { Character } from "./characters.js";

const character = (name, coordinate, imageCode) => {
  return new Character(name, coordinate, imageCode);
};

export default character;
