export const sortingAlgorithms = {
  bubble: (numbers, isAscending) => {
    const sortedNumbers = [...numbers];
    const log = [];
    let swapped;
    do {
      const currentPass = [];
      // reset swapped
      swapped = false;
      for (let i = 0; i < sortedNumbers.length - 1; i++) {
        const stateObj = {
          pairStart: i,
          state: sortedNumbers.slice(),
          swapped: null,
        };
        // Ascending or descending order
        const condition = isAscending
          ? sortedNumbers[i] > sortedNumbers[i + 1]
          : sortedNumbers[i] < sortedNumbers[i + 1];
        // swap items
        if (condition) {
          [sortedNumbers[i], sortedNumbers[i + 1]] = [sortedNumbers[i + 1], sortedNumbers[i]];
          swapped = true;
        }
        stateObj.swapped = condition;
        currentPass.push(stateObj);
      }
      currentPass.push({
        pairStart: null,
        state: sortedNumbers.slice(),
        swapped: null,
      });
      log.push(currentPass);
    } while (swapped);
    console.log(sortedNumbers);
    console.log(log);
    return { log };
  },
};
