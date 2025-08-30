export const linearSearch = (arr, target) => {
  const log = [];
  let position = -1;

  for (let i = 0; i < arr.length; i++) {
    const match = arr[i] === target;
    log.push(match);
    if (match) {
      position = i;
      break;
    }
  }

  return { log, position };
};
