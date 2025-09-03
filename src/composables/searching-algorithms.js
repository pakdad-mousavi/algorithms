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

export const binarySearch = (arr, target) => {
  const log = [];
  let position = -1;
  let low = 0;
  let high = arr.length - 1;

  const sortedArr = arr.slice().sort((a, b) => a - b);

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    log.push({
      low,
      mid,
      high,
    });
    if (sortedArr[mid] === target) {
      position = mid;
      break;
    } else if (target > sortedArr[mid]) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return { sortedArr, log, position };
};

export const interpolationSearch = (arr, target) => {
  const log = [];
  let position = -1;
  let low = 0;
  let high = arr.length - 1;

  const sortedArr = arr.slice().sort((a, b) => a - b);

  while (low <= high && target >= sortedArr[low] && target <= sortedArr[high]) {
    if (sortedArr[low] === sortedArr[high]) {
      if (sortedArr[low] === target) position = low;
      break;
    }

    const ratio = (target - sortedArr[low]) / (sortedArr[high] - sortedArr[low]);
    const pos = low + Math.floor(ratio * (high - low));
    log.push({
      low,
      pos,
      high,
    });
    if (sortedArr[pos] === target) {
      position = pos;
      break;
    } else if (target > sortedArr[pos]) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
  }

  return { sortedArr, log, position };
};
