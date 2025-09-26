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

export const quickSort = (numbers, isAscending) => {
  const numArray = [...numbers];

  let idCounter = 1;

  // split a single group into [left?, pivot, right?].
  // pivot keeps the same id; left/right (if present) get new ids.
  const splitGroup = ({ id, group }) => {
    const mid = Math.ceil(group.length / 2) - 1; // subtract 1 to account for array indexing
    const pivot = group[mid];

    const left = [];
    const right = [];
    for (let i = 0; i < group.length; i++) {
      if (i === mid) continue; // skip the pivot itself (by index)
      const v = group[i];
      if (v < pivot) {
        isAscending ? left.push(v) : right.push(v); // partition by VALUE
      } else isAscending ? right.push(v) : left.push(v); // (>= pivot) goes right
    }

    const out = [];
    if (left.length) out.push({ id: idCounter++, group: left });
    out.push({ id, group: [pivot] }); // pivot inherits parent id
    if (right.length) out.push({ id: idCounter++, group: right });
    return out;
  };

  const snapshot = (state) => {
    // deep copy for the history
    return state.map(({ id, group }) => ({ id, group: [...group] }));
  };

  // Build levels where each level reflects ONE split applied to the current state.
  const quicksortLevelsOneSplitPerStep = (arr) => {
    idCounter = 1;

    const levels = [];
    const rootId = idCounter++; // id for the whole array
    let state = splitGroup({ id: rootId, group: arr }); // first split shown as level 1
    levels.push({
      before: { id: 1, group: arr }, // Subgroup before the split
      after: snapshot(state), // Subgroup after the split
      state: snapshot(state), // Entire state after the split
    });

    // queue of ids of groups that still need splitting (length > 1)
    const queue = state.filter((g) => g.group.length > 1).map((g) => g.id);

    while (queue.length) {
      const gid = queue.shift();

      // find current position of this group by id (indices shift as we edit state)
      const idx = state.findIndex((g) => g.id === gid);
      if (idx === -1 || state[idx].group.length <= 1) continue;

      // Make a copy of the unsplit state
      const copy = snapshot(state)[idx];

      // split that ONE group and replace it in place
      const pieces = splitGroup(state[idx]);
      state.splice(idx, 1, ...pieces);

      // enqueue newly created multi-element groups (left then right)
      for (const piece of pieces) {
        if (piece.id !== gid && piece.group.length > 1) queue.push(piece.id);
      }

      // record this step
      levels.push({ before: copy, after: pieces, state: snapshot(state) });
    }

    return levels;
  };

  const log = quicksortLevelsOneSplitPerStep(numArray);
  return log;
};

export const countSort = (numbers, isAscending = true) => {
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  const log = {
    range: max - min + 1,
    counts: [],
    reconstructedArrays: [],
  };

  // Initialize counts with zeros
  const counts = new Array(max - min + 1).fill(0);

  // Fill counts
  for (const number of numbers) {
    counts[number - min]++; // shift by min to fit in array
  }
  log.counts = counts;

  // Reconstruct step by step
  const reconstructedArray = [];
  const indices = isAscending
    ? [...Array(counts.length).keys()] // 0..len-1
    : [...Array(counts.length).keys()].reverse(); // len-1..0

  for (const idx of indices) {
    const value = idx + min;
    const freq = counts[idx];
    if (freq === 0) continue;

    // Add "freq" copies of the current value
    for (let i = 0; i < freq; i++) {
      reconstructedArray.push(value);
    }

    // Create a snapshot padded with nulls
    const snapshot = reconstructedArray.slice();
    while (snapshot.length < numbers.length) {
      snapshot.push(null);
    }

    log.reconstructedArrays.push(snapshot);
  }

  return log;
};
