<template>
  <Transition>
    <div :key="tab">
      <div v-if="tab === 'How It Works'" class="mb-10 space-y-4">
        <p>
          The <span class="text-main">First Fit Algorithm</span> is a memory allocation strategy used in dynamic memory
          management. It's job is to manage free space in the main memory.
        </p>
        <p>
          As processes are ran by the CPU, they will request for certain amounts of memory, and the system needs to
          allocate this memory efficiently. The first fit algorithm's job is to find the very first empty block of
          memory which is big enough for the process's request.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          External Fragmentation
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Lets say we have a block of empty memory, like so:
        </p>
        <Figure src="/algorithms/memory-management/first-fit/empty-memory.svg" caption="Empty Memory" class="max-w-2xl">
        </Figure>
        <p>
          As processes arrive in the CPU, the system needs to allocate free memory to each process. Let's say we have 3
          processes, P1, P2, and P3, each requesting 50KB, 50KB, and 80KB worth of memory respectively:
        </p>
        <Figure src="/algorithms/memory-management/first-fit/memory-allocation.svg" class="max-w-lg"
          caption="Allocating Memory for P1, P2, and P3"></Figure>
        <p>
          When a process finishes executing, the memory allocated to it earlier becomes free. However, the freed memory
          block may not be connected to other free memory blocks, resulting in
          <span class="text-main">external fragmentation</span>, like so:
        </p>
        <Figure src="/algorithms/memory-management/first-fit/external-fragmentation.svg" class="max-w-lg"
          caption="External Fragmentation"></Figure>
        <h2 class="mt-10 text-xl font-semibold">
          How It Works
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          The first fit algorithm becomes useful when a process requests memory, and the memory is fragmented. Its job
          is to find the first block of memory large enough to fit the request. For example, if there are three empty
          blocks of memory, each worth 20KB, 50KB, and 40KB of space respectively, the 50KB block would be chosen:
        </p>
        <Figure src="/algorithms/memory-management/first-fit/first-fit-algorithm.svg" class="max-w-2xl"
          caption="How the First Fit Algorithm Chooses a Memory Block"></Figure>
      </div>

      <div v-if="tab === 'Algorithm Visualizer'" class="mb-10 space-y-4">
        <h2 class="text-xl font-semibold">
          Step by Step Illustration
        </h2>
        <hr class="mb-4 border-neutral-800">
        <form class="space-y-4">
          <div class="flex flex-wrap items-end gap-4">
            <div class="flex flex-col gap-2">
              <label class="font-medium">Number of Processes:</label>
              <input type="number" class="w-full field sm:w-60" min="1" max="6" required v-model="totalProcesses">
            </div>
            <div class="flex flex-col flex-1 gap-2">
              <label class="font-medium">Total Memory Size (KB):</label>
              <input type="number" class="w-full field sm:w-60" min="10" max="200" required v-model="totalMemory">
            </div>
            <div class="flex gap-2">
              <button class="btn" type="button" @click="addRow()" :disabled="actions.length === 12"
                :class="{ 'disabled': actions.length === 12 }">
                Add Row
              </button>
            </div>
          </div>
          <div class="overflow-x-scroll">
            <table>
              <thead>
                <tr>
                  <th>Action Type</th>
                  <th>Process ID</th>
                  <th>Size (KB)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(action, index) in actions" :key="index">
                  <td>
                    <select v-model="action.isAllocation">
                      <option :value="true">Allocation</option>
                      <option :value="false">Deallocation</option>
                    </select>
                  </td>
                  <td>
                    <select v-model="action.pid">
                      <option :value="pid" v-for="pid in totalProcesses">
                        {{ pid }}
                      </option>
                    </select>
                  </td>
                  <td><input min="10" type="number" v-model="action.size" v-if="action.isAllocation"></td>
                  <td class="w-20 mx-auto text-center">
                    <div v-if="actions.length > 1"
                      class="flex items-center justify-center duration-100 border border-transparent rounded-md cursor-pointer bg-zinc-700 aspect-square w-7 group hover:border-rose-600 active:translate-y-1"
                      @click="actions.splice(index, 1)">
                      <Icon class="text-rose-500" tag="span" size="20px">
                        <Trash></Trash>
                      </Icon>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button type="submit" class="btn" @click.prevent="runAlgorithm">Run Algorithm</button>
        </form>

        <h2 class="mt-10 text-xl font-semibold">
          Results
        </h2>
        <hr class="mb-4 border-neutral-800">
        <Memory :has-algorithm-been-ran="hasAlgorithmBeenRan" :total-memory="totalMemory" :alg-result="algResult"
          :actions="actions" v-if="hasAlgorithmBeenRan"></Memory>
        <EmptySpace v-else>
          <template v-slot>
            <p class="mb-4">
              No results to display yet, try running the algorithm...
            </p>
            <button @click.prevent="runAlgorithm" class="btn">
              Run Algorithm
            </button>
          </template>
        </EmptySpace>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import Memory from '@/components/algorithms/memory-management/Memory.vue';
import EmptySpace from '@/components/general/EmptySpace.vue';
import Figure from '@/components/general/Figure.vue';
import { runMemoryManagementAlgorithm } from '@/composables/memory-management';
import { Trash } from '@vicons/tabler';
import { Icon } from '@vicons/utils';
import { reactive, ref, watch } from 'vue';

defineProps({
  tab: {
    type: String,
    required: true,
  }
});

const totalProcesses = ref(4);
const totalMemory = ref(100);
const actions = reactive([
  { isAllocation: true, pid: 1, size: 20 },
  { isAllocation: true, pid: 2, size: 20 },
  { isAllocation: true, pid: 3, size: 20 },
  { isAllocation: false, pid: 2 },
]);
const algResult = reactive({
  isSuccessful: false,
  memoryLog: [],
});
const hasAlgorithmBeenRan = ref(false);

watch(actions, () => {
  hasAlgorithmBeenRan.value = false;
});

const addRow = () => {
  const totalPIDsAllowed = totalProcesses.value;

  // Get allocated and deallocated PIDs
  const allocatedPIDs = new Set(
    actions.filter((a) => a.isAllocation).map((a) => a.pid)
  );

  const deallocatedPIDs = new Set(
    actions.filter((a) => !a.isAllocation).map((a) => a.pid)
  );

  const activePIDs = [...allocatedPIDs].filter(pid => !deallocatedPIDs.has(pid));

  // Allocate a new process if we still have room
  if (allocatedPIDs.size < totalPIDsAllowed) {
    // Find the next unused PID
    let newPID = null;
    for (let pid = 1; pid <= totalPIDsAllowed; pid++) {
      if (!allocatedPIDs.has(pid)) {
        newPID = pid;
        break;
      }
    }

    const newAction = {
      isAllocation: true,
      pid: newPID,
      size: 10,
    };

    actions.push(newAction);
  }
  // Otherwise, deallocate a random currently active process
  else if (activePIDs.length > 0) {
    const randIndex = Math.floor(Math.random() * activePIDs.length);
    const pidToDeallocate = activePIDs[randIndex];

    const newAction = {
      isAllocation: false,
      pid: pidToDeallocate,
    };

    actions.push(newAction);
  }
};

const runAlgorithm = () => {
  const { isSuccessful, memoryLog } = runMemoryManagementAlgorithm(actions, totalMemory.value, "firstFit");
  algResult.isSuccessful = isSuccessful;
  algResult.memoryLog = memoryLog;
  hasAlgorithmBeenRan.value = true;
};

</script>