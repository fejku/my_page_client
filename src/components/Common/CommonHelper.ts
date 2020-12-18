export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const sleepRand = (msMin: number, msMax: number) => {
  const ms = Math.floor(Math.random() * msMax) + msMin;
  return new Promise((resolve) => setTimeout(resolve, ms));
};
