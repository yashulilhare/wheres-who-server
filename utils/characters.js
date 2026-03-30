"use strict";

// Character data with joint coordinate values
class Character {
  constructor(name, coordinate, imageCode) {
    this.name = name;
    this.coordinate = coordinate;
    this.imageCode = imageCode;
  }
}

// separates coordinate into x and y to match database format
class CharacterDB {
  constructor(name, imageCode, xposition, yposition) {
    this.name = name;
    this.imageCode = imageCode;
    this.xposition = Number(xposition);
    this.yposition = Number(yposition);
  }
}

export { Character, CharacterDB };
