export const bubbleSort = (numbers, isAscending) => {
  const numArray = [...numbers];
  const log = [];
  let swapped;
  do {
    const currentPass = [];
    // reset swapped
    swapped = false;
    for (let i = 0; i < numArray.length - 1; i++) {
      const stateObj = {
        pairStart: i,
        state: numArray.slice(),
        swapped: null,
      };
      // Ascending or descending order
      const condition = isAscending
        ? numArray[i] > numArray[i + 1]
        : numArray[i] < numArray[i + 1];
      // swap items
      if (condition) {
        [numArray[i], numArray[i + 1]] = [numArray[i + 1], numArray[i]];
        swapped = true;
      }
      stateObj.swapped = condition;
      currentPass.push(stateObj);
    }
    currentPass.push({
      pairStart: null,
      state: numArray.slice(),
      swapped: null,
    });
    log.push(currentPass);
  } while (swapped);
  return log;
};
