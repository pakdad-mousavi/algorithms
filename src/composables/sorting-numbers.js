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
      const condition = isAscending ? numArray[i] > numArray[i + 1] : numArray[i] < numArray[i + 1];
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

export const selectionSort = (numbers, isAscending) => {
  const log = [];
  const numArray = [...numbers];
  for (let i = 0; i < numbers.length - 1; i++) {
    // Find smallest/largest number
    const unsortedSection = numArray.slice(i);
    const selection = isAscending ? Math.min(...unsortedSection) : Math.max(...unsortedSection);
    const selectionIdx = unsortedSection.indexOf(selection) + i;

    // Update log
    const logEntry = {
      oldState: numArray.slice(),
      selection,
      selectionIdx,
    };

    // Swap
    [numArray[i], numArray[selectionIdx]] = [numArray[selectionIdx], numArray[i]];

    // Add new state
    logEntry.newState = numArray.slice();
    log.push(logEntry);
  }

  return log;
};

export const insertionSort = (numbers, isAscending) => {
  const log = [];
  const numArray = [...numbers];

  for (let i = 1; i < numArray.length; i++) {
    const currentNum = numArray[i];
    const sortedSection = numArray.slice(0, i);
    const pos = sortedSection.findIndex((num) =>
      isAscending ? num > currentNum : num < currentNum
    );

    const oldState = numArray.slice();

    let intermediateState = null;

    if (pos > -1) {
      numArray.splice(pos, 0, null);
      numArray.splice(i + 1, 1);
      intermediateState = numArray.slice();
      numArray[pos] = currentNum;
    }

    log.push({
      pos,
      oldState,
      intermediateState,
      newState: numArray.slice(),
      currentNum,
    });
  }

  return log;
};

export const mergeSort = (numbers, isAscending) => {
  const log = [];
  const numArray = [...numbers];

  const maxDepth = Math.ceil(Math.log2(numArray.length));

  const merge = (left, right) => {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      const condition = isAscending ? left[i] <= right[j] : left[i] >= right[j];

      if (condition) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
  };

  const sortAndMerge = (array, splitDepth) => {
    if (array.length <= 1) {
      return array;
    }

    const mergeDepth = maxDepth - splitDepth + 1;

    const mid = Math.ceil(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    const sortedLeft = sortAndMerge(left, splitDepth + 1);
    const sortedRight = sortAndMerge(right, splitDepth + 1);

    log.push({
      splitDepth,
      left: left.slice(),
      right: right.slice(),
      mergeDepth,
      mergedLeft: sortedLeft.slice(),
      mergedRight: sortedRight.slice(),
    });

    return merge(sortedLeft, sortedRight);
  };

  sortAndMerge(numArray, 1); // start depth at 1

  return log;
};
