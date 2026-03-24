import { prisma } from "./../lib/prisma.js";

const main = async () => {
  try {
    const modes = await prisma.mode.createMany({
      data: [
        { name: "robot-city" },
        { name: "second-mode" },
        { name: "third-mode" },
      ],
    });
    console.log(modes);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect(); 
  }
};

main();
