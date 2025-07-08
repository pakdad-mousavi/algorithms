const allocationTechniques = {
  firstFit: (size, memory) => {
    for (let i = 0; i < memory.length; i++) {
      // Find the first free block which can fit the given size
      const block = memory[i];
      if (block.status === "free" && block.size >= size) {
        return [i, block];
      }
    }
    // Memory is full
    return [memory.length, false];
  },
  bestFit: () => {},
  worstFit: () => {},
};

const allocate = (pid, size, memory, allocationTechnique) => {
  const allocatedProcesses = new Set(
    memory
      .filter((block) => block.status === "allocated")
      .map((block) => block.pid)
  );
  const getFreeBlock = allocationTechniques?.[allocationTechnique];
  const [i, block] = getFreeBlock(size, memory);
  // memory full or memory has already been allocated to this process
  if (!block || allocatedProcesses.has(pid)) return false;

  const allocation = {
    start: block.start,
    size,
    status: "allocated",
    pid,
  };

  // If there is waste, split the memory block into two
  const waste = block.size - size;
  if (waste) {
    const remainingFreeBlock = {
      start: block.start + size,
      size: waste,
      status: "free",
    };
    memory.splice(i, 1, allocation, remainingFreeBlock);
  } else {
    memory[i] = allocation;
  }
  return true;
};

const deallocate = (pid, memory) => {
  for (let i = 0; i < memory.length; i++) {
    if (memory[i].status === "allocated" && memory[i].pid === pid) {
      memory[i] = {
        start: memory[i].start,
        size: memory[i].size,
        status: "free",
      };
      mergeAdjacentFreeBlocks(memory);
      return true;
    }
  }
  return false;
};

const mergeAdjacentFreeBlocks = (memory) => {
  for (let i = 0; i < memory.length - 1; i++) {
    const currBlock = memory[i];
    const nextBlock = memory[i + 1];

    if (currBlock.status === "free" && nextBlock.status === "free") {
      memory[i].size += nextBlock.size;
      memory.splice(i + 1, 1);
      // Check again in case there's more than a pair of free memory blocks
      i--;
    }
  }
};

export const runMemoryManagementAlgorithm = (
  actions,
  totalMemory,
  allocationTechnique
) => {
  // Initialize memory
  const memory = [];
  const memoryLog = [];
  let isSuccessful = true;
  memory.push({ start: 0, size: totalMemory, status: "free" });

  for (const action of actions) {
    if (action.isAllocation) {
      isSuccessful = allocate(
        action.pid,
        action.size,
        memory,
        allocationTechnique
      );
    } else {
      isSuccessful = deallocate(action.pid, memory);
    }

    if (isSuccessful) {
      memoryLog.push(memory.map((block) => ({ ...block })));
    } else {
      break;
    }
  }

  return {
    isSuccessful,
    memoryLog,
  };
};
