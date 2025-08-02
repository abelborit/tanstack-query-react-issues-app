/* función para relentizar el código intencionalmente */
export const sleep = (milliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, milliseconds);
  });
};
