const schedulingStrategies = {
  fcfs: (headPosition, diskRequests) => {
    return [headPosition, ...diskRequests];
  },
  sstf: (headPosition, diskRequests) => {
    const pending = [...diskRequests]; // clone to avoid mutating original
    const sequence = [headPosition];
    let current = headPosition;

    while (pending.length > 0) {
      let closestIndex = 0;
      let minDistance = Math.abs(current - pending[0]);

      // Find the request with the shortest seek time
      for (let i = 1; i < pending.length; i++) {
        const distance = Math.abs(current - pending[i]);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      }

      const next = pending.splice(closestIndex, 1)[0];
      sequence.push(next);
      current = next;
    }

    return sequence;
  },
};

// Rename this to whatever specific algorithm (e.g: runSortingAlgorithm)
export const runDiskSchedulingAlgorithm = (headPosition, diskRequests, schedulingStrategy) => {
  const strategy = schedulingStrategies[schedulingStrategy];
  const orderedRequests = strategy(headPosition, diskRequests);
  let totalSeekTime = 0;

  // The first item is not needed, skip it
  for (let i = 1; i < orderedRequests.length; i++) {
    totalSeekTime += Math.abs(orderedRequests[i] - orderedRequests[i - 1]);
  }

  return { orderedRequests, totalSeekTime };
};
