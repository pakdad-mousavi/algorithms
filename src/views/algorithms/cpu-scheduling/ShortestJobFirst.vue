<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          <span class="text-main">Shortest Job First (SJF) Scheduling</span> is an algorithm used by systems to
          schedule the order by which processes are ran by the CPU. As the name suggests, the processes which require
          the shortest amount of time to complete (lowest burst time) are the ones which will be ran first.
        </p>
        <p>
          Prior knowledge of the <span class="cursor-pointer text-main"
            @click="$router.push('/cpu-scheduling/priority')">priority scheduling algorithm</span> is recommended, as
          SJF scheduling works exactly like priority scheduling, with the exception that the priority given to processes
          is based on their <span class="text-main">burst time.</span>
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          How the Algorithm Works
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          SJF scheduling uses a priority queue internally to keep track of which processes to run first. The only
          difference is that processes do not get an individual priority, but rather their priority is dependent on
          their burst time.
        </p>
        <p>
          Consider the following processes. For simplicity, it is assumed that all of them arrive at the same time:
        </p>
        <table>
          <thead>
            <tr>
              <th>Process ID:</th>
              <th>Burst Time:</th>
              <th>Priority (based on burst time):</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>P1</td>
              <td>8</td>
              <td>2</td>
            </tr>
            <tr>
              <td>P2</td>
              <td>9</td>
              <td>3</td>
            </tr>
            <tr>
              <td>P3</td>
              <td>3</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
        <p>
          As shown, process 2 (P2) has the highest burst time, therefore it gets the lowest priority (3). On the other
          hand, process 1 (P1) has the lowest burst time, therefore it gets the highest priority (1).
        </p>
        <p>
          The following diagram shows how these processes would be placed inside of the priority queue:
        </p>
        <Figure src="/algorithms/cpu-scheduling/sjf/items-entering-priority-queue.svg"
          caption="How Items Enter a Priority Queue" class="max-w-2xs"></Figure>
        <Alert alertStyle="note">
          <div class="space-y-4">
            <p>
              This algorithm is considered to be one of the best in terms of waiting time, however it requires knowledge
              of each process's burst time in advanced; this isn't always possible in real-world systems.
            </p>
            <p>
              The algorithm may also cause <span class="text-main">starvation</span>: longer processes may never get
              picked if shorter ones keep arriving.
            </p>
          </div>
        </Alert>
        <p>
          The rest of the algorithm is identical to the <span class="text-main">first-come first-serve (FCFS)</span>
          algorithm, processes are taken out of the queue one by one and processed by the CPU until they are finished.
          If there are no more processes in the queue, the system is idle until another process needs to be executed.
        </p>
        <p>
          For an in-depth guide, see the <span class="cursor-pointer text-main"
            @click="$router.push('/cpu-scheduling/first-come-first-serve')">first-come first-serve (FCFS)
            algorithm</span>.
        </p>
      </div>
    </template>

    <template #[tabs.visualizer.id]>
      <div class="mb-10 space-y-4">
        <h1 class="mb-4 text-xl font-semibold">
          Step By Step Illustration
        </h1>
        <hr class="mb-4 border-neutral-800">
        <form ref="form" class="w-full space-y-4 gap-x-4">
          <div class="flex items-end gap-4">
            <div class="flex flex-wrap justify-end w-full gap-2">
              <button class="btn" type="button" @click.prevent="zeroOutArrivalTimes">
                Set All Arrival Times to Zero
              </button>
              <button class="btn" type="button" @click.prevent="addRow" :disabled="processData.length === processLimit">
                Add Row
              </button>
            </div>
          </div>
          <div class="overflow-x-scroll">
            <table>
              <thead>
                <tr>
                  <th>Process</th>
                  <th>Arrival Time</th>
                  <th>Burst Time</th>
                  <th></th>
                </tr>
              </thead>
              <tbody class="highlight-first-column">
                <tr v-for="(process, index) in processData" :key="index">
                  <td>
                    P{{ index + 1 }}
                  </td>
                  <td><input type="number" min="0" max="10" required v-model="process[0]"></td>
                  <td><input type="number" min="1" max="20" required v-model="process[1]"></td>
                  <td class="w-20 mx-auto text-center">
                    <TrashButton @click="removeRow(index)" v-if="processData.length > 1"></TrashButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button @click.prevent="() => runAlgorithm(parameters)" class="btn" type="submit">
            Run Algorithm
          </button>
        </form>
        <GanttChart v-if="hasAlgorithmBeenRan" :process-log="processLog" :queue-log="groupedQueueLog" :quantum="1">
        </GanttChart>
        <ProcessDetails v-if="hasAlgorithmBeenRan" :process-data="processData" :finished-processes="finishedProcesses">
        </ProcessDetails>
        <EmptySpace v-else>
          <p class="mb-4">
            No results to display yet, try running the algorithm...
          </p>
          <button @click.prevent="() => runAlgorithm(parameters)" class="btn">
            Run Algorithm
          </button>
        </EmptySpace>
      </div>
    </template>
  </TabSwitcher>
</template>

<script setup>

import Figure from '@/components/general/Figure.vue';
import { ref, reactive, computed } from 'vue';
import GanttChart from '@/components/algorithms/cpu-scheduling/GanttChart.vue';
import ProcessDetails from '@/components/algorithms/cpu-scheduling/ProcessDetails.vue';
import EmptySpace from '@/components/general/EmptySpace.vue';
import Alert from '@/components/general/Alert.vue';
import { useScheduler } from '../../../composables/useScheduler';
import { tabs } from '@/state/tabState';
import TabSwitcher from '@/components/TabSwitcher.vue';
import TrashButton from '@/components/general/TrashButton.vue';

// Reactive variables and constants
const form = ref(null);
const processData = reactive([
  [0, 4],
  [0, 6],
  [0, 4],
  [0, 5]
]);
const hasAlgorithmBeenRan = ref(false);
const processLimit = 6;

// Compute runtime processes
const runtimeProcesses = computed(() => {
  let id = 1;
  return processData.slice().map((p) => [id++, ...p, p[1]]);
});

// Compute parameters for runAlgorithm
const parameters = computed(() => {
  const sortFn = (a, b) => a[2] - b[2];

  return {
    runtimeProcesses,
    form,
    hasAlgorithmBeenRan,
    sortFn
  };
});

// Get respective functions and results from scheduler
const {
  runAlgorithm,
  resetAlgorithmResults,
  queueLog,
  processLog,
  finishedProcesses
} = useScheduler();

// Group the queuelog based on the time of each log
const groupedQueueLog = computed(() => {
  const grouped = Object.groupBy(queueLog, (log) => log[0]);
  return Object.values(grouped);
});

// Helper table object
const addRow = () => {
  // Reset algorithm
  resetAlgorithmResults(hasAlgorithmBeenRan);
  // Add new row
  const lastItem = processData[processData.length - 1];
  const newItem = [lastItem[0] + 1, Math.round(Math.random() * 10)];
  processData.push(newItem);
}

const removeRow = (rowIndex) => {
  resetAlgorithmResults(hasAlgorithmBeenRan);
  processData.splice(rowIndex, 1);
}

const zeroOutArrivalTimes = () => {
  processData.forEach(process => {
    process[0] = 0;
  });
}
</script>