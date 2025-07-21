const schedulingStrategies = {
  fcfs: (headPosition, diskRequests) => {
    return [headPosition, ...diskRequests];
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
