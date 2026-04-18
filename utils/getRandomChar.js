const getRandomChar = (characters, count = 3) => {
  for (let i = characters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [characters[i], characters[j]] = [characters[j], characters[i]];
  }

  return characters.slice(0, count);
};

export default getRandomChar;
