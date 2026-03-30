"use strict";
// This file contains initial data about modes and characters

import Mode from "../utils/mode.js";
import character from "../utils/getCharacter.js";
import formatCharacter from "../utils/formatCharacter.js";

// mode names and image size (x and y length in pixel)
const modes = [
  new Mode("undrcity", 1920, 3858),
  new Mode("universe113", 1920, 2710),
  new Mode("pokeverse", 1021, 1384),
];

// separated mode list
const getUndrcityMode = async () => {
  return modes.filter((mode) => mode.name === "undrcity")[0];
};

const getUniverse113Mode = async () => {
  return modes.filter((mode) => mode.name === "universe113")[0];
};

const getPokeverseMode = async () => {
  return modes.filter((mode) => mode.name === "pokeverse")[0];
};

// characters list for each mode
const undrcity = [
  character("Nightcrawler - from X-men", "1600,788", 1),
  character("Bubble head nurse", "892,1677", 2),
  character("Storyteller Chef", "96,3378", 3),
  character("Reze the Bomb Devil from Chainsaw man", "902,789", 4),
  character("Mr.Elixir", "335,529", 5),
  character("Captain K'nuckles", "1286,737", 6),
  character("Mr.Dexter Stardust", "377,1019", 7),
  character("Cactus Girlie", "1440,1355", 8),
  character("XIII", "1110,1069", 9),
  character("Jetstream Sam", "1018,2099", 10),
  character("Roux Louka", "1484,2486", 11),
  character("Mikasa Ackerman from AOT", "209,3459", 12),
  character(" Vash the Stampede", "276,3064", 13),
  character("Cedar Pollen Allergen", "915,2263", 14),
  character("Mumm-Ra from ThunderCats", "1773,2992", 15),
  character(" Harley Quinn", "342,51", 16),
];

const universe113 = [
  character("Aurum Tentaclor", "99,2499", 1),
  character("Mech Cadet Yu", "103,850", 2),
  character("Earthworm Jim", "959,1252", 3),
  character("Johnny Bravo", "660,1001", 4),
  character("Beloc from Firebreather", "1054,1869", 5),
  character("Donkey Head", "1287,1555", 6),
  character("Kryb", "1485,1140", 7),
  character("Sailor Moon", "272,1574", 8),
  character("Crossbow Master", "355,2546", 9),
  character("Nacromancer", "1741,2398", 10),
  character("Flavia the Vampire", "720,1475", 11),
  character("Mr. Warhammer", "879,2010", 12),
  character("The Spawn", "1719,1664", 13),
  character("The Skeleton", "67,1146", 14),
  character("Scorpion man", "1380,689", 15),
  character("Cacodemon", "799,1063", 16),
];

const pokeverse = [
  character("Pikachu", "400,718", 1),
  character("Venomoth", "254,425", 2),
  character("Gloom", "794,990", 3),
  character("Dodrio", "587,857", 4),
  character("Bulbasur", "877,897", 5),
  character("Clefairy", "422,1032", 6),
  character("Pokemon Hunter", "923,711", 7),
  character("Staryu", "278,666", 8),
  character("Dratini", "666,651", 9),
  character("Sandslash", "226,998", 10),
  character("Seadra", "569,1250", 11),
  character("Tauros", "652,758", 12),
  character("Pinsir", "489,863", 13),
  character("Parasect", "255,1073", 14),
  character("Shellder", "870,1014", 15),
  character("Jynx", "785,679", 16),
];

// formatted character list
const getUndrcityCharacters = async () => {
  const undrcityMode = await getUndrcityMode();
  const characters = undrcity.map((item) => {
    return formatCharacter(
      item.name,
      item.imageCode,
      item.coordinate,
      undrcityMode.xLength,
      undrcityMode.yLength,
    );
  });

  return characters;
};

const getUniverse113Characters = async () => {
  const universe113Mode = await getUniverse113Mode();
  const characters = universe113.map((item) => {
    return formatCharacter(
      item.name,
      item.imageCode,
      item.coordinate,
      universe113Mode.xLength,
      universe113Mode.yLength,
    );
  });

  return characters;
};

const getPokeverseCharacters = async () => {
  const pokeverseMode = await getPokeverseMode();
  const characters = pokeverse.map((item) => {
    return formatCharacter(
      item.name,
      item.imageCode,
      item.coordinate,
      pokeverseMode.xLength,
      pokeverseMode.yLength,
    );
  });
  return characters;
};

export default {
  getUndrcityCharacters,
  getUniverse113Characters,
  getPokeverseCharacters,
  getUndrcityMode,
  getUniverse113Mode,
  getPokeverseMode,
};
