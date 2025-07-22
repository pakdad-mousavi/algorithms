const schedulingStrategies = {
  fcfs: ({ headPosition, diskRequests }) => {
    return [headPosition, ...diskRequests];
  },
  sstf: ({ headPosition, diskRequests }) => {
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
  scan: ({ headPosition, diskRequests, headDirection }) => {
    const MIN_TRACK = 0;
    const MAX_TRACK = 199;
    const pending = [headPosition, ...diskRequests];

    // Include min and max tracks if needed
    if (pending.indexOf(MIN_TRACK) === -1) {
      pending.push(MIN_TRACK);
    }
    if (pending.indexOf(MAX_TRACK) === -1) {
      pending.push(MAX_TRACK);
    }

    const orderedRequests = pending.sort((a, b) => a - b);
    const headIndex = orderedRequests.indexOf(headPosition);

    let firstSegment;
    if (headDirection === "left") {
      // Take requests from 0 to head, then reverse
      firstSegment = orderedRequests.splice(0, headIndex + 1).reverse();
    } else {
      // Take requests from head to end, then reverse remaining requests
      firstSegment = orderedRequests.splice(headIndex, orderedRequests.length);
      orderedRequests.reverse();
    }

    const sequence = firstSegment.concat(orderedRequests);
    console.log(sequence);

    return sequence;
  },
  look: ({ headPosition, diskRequests, headDirection }) => {
    const pending = [headPosition, ...diskRequests];

    const orderedRequests = pending.sort((a, b) => a - b);
    const headIndex = orderedRequests.indexOf(headPosition);

    let firstSegment;
    if (headDirection === "left") {
      // Take requests from 0 to head, then reverse
      firstSegment = orderedRequests.splice(0, headIndex + 1).reverse();
    } else {
      // Take requests from head to end, then reverse remaining requests
      firstSegment = orderedRequests.splice(headIndex, orderedRequests.length);
      orderedRequests.reverse();
    }

    const sequence = firstSegment.concat(orderedRequests);
    console.log(sequence);

    return sequence;
  },
};

export const runDiskSchedulingAlgorithm = (
  headPosition,
  diskRequests,
  schedulingStrategy,
  headDirection = "left" // 'left' or 'right'
) => {
  const ctx = { headPosition, diskRequests, headDirection };
  const strategy = schedulingStrategies[schedulingStrategy];
  const orderedRequests = strategy(ctx);
  let totalSeekTime = 0;

  // The first item is not needed, skip it
  for (let i = 1; i < orderedRequests.length; i++) {
    totalSeekTime += Math.abs(orderedRequests[i] - orderedRequests[i - 1]);
  }

  return { orderedRequests, totalSeekTime };
};
