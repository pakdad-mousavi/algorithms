<template>
  <main class="p-4 space-y-4 text-neutral-300">
    <section class="p-4 rounded-xl bg-zinc-900">
      <div class="mx-auto sm:w-11/12">
        <h1 class="mb-4 text-2xl font-semibold">
          Banker's Algorithm
        </h1>
        <hr class="mb-4 border-neutral-800">
        <div class="mb-10 space-y-4">
          <p>
            <span class="text-main">Banker's Algorithm</span> is a non-preemptive method of avoiding <span
              class="text-main">deadlocks</span> inside of a system with limited resources. Created by Edsger Dijkstra,
            the Banker's Algorithm works by avoiding the potential for any deadlocks which may occur altogether, in
            contrast to deadlock recovery methods.
          </p>
          <Alert alert-style="note">
            <p>
              The name "Banker's Algorithm" comes from how a bank lends money to its customers. Banks will only loan
              out money if they are certain they can fulfill all customer withdrawals, even in the worst case scenario.
              This
              ensures that there is always enough money in the bank to avoid bankruptcy.
            </p>
          </Alert>
        </div>
        <h2 class="mb-4 text-xl font-semibold">
          The Deadlock Problem
        </h2>
        <hr class="mb-4 border-neutral-800">
        <div class="mb-10 space-y-4">
          <p>
            In operating systems, a deadlock occurs when multiple processes are waiting for resources that are held by
            each other. The processes are both holding the resources the other needs, and waiting for the other process
            to release their resources (which never happens since both sides are waiting).
          </p>
          <p>
            To put this into perspective, imagine a four-way intersection, with four cars (process A, B, C, and D) each
            coming from different directions. All four cars want to turn left, so they move slightly into the
            intersection and then wait for the car that's in front of them to move first.
          </p>
          <ul class="list-disc list-inside">
            <li><span class="text-rose-400">A</span> waits for <span class="text-amber-400">B</span></li>
            <li><span class="text-amber-400">B</span> waits for <span class="text-main">C</span></li>
            <li><span class="text-main">C</span> waits for <span class="text-cyan-400">D</span></li>
            <li><span class="text-cyan-400">D</span> waits for <span class="text-rose-400">A</span></li>
          </ul>
          <p>
            All four cars are waiting in the center for their counterpart to move, so the traffic stops moving
            completely; the cars are in a deadlock. Bankers algorithm is a way to avoid such deadlocks from happening in
            the first place.
          </p>
        </div>
        <Figure src="/algorithms/deadlock-management/bankers-algorithm/deadlocks.svg" caption="How a Deadlock Works">
        </Figure>
        <h2 class="mb-4 text-xl font-semibold">
          How it works
        </h2>
        <hr class="mb-4 border-neutral-800">
        <div class="mb-10 space-y-4">
          <p>
            The Banker's Algorithm is run everytime a process requests for more resources than it already has. It checks
            to see if all processes can be finished if the resources needed by that process are allocated to it. This is
            done by simulating the system to see if there is at least one order (known as the <span
              class="text-main">safe sequence</span>) in which all processes can finish.
          </p>
          <Alert alert-style="warning">
            <div class="space-y-4">
              <p>
                In real-world systems, the Banker's Algorithm is used to see if the resources requested by a process can
                be allocated to it without risking a potential deadlock in the system, as described earlier.
              </p>
              <p>
                However, for the sake of simplicity, this implementation of the algorithm will focus solely on
                determining whether the system is currently in a safe state or not, rather than handling actual resource
                allocation or process execution.
              </p>
            </div>
          </Alert>
          <h3 class="mb-4 font-semibold">
            Resource Instances
          </h3>
          <hr class="mb-4 border-neutral-800">
          <p class="mb-10">
            This is the total number of resources of each type given inside of the system. It is used, along with
            allocated, to calculate the available values for each process. These values are needed in advanced (if
            available values are not given).
          </p>
          <h3 class="mb-4 font-semibold">
            Allocated
          </h3>
          <hr class="mb-4 border-neutral-800">
          <p class="mb-10">
            This is the number of resources of each type that have already been allocated to each process. It is used,
            along with resource instances, to calculate the available values for each process. These values are needed
            in advanced.
          </p>
          <h3 class="mb-4 font-semibold">
            Available
          </h3>
          <hr class="mb-4 border-neutral-800">
          <p>
            This is the number of each resource types that are available for each process. It can be calculated as:
          </p>
          <p class="mb-10 italic text-center">Available = Resource Instance - Total Allocated Amongst Processes</p>
          <h3 class="mb-4 font-semibold">
            Max
          </h3>
          <hr class="mb-4 border-neutral-800">
          <p class="mb-10">
            This is the maximum resources of each type that each process may ask for. These values are needed in
            advanced.
          </p>
          <h3 class="mb-4 font-semibold">
            Need
          </h3>
          <hr class="mb-4 border-neutral-800">
          <p>
            This is what each process still may need to complete its job. For each resource type of each process, it can
            be calculated as:
          </p>
          <p class="mb-10 italic text-center">Need = Max - Allocation</p>
        </div>
        <h2 class="mb-4 text-xl font-semibold">
          Understanding the process
        </h2>
        <hr class="mb-4 border-neutral-800">
        <ol class="grid grid-cols-1 space-y-4 gap-x-4">
          <li class="p-4 border rounded-md border-zinc-700">
            <span class="font-medium text-main">
              Step 1: Gather initial system information
            </span>
            <p>
              The system needs to have each resources total instances, an allocation matrix, and a max matrix. Both the
              available vector and the need matrix can be calculated from the values above if not provided.
            </p>
          </li>
          <li class="p-4 border rounded-md border-zinc-700">
            <span class="font-medium text-main">
              Step 2: Calculate the available vector and the need matrix
            </span>
            <p class="mb-4">
              To calculate the available matrix, sum up all of the allocated resources of each resource type, then
              subtract each of the values from their corresponding resource types' total instance. Then, for each
              process <span class="italic">i</span> and resource <span class="italic">j</span>, use the allocation and
              max matries to calculate the need matrix with:
            </p>
            <p class="font-mono italic text-center">
              Need[i][j] = Max[i][j] - Allocation[i][j]
            </p>
          </li>
          <li class="p-4 border rounded-md border-zinc-700">
            <span class="font-medium text-main">
              Step 3: Find a valid process
            </span>
            <p>
              Take the first process from the list of processes which is not yet finished, and check to see if all
              resources in the need for this process are less than or equal to the available vector.
            </p>
          </li>
          <li class="p-4 border rounded-md border-zinc-700">
            <span class="font-medium text-main">
              Step 4: Simulate the process finishing
            </span>
            <p>
              If such a process is found, add each of the resources that were allocated to it back to the available
              vector respectively. Mark this process as finished, add it to the safe sequence, and repeat step 4.
            </p>
          </li>
          <li class="p-4 border rounded-md border-zinc-700">
            <span class="font-medium text-main">
              Step 5: Determine safe or unsafe state
            </span>
            <p>
              If all of the processes are marked as finished, then the system is in a safe state when the algorithm
              began. The safe sequence shows the order in which the processes can run until they're completed. However,
              if no process can be found in step 4, and, not all of the processes are marked as finished, the system is
              in an unsafe state and deadlock may occur.
            </p>
          </li>
        </ol>
        <Figure src="/algorithms/deadlock-management/bankers-algorithm/bankers-algorithm.svg"
          caption="Banker's Algorithm Overview">
        </Figure>
        <h2 class="mb-4 text-xl font-semibold">
          Step by step illustration
        </h2>
        <hr class="mb-4 border-neutral-800">
        <form ref="form" class="w-full mb-10 space-y-4 gap-x-4">
          <!-- Total resource instances -->
          <p class="font-medium">Total Resource Instances:</p>
          <div class="mb-10 overflow-x-scroll">
            <table>
              <thead>
                <tr>
                  <th v-for="resourceNumber in resourceInstances.length">
                    <div class="flex items-center gap-x-2">
                      <span>R{{ resourceNumber }}</span>
                      <div v-if="resourceInstances.length > 1"
                        class="flex items-center justify-center duration-100 border border-transparent rounded-md cursor-pointer bg-zinc-700 aspect-square w-7 group hover:border-rose-600 active:translate-y-1"
                        @click="removeResource(resourceNumber - 1)">
                        <Icon class="text-rose-500" tag="span" size="20px">
                          <Trash></Trash>
                        </Icon>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td v-for="pos in resourceInstances.length">
                    <input type="number" min="1" :max="maxResources" required v-model="resourceInstances[pos - 1]">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex items-end justify-end gap-x-2">
            <button class="btn" type="button" :disabled="maxMatrix.length === processLimit"
              :class="{ 'disabled': maxMatrix.length === processLimit }" @click="addProcess">
              Add Process
            </button>
            <button class="btn" type="button" :disabled="maxMatrix.length === resourceLimit"
              :class="{ 'disabled': resourceInstances.length === resourceLimit }" @click="addResource">
              Add Resource
            </button>
          </div>
          <div class="flex flex-col gap-x-4 xl:flex-row gap-y-10">
            <!-- Allocation Matrix -->
            <div class="w-full overflow-x-scroll xl:w-1/2">
              <div class="w-full p-2 sm:-mb-2 sm:border sm:bg-zinc-800 sm:border-zinc-700 sm:rounded-t-md">
                <h3 class="font-medium sm:mb-2 sm:text-center">
                  Allocation
                </h3>
              </div>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th v-for="index in resourceInstances.length">R{{ index }}</th>
                    <th v-if="allocationMatrix.length > 1"></th>
                  </tr>
                </thead>
                <tbody class="highlight-first-column">
                  <tr v-for="(vector, outerIndex) in allocationMatrix">
                    <td>P{{ outerIndex + 1 }}</td>
                    <td v-for="(_, innerIndex) in vector">
                      <input type="number" min="0" :max="maxResources" required
                        v-model="allocationMatrix[outerIndex][innerIndex]">
                    </td>
                    <td class="w-20" v-if="allocationMatrix.length > 1">
                      <div
                        class="flex items-center justify-center duration-100 border border-transparent rounded-md cursor-pointer bg-zinc-700 aspect-square w-7 group hover:border-rose-600 active:translate-y-1"
                        @click="removeProcess(outerIndex)">
                        <Icon class="text-rose-500" tag="span" size="20px">
                          <Trash></Trash>
                        </Icon>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Max Matrix -->
            <div class="w-full overflow-x-scroll xl:w-1/2">
              <div class="w-full p-2 sm:-mb-2 sm:border sm:bg-zinc-800 sm:border-zinc-700 sm:rounded-t-md">
                <h3 class="font-medium sm:mb-2 sm:text-center">
                  Max
                </h3>
              </div>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th v-for="index in resourceInstances.length">R{{ index }}</th>
                    <th v-if="maxMatrix.length > 1"></th>
                  </tr>
                </thead>
                <tbody class="highlight-first-column">
                  <tr v-for="(vector, outerIndex) in maxMatrix">
                    <td>P{{ outerIndex + 1 }}</td>
                    <td v-for="(_, innerIndex) in vector">
                      <input type="number" min="0" :max="maxResources" required
                        v-model="maxMatrix[outerIndex][innerIndex]">
                    </td>
                    <td class="w-20" v-if="maxMatrix.length > 1">
                      <div
                        class="flex items-center justify-center duration-100 border border-transparent rounded-md cursor-pointer bg-zinc-700 aspect-square w-7 group hover:border-rose-600 active:translate-y-1"
                        @click="removeProcess(outerIndex)">
                        <Icon class="text-rose-500" tag="span" size="20px">
                          <Trash></Trash>
                        </Icon>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <button type="submit" class="btn" @click.prevent="runAlgorithm">Run Algorithm</button>
        </form>

        <h1 class="mb-4 text-xl font-semibold">
          Results
        </h1>
        <hr class="mb-4 border-neutral-800">
        <div class="flex flex-col gap-y-16" v-if="hasAlgorithmBeenRan">
          <Need :number-of-resources="resourceInstances.length" :need-matrix="needMatrix"></Need>
          <BankerSimulation :process-log="processLog" :number-of-processes="allocationMatrix.length"></BankerSimulation>
          <SafeSequence :formatted-safe-sequence="formattedSafeSequence" :is-system-in-safe-state="isSystemInSafeState">
          </SafeSequence>
        </div>
        <EmptySpace v-else>
          <p class="mb-4">
            No results to display yet, try running the algorithm...
          </p>
          <button @click.prevent="() => runAlgorithm(parameters)" class="btn">
            Run Algorithm
          </button>
        </EmptySpace>
      </div>
    </section>
  </main>
</template>

<script setup>
import BankerSimulation from '@/components/algorithms/deadlock-management/bankers-algorithm/bankers-simulation/BankerSimulation.vue';
import Need from '@/components/algorithms/deadlock-management/bankers-algorithm/Need.vue';
import SafeSequence from '@/components/algorithms/deadlock-management/bankers-algorithm/SafeSequence.vue';
import Alert from '@/components/general/Alert.vue';
import EmptySpace from '@/components/general/EmptySpace.vue';
import Figure from '@/components/general/Figure.vue';
import { Trash } from '@vicons/tabler';
import { Icon } from '@vicons/utils';
import { computed, reactive, ref, watch } from 'vue';

// Given values
const resourceInstances = reactive([10, 5, 7]);
const allocationMatrix = reactive([
  [0, 1, 0],
  [2, 0, 0],
  [3, 0, 2],
  [2, 1, 1],
  [0, 0, 2],
]);
const maxMatrix = reactive([
  [7, 5, 3],
  [3, 2, 2],
  [9, 0, 2],
  [2, 2, 2],
  [4, 3, 3],
]);

// Values given by the algorithm
const needMatrix = reactive([]);
const processLog = reactive([]);
const safeSequence = reactive([]);
const isSystemInSafeState = ref(false);

// Generic refs
const form = ref(null);
const hasAlgorithmBeenRan = ref(false);

// Computed values
const formattedSafeSequence = computed(() => {
  const result = safeSequence.slice().map((p) => `P${p + 1}`);
  while (result.length < needMatrix.length) {
    result.push('-');
  }
  return result;
});

const numberOfProcesses = computed(() => allocationMatrix.length);

// Constants
const processLimit = 6;
const resourceLimit = 4;
const maxResources = 20;

const resetResults = () => {
  needMatrix.length = 0;
  processLog.length = 0;
  safeSequence.length = 0;
  hasAlgorithmBeenRan.value = false;
};

watch(resourceInstances, resetResults);
watch(allocationMatrix, resetResults);
watch(maxMatrix, resetResults);

const addProcess = () => {
  resetResults();
  const newProcessVector = new Array(resourceInstances.length).fill(0);
  allocationMatrix.push(newProcessVector);
  maxMatrix.push(newProcessVector);
};

const addResource = () => {
  // Calculate the maximum value each resource allocation can be
  const maximumRandomVal = Math.floor(maxResources / numberOfProcesses.value);

  // Total resources available should be greater than or equal to total allocated resources
  let resourceInstance = Math.floor(Math.random() * 3);
  for (let i = 0; i < numberOfProcesses.value; i++) {
    // Get the random allocation
    const randAlloc = Math.floor(Math.random() * maximumRandomVal);
    resourceInstance += randAlloc;
    // The max is greater than (maximum by 3) or equal to alloc
    const randIncrement = Math.floor(Math.random() * 3);
    const max = randAlloc + randIncrement;

    allocationMatrix[i].push(randAlloc);
    maxMatrix[i].push(max);
  }

  // Ensure that the total does not exceed the max
  resourceInstance = resourceInstance > maxResources ? maxResources : resourceInstance;
  resourceInstances.push(resourceInstance);
};

const removeProcess = (index) => {
  resetResults();
  allocationMatrix.splice(index, 1);
  maxMatrix.splice(index, 1);
};

const removeResource = (index) => {
  for (let i = 0; i < numberOfProcesses.value; i++) {
    allocationMatrix[i].splice(index, 1);
    maxMatrix[i].splice(index, 1);
  }
  resourceInstances.splice(index, 1);
};

const runAlgorithm = () => {
  const isFormValid = form.value.checkValidity();
  if (!isFormValid) return form.value.reportValidity();

  // Calculate total allocations per resource
  const totalAllocations = Array(resourceInstances.length).fill(0);
  allocationMatrix.forEach(process => {
    process.forEach((val, idx) => {
      totalAllocations[idx] += val;
    });
  });

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
      finished: new Set(finished),
      need: need?.slice() ?? null,
      available: available?.slice() ?? null,
      allocation: allocation?.slice() ?? null,
      canRun,
    });
  };

  // Calculate available resources
  const available = resourceInstances.map((total, idx) => total - totalAllocations[idx]);

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
      const canRun = !isFinished && curNeed.every((need, j) => need <= available[j]);
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
        available: availableCopy,
        allocation: curAllocation,
        canRun,
      });
    }
  }
  isSystemInSafeState.value = finished.size === needMatrix.length;
  hasAlgorithmBeenRan.value = true;
};
</script>