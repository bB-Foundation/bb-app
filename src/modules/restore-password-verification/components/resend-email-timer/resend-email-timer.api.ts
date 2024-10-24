const addZero = (num: number) => (num < 10 ? `0${num}` : num);

export const getMinutes = (seconds: number) =>
  addZero(Math.floor(seconds / 60));

export const getSeconds = (seconds: number) => addZero(seconds % 60);
