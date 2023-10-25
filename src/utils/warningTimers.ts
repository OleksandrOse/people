export const warningTimer = (
  callback: () => void,
  delay: number,
) => {
  setTimeout(() => {
    callback();
  }, delay);
};