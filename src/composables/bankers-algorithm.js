export const runBankersAlgorithm = ({
  allocationMatrix,
  maxMatrix,
  resourceInstances,
}) => {
  // Function to update the process log
  const addToProcessLog = ({
    i,
    runCount,
    isFinished,
    finished,
    need,
    available,
    allocation,
    canRun,
  }) => {
    processLog.push({
      processId: i,
      runCount,
      isFinished,
      finished: Array.from(finished),
      need: need?.slice() ?? null,
      canRun,
      available: available?.slice() ?? null,
      allocation: allocation?.slice() ?? null,
    });
  };

  // Initialize variables
  const processLog = [];
  const needMatrix = [];
  const safeSequence = [];

  // Calculate total allocations per resource
  const totalAllocations = Array(resourceInstances.length).fill(0);
  allocationMatrix.forEach((process) => {
    process.forEach((val, idx) => {
      totalAllocations[idx] += val;
    });
  });

  // Calculate available resources
  const available = resourceInstances.map(
    (total, idx) => total - totalAllocations[idx]
  );

  // Calculate need
  for (let i = 0; i < allocationMatrix.length; i++) {
    needMatrix.push([]);
    for (let j = 0; j < maxMatrix[i].length; j++) {
      const need = maxMatrix[i][j] - allocationMatrix[i][j];
      needMatrix[i][j] = need;
    }
  }

  // Initialize finished set
  const finished = new Set();
  let runCount = 0;
  let madeProgress = true;

  while (finished.size < needMatrix.length && madeProgress) {
    madeProgress = false;
    runCount++;

    for (let i = 0; i < needMatrix.length; i++) {
      // Get the details for this process
      const curNeed = needMatrix[i];
      const curAllocation = allocationMatrix[i];

      // Check if the process is already finished
      const isFinished = finished.has(i);
      if (isFinished) continue;

      // Check if the process can run
      const canRun =
        !isFinished && curNeed.every((need, j) => need <= available[j]);
      const availableCopy = available.slice();
      // Simulate running the process
      if (canRun) {
        curAllocation.forEach((alloc, j) => {
          available[j] += alloc;
        });
        finished.add(i);
        safeSequence.push(i);
        madeProgress = true;
      }

      // Update process log
      addToProcessLog({
        i,
        runCount,
        isFinished,
        finished,
        need: curNeed,
        canRun,
        available: availableCopy,
        allocation: canRun ? curAllocation : null,
      });
    }
  }
  const isSafe = finished.size === needMatrix.length;
  return { needMatrix, safeSequence, isSafe, processLog };
};
