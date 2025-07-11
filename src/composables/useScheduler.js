import { reactive } from "vue";

export const useScheduler = () => {
  // Values to return
  const queueLog = reactive([]);
  const processLog = reactive([]);
  const finishedProcesses = reactive([]);

  // Get rid of old algorithm results
  const resetAlgorithmResults = (hasAlgorithmBeenRan) => {
    hasAlgorithmBeenRan.value = false;
    queueLog.length = 0;
    processLog.length = 0;
    finishedProcesses.length = 0;
  };

  // Use to update the queue log
  let lastQueueSnapshot = null;
  let lastSnapshotTime = -1;

  const updateQueueLog = (currentTime, queue) => {
    const queueProcessIds = queue.map((x) => `P${x[0]}`);
    while (queueProcessIds.length < 6) {
      queueProcessIds.push("-");
    }

    const snapshot = queueProcessIds.join(",");

    // Only skip if snapshot is same AND time hasn't moved (e.g., multiple calls in the same ms)
    if (snapshot !== lastQueueSnapshot || currentTime !== lastSnapshotTime) {
      queueLog.push([currentTime, queueProcessIds]);
      lastQueueSnapshot = snapshot;
      lastSnapshotTime = currentTime;
    }
  };

  // Use to update the process log
  const updateProcessLog = (currentProcess, currentTime) => {
    const processCopy = currentProcess.slice();
    processLog.push([currentTime, processCopy]);
  };

  // Main non-preemptive scheduling algorithm
  const runAlgorithm = ({ runtimeProcesses, form, hasAlgorithmBeenRan, sortFn }) => {
    // Ensure data is valid
    const isFormValid = form.value.checkValidity();
    if (!isFormValid) return form.value.reportValidity();

    // Reset results and begin process
    resetAlgorithmResults(hasAlgorithmBeenRan);

    // Initialize values
    let currentTime = 0;
    let currentProcess = null;
    const queue = [];

    // Deep clone the process data to prevent mutating reactive/computed state
    const processesCopy = runtimeProcesses.value.map((p) => [...p]);

    // The position of the timeLeft value is guaranteed to be last
    const timeLeftPos = processesCopy[0].length - 1;

    while (true) {
      // Add new arrivals
      for (const process of processesCopy) {
        const arrivalTime = process[1];
        if (arrivalTime === currentTime) {
          queue.push(process);
          // Sort the queue respectively
          if (sortFn) queue.sort(sortFn);
          updateQueueLog(currentTime, queue);
        }
      }

      // Assign CPU
      if (currentProcess === null && queue.length) {
        currentProcess = queue.shift();
        updateProcessLog(currentProcess, currentTime);
      }
      // Update the queue log regardless of changes to the queue
      updateQueueLog(currentTime, queue);

      // Run current process
      currentTime += 1;

      if (currentProcess !== null) {
        currentProcess[timeLeftPos] -= 1;

        if (currentProcess[timeLeftPos] === 0) {
          finishedProcesses.push([currentProcess[0], currentTime]);
          currentProcess = null;
        } else {
          updateProcessLog(currentProcess, currentTime);
        }
      }

      // Check to see if all processes are completed
      const allDone = processesCopy.every((p) => p[timeLeftPos] === 0);
      if (!currentProcess && queue.length === 0 && allDone) break;
    }

    hasAlgorithmBeenRan.value = true;
  };

  return {
    runAlgorithm,
    resetAlgorithmResults,
    queueLog,
    processLog,
    finishedProcesses,
  };
};
