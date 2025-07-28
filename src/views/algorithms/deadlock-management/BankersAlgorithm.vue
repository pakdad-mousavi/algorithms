<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
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
          In operating systems, a <span class="text-main">deadlock</span> occurs when multiple processes are waiting for
          resources that are held by each other. The processes are both holding the resources the other needs, and
          waiting for the other process to release their resources (which never happens since both sides are waiting).
        </p>
        <p>
          Consider the following illustration:
        </p>
        <Figure src="/algorithms/deadlock-management/bankers-algorithm/deadlock.svg" caption="An Example of a Deadlock"
          class="max-w-xl"></Figure>
        <p>
          Process A is using resource A, while process B is using resource B. Process A needs resource B to complete its
          own task, so it waits for process B to finish using resource B. However, process B needs resource A to do its
          job, so it also starts waiting for process A to finish its tasks.
        </p>
        <p>
          Both processes are now waiting for one another. This situation is known as a <span
            class="text-main">deadlock</span>.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          What is the Banker's Algorithm?
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          The banker's algorithm is a prevention technique used to avoid deadlocks, rather than letting them occur and
          then trying to resolve them.
        </p>
        <p>
          Lets look at a real-world analogy to use the algorithm in. Imagine that you have a bag with a limited number
          of toys inside, and 3 picky children that want to play with the toys.
        </p>
        <Figure src="/algorithms/deadlock-management/bankers-algorithm/toy-analogy.svg" class="max-w-xl"
          caption="A Toy Analogy for the Banker's Algorithm"></Figure>
        <p>
          Each child wants to play with the toys they like, and if more than one child wants the same toy, they don't
          share. Instead they wait until the toy is free to play with. Once all of the toys they want are available,
          they begin playing.
        </p>
        <p>
          We know what each child wants before they start playing, and we know what each child has:
        </p>
        <Figure src="/algorithms/deadlock-management/bankers-algorithm/initial-toy-snapshot.svg" class="max-w-xl"
          caption="The Toys Each Child Has and Wants"></Figure>
        <p>
          The algorithm tries to give the toys each child wants one by one. If it passed over all 3 children for a full
          turn without give any toys, it means a deadlock has occurred.
        </p>
        <p>
          Child A has a circle toy, but needs a star toy which we don't have in our bag, so we skip this child for now.
          Child B wants a triangle and square toy, which we have! So we give the toys, wait for him to stop playing,
          then take the toys back:
        </p>
        <Figure src="/algorithms/deadlock-management/bankers-algorithm/toy-allocation-1.svg" class="max-w-xl"
          caption="Fulfill Child B's Toy Wants"></Figure>
        <p>
          Now we only have two children left, plus an additional star toy which child B was holding on to.
        </p>
        <p>
          Moving on, child C wants a square, triangle, and circle toy to play with, however the only circle toy is
          occupied by child A, so we skip the child and begin our second toy run.
        </p>
        <p>
          Child A wants a star toy, so we give the star toy, wait, then take all of their toys back. The only child left
          is child C, which gets a square, triangle and circle toy to play with:
        </p>
        <Figure src="/algorithms/deadlock-management/bankers-algorithm/toy-allocation-2.svg" class="max-w-md"
          caption="Fulfill Child A's Toy Wants"></Figure>
        <p>
          We then fulfill child C's toy wants, and finally, there are no more children left. Since we could find a valid
          order in which each child got to play with the toys they wanted (known formally as a <span
            class="text-main">safe sequence</span>), we can conclude that it is possible to avoid deadlocks.
        </p>
        <p>
          Now lets say child B wanted a circle toy, instead of a square toy:
        </p>
        <Figure src="/algorithms/deadlock-management/bankers-algorithm/toy-deadlock.svg" class="max-w-xl"
          caption="An Toy Deadlock Amongst the Children"></Figure>
        <p>
          Quickly we can see, that we cannot fulfill the needs of any child. Child A has a circle and is waiting for
          child B's star, and child B has a star and is waiting for child A's circle; a deadlock has occurred.
        </p>
        <Alert alertStyle="note">
          <div class="space-y-4">
            <p>
              The actual banker's algorithm runs exactly like this toy analogy, with the exception that it doesn't know
              how many of each resource (toy) each process (child) wants. Instead, it only knows the maximum number of
              resources a process could possibly request for.
            </p>
            <p>
              To solve this, it uses a <span class="text-main">need</span> value instead of the number of resources the
              process wants. The need value is the worst-case scenario value, where the process requests for all of the
              resources it can.
            </p>
          </div>
        </Alert>
        <h2 class="mt-10 text-xl font-semibold">
          How the Algorithm Works
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          The algorithm is used in two ways: to check whether the system is currently in a <span class="text-main">safe
            state</span> (where its possible to allocate resources to all process in some order to avoid deadlock), and
          also to make sure there are enough resources to allocate when a new process requests access to a resource.
        </p>
        <Figure src="/algorithms/deadlock-management/bankers-algorithm/using-the-algorithm.svg"
          caption="How the Banker's Algorithm Can Be Used" class="max-w-xl"></Figure>
        <p>
          To understand how the algorithm works, we will be using it to identify whether a system is in a safe state for
          the sake of simplicity.
        </p>
        <p>
          To begin, we need an example snapshot of a system. The system will have 3 resource types (R1, R2, R3). The
          following table states the total number of resource instances available for allocation:
        </p>
        <table>
          <thead>
            <tr>
              <th>R1</th>
              <th>R2</th>
              <th>R3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>8</td>
              <td>3</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>
        <p>
          The system will also have 3 running processes (P1, P2, P3):
        </p>
        <div class="flex flex-col gap-4 md:flex-row">
          <div class="w-full space-y-2 md:w-1/2">
            <h3 class="font-medium">Allocation:</h3>
            <table>
              <thead>
                <tr>
                  <th>Process</th>
                  <th>R1</th>
                  <th>R2</th>
                  <th>R3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>P1</td>
                  <td>0</td>
                  <td>1</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>P2</td>
                  <td>2</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>P3</td>
                  <td>3</td>
                  <td>0</td>
                  <td>2</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="w-full space-y-2 md:w-1/2">
            <h3 class="font-medium">Max:</h3>
            <table>
              <thead>
                <tr>
                  <th>Process</th>
                  <th>R1</th>
                  <th>R2</th>
                  <th>R3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>P1</td>
                  <td>7</td>
                  <td>5</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>P2</td>
                  <td>3</td>
                  <td>2</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>P3</td>
                  <td>9</td>
                  <td>0</td>
                  <td>2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p>
          The <span class="text-main">allocation</span> table states how many instances of each resource type are
          already allocated (given to) each process. The <span class="text-main">max</span> table states the maximum
          amount of each resource type that a process may request for.
        </p>
        <p>
          The algorithm's work starts here.
        </p>
        <p>
          First, it calculates the number of <span class="text-main">available</span> resources for each resource type.
          This is the number of resources currently available for allocation. The following calculation is used:
        </p>
        <p class="italic">Total Instances - Σ Allocated Resources = Available</p>
        <table>
          <thead>
            <tr>
              <th>R1</th>
              <th>R2</th>
              <th>R3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3</td>
              <td>2</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
        <p>
          It then calculates the <span class="text-main">need</span> for each of the process's resources. This is the
          largest amount of resources of each resource type that a process can request for. The calculation is:
        </p>
        <p class="italic">Max - Allocation = Need</p>
        <table>
          <thead>
            <tr>
              <th>Process</th>
              <th>R1</th>
              <th>R2</th>
              <th>R3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>P1</td>
              <td>7</td>
              <td>4</td>
              <td>3</td>
            </tr>
            <tr>
              <td>P2</td>
              <td>1</td>
              <td>2</td>
              <td>2</td>
            </tr>
            <tr>
              <td>P3</td>
              <td>6</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
        <p>
          Now, the algorithm can simulate allocating resources to each process until a <span class="text-main">safe
            sequence</span> (order in which processes run in order to avoid deadlocks) is found, just like the toy
          analogy.
        </p>
        <p>
          What if a safe sequence can't be found? Then the system is not in a safe state, and a deadlock has occurred.
        </p>
        <Alert alertStyle="note">
          <div class="space-y-4">
            <p>
              Note that after allocating resources to a process, the system waits until it finishes executing, and then
              takes back all of the resources the process was using, making them available for use by other processes.
            </p>
            <p>
              This is why the allocated resources of each process are added back to the available after a successful
              allocation attempt.
            </p>
          </div>
        </Alert>
        <p>
          To see a complete example of the banker's algorithm, see the algorithm visualizer on this page.
        </p>
      </div>
    </template>

    <template #[tabs.visualizer.id]>
      <h2 class="mb-4 text-xl font-semibold">
        Step by step illustration
      </h2>
      <hr class="mb-4 border-neutral-800">
      <form ref="form" class="w-full mb-10 space-y-4 gap-x-4">
        <!-- Total resource instances -->
        <div class="flex items-end">
          <p class="flex-1 font-medium">Resource Instances:</p>
          <button class="btn" type="button" :disabled="maxMatrix.length === resourceLimit" @click="addResource">
            Add Resource
          </button>
        </div>
        <div class="mb-10 overflow-x-scroll">
          <table>
            <thead>
              <tr>
                <th v-for="resourceNumber in resourceInstances.length">
                  <div class="flex items-center gap-x-2">
                    <span>R{{ resourceNumber }}</span>
                    <TrashButton @click="removeResource(resourceNumber - 1)" v-if="resourceInstances.length > 1">
                    </TrashButton>
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
        <div class="flex items-end sm:justify-end gap-x-2">
          <button class="btn" type="button" :disabled="maxMatrix.length === processLimit" @click="addProcess">
            Add Process
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
                    <TrashButton @click="removeProcess(outerIndex)">
                    </TrashButton>
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
                    <TrashButton @click="removeProcess(outerIndex)">
                    </TrashButton>
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
        <Need :number-of-resources="resourceInstances.length" :need-matrix="algResult.needMatrix"></Need>
        <BankerSimulation :process-log="algResult.processLog" :number-of-processes="allocationMatrix.length"
          :number-of-resources="resourceInstances.length">
        </BankerSimulation>
        <SafeSequence :formatted-safe-sequence="formattedSafeSequence"
          :is-system-in-safe-state="algResult.isSystemInSafeState">
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
    </template>
  </TabSwitcher>
</template>

<script setup>
import TabSwitcher from '@/components/TabSwitcher.vue';
import { tabs } from '@/state/tabState';
import BankerSimulation from '@/components/algorithms/deadlock-management/bankers-algorithm/bankers-simulation/BankerSimulation.vue';
import Need from '@/components/algorithms/deadlock-management/bankers-algorithm/Need.vue';
import SafeSequence from '@/components/algorithms/deadlock-management/bankers-algorithm/SafeSequence.vue';
import Alert from '@/components/general/Alert.vue';
import EmptySpace from '@/components/general/EmptySpace.vue';
import Figure from '@/components/general/Figure.vue';
import { runBankersAlgorithm } from '@/composables/bankers-algorithm';
import { computed, reactive, ref, toRaw, watch } from 'vue';
import TrashButton from '@/components/general/TrashButton.vue';

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
const algResult = reactive({
  needMatrix: [],
  processLog: [],
  safeSequence: [],
  isSystemInSafeState: false,
});

// Generic refs
const form = ref(null);
const hasAlgorithmBeenRan = ref(false);

// Computed values
const formattedSafeSequence = computed(() => {
  const result = algResult.safeSequence.slice().map((p) => `P${p + 1}`);
  while (result.length < algResult.needMatrix.length) {
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
  algResult.needMatrix.length = 0;
  algResult.processLog.length = 0;
  algResult.safeSequence.length = 0;
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

  const { needMatrix, safeSequence, isSafe, processLog } = runBankersAlgorithm({
    allocationMatrix: toRaw(allocationMatrix).map(row => row.slice()),
    maxMatrix: toRaw(maxMatrix).map(row => row.slice()),
    resourceInstances: toRaw(resourceInstances).slice()
  });

  // Update respective properties and references
  algResult.needMatrix = needMatrix;
  algResult.safeSequence = safeSequence;
  algResult.isSystemInSafeState = isSafe;
  algResult.processLog = processLog;
  hasAlgorithmBeenRan.value = true;
};
</script>