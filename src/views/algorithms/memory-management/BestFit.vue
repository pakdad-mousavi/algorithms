<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          The <span class="text-main">Best Fit Algorithm</span> is another memory allocation strategy used in dynamic
          memory management. It's job is also to manage free space in the main memory, however, this algorithm aims to
          waste the least amount of space.
        </p>
        <p>
          As memory is allocated and deallocated to and from processes, the memory becomes <span
            class="text-main">fragmented</span>. To understand how memory works and how fragmentation occurs, see
          the <span class="cursor-pointer text-main" @click="router.push('/memory-management/first-fit')">
            First Fit Algorithm.
          </span>
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          How It Works
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          The best fit algorithm scans all free blocks of memory. From those blocks that are large enough for the
          process, it chooses the one with the smallest possible size. This minimizes wasted space by ensuring that the
          leftover memory in the chosen block is as small as possible. If no suitable block is found, the allocation
          fails.
        </p>
        <p>
          Lets say we have allocated 50KB to process 1, then 80KB to process 2, and finally 10KB to process 3. Between
          each process, there's 20KB, 50KB, and 40KB worth of free space respectively:
        </p>
        <Figure src="/algorithms/memory-management/best-fit/example-allocation.svg" class="max-w-2xl"
          caption="Example Memory Allocation"></Figure>
        <p>
          The best fit algorithm would look amongst all the free blocks of memory that are large enough for the process
          (50KB and 40KB), and then it will choose the smallest block amongst those. This allows for the least amount of
          space to be wasted, like so:
        </p>
        <Figure src="/algorithms/memory-management/best-fit/best-fit-algorithm.svg" class="max-w-2xl"
          caption="How the Best Fit Algorithm Chooses a Memory Block"></Figure>
      </div>
    </template>

    <template #[tabs.visualizer.id]>
      <div class="mb-10 space-y-4">
        <h2 class="text-xl font-semibold">
          Step by Step Illustration
        </h2>
        <hr class="mb-4 border-neutral-800">
        <form class="space-y-4" ref="form">
          <div class="flex flex-wrap items-end gap-4">
            <div class="flex flex-col gap-2">
              <label class="font-medium">Number of Processes:</label>
              <input type="number" class="w-full field sm:w-60" min="1" max="6" required v-model="totalProcesses">
            </div>
            <div class="flex flex-col flex-1 gap-2">
              <label class="font-medium">Total Memory Size (KB):</label>
              <input type="number" class="w-full field sm:w-60" min="10" max="150" required v-model="totalMemory">
            </div>
            <div class="flex gap-2">
              <button class="btn" type="button" @click="addRow()" :disabled="actions.length === 12">
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
                    <TrashButton @click="removeRow(index)" v-if="actions.length > 1"></TrashButton>
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
    </template>
  </TabSwitcher>
</template>

<script setup>
import TabSwitcher from '@/components/TabSwitcher.vue';
import { tabs } from '@/state/tabState';
import Memory from '@/components/algorithms/memory-management/Memory.vue';
import EmptySpace from '@/components/general/EmptySpace.vue';
import Figure from '@/components/general/Figure.vue';
import { runMemoryManagementAlgorithm } from '@/composables/memory-management';
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import TrashButton from '@/components/general/TrashButton.vue';

const router = useRouter();

const form = ref(null);
const totalProcesses = ref(4);
const totalMemory = ref(100);
const actions = reactive([
  { isAllocation: true, pid: 1, size: 30 },
  { isAllocation: true, pid: 2, size: 35 },
  { isAllocation: true, pid: 3, size: 20 },
  { isAllocation: false, pid: 2 },
  { isAllocation: true, pid: 4, size: 15 },
]);
const algResult = reactive({
  isSuccessful: false,
  memoryLog: [],
});
const hasAlgorithmBeenRan = ref(false);

watch([actions, totalMemory], () => {
  hasAlgorithmBeenRan.value = false;
});

const removeRow = (index) => {
  actions.splice(index, 1);
};

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
  const isFormValid = form.value.checkValidity();
  if (!isFormValid) return form.value.reportValidity();

  const { isSuccessful, memoryLog } = runMemoryManagementAlgorithm(actions, totalMemory.value, "bestFit");
  algResult.isSuccessful = isSuccessful;
  algResult.memoryLog = memoryLog;
  hasAlgorithmBeenRan.value = true;
};

</script>