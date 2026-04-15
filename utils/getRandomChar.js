const getRandomChar = (characters, count = 3) => {
  const shuffled = characters.sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);
  return selected;
};

export default getRandomChar;
