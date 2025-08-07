<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          <span class="text-main">Priority Scheduling</span> is a CPU scheduling technique in which every process is
          assigned a priority value, and the CPU always executes the highest-priority process available at any given
          time.
        </p>
        <p>
          It works exactly like the <span class="cursor-pointer text-main"
            @click="$router.push('/cpu-scheduling/first-come-first-serve')">first come first serve (FCFS)</span>
          algorithm, with the exception that it uses a <span class="text-main">priority queue</span> rather than a
          standard queue.
        </p>
        <p>
          Prior knowledge about the FCFS algorithm is needed for this algorithm. To learn more, see the <span
            class="cursor-pointer text-main" @click="$router.push('/cpu-scheduling/first-come-first-serve')">first come
            first serve (FCFS)</span> algorithm.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          How a Priority Queue Works
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          A priority queue works similarly to a queue, however, it relies on a given priority field (which each item
          has) to determine which item, or process, comes first in the queue.
        </p>
        <p>
          Consider the following processes, each with a unique <span class="text-main">priority</span>. For the sake of
          brevity, all processes are assumed to have no <span class="text-main">arrival time</span>, so that they all
          arrive in the order defined:
        </p>
        <table>
          <thead>
            <tr>
              <th>Process ID:</th>
              <th>Burst Time:</th>
              <th>Priority:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>P1</td>
              <td>4</td>
              <td>3</td>
            </tr>
            <tr>
              <td>P2</td>
              <td>2</td>
              <td>1</td>
            </tr>
            <tr>
              <td>P3</td>
              <td>3</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
        <p>
          The following diagram depicts an empty priority queue:
        </p>
        <Figure src="/algorithms/cpu-scheduling/priority/empty-priority-queue.svg" class="max-w-xs"
          caption="An Empty Priority Queue"></Figure>
        <p>
          As processes arrive and need to enter the queue, they are placed in the queue based on their priority. Similar
          to how VIPs can skip the queue at a fancy restaurant, processes with a higher priority are placed ahead of the
          ones with a lower priority.
        </p>
        <Alert alertStyle="note">
          <p>
            Processes with a lower priority value are considered to have a higher priority than processes with higher
            priority values. For example, P2 (with a priority of 1) has a higher priority than (P1). The lower the
            priority value, the higher the priority.
          </p>
        </Alert>
        <Figure src="/algorithms/cpu-scheduling/priority/items-entering-priority-queue.svg" class="max-w-xs"
          caption="P1 to P3 Entering the Priority Queue"></Figure>
        <p>
          When it comes to removing processes from the priority queue, the process with the highest priority is removed
          first:
        </p>
        <Figure src="/algorithms/cpu-scheduling/priority/items-leaving-priority-queue.svg" class="max-w-xl"
          caption="P2 Leaving the Priority Queue"></Figure>
        <h2 class="mt-10 text-xl font-semibold">
          How the Algorithm Works
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          The algorithm itself works exactly like the first come first serve algorithm, with the exception that it uses
          a priority queue to keep track of which processes the CPU needs to run first.
        </p>
        <p>
          Processes are also given a priority so that the priority queue can determine where in the list of processes to
          insert the newly arrived process. Also note that if multiple processes have the same priority, then they will
          enter the queue based on the order in which they arrive.
        </p>
        <p>
          To learn about how exactly the first come first serve (FCFS) algorithm operates, see the <span
            class="cursor-pointer text-main" @click="$router.push('/cpu-scheduling/first-come-first-serve')">first come
            first serve (FCFS)</span> algorithm.
        </p>
      </div>
    </template>

    <template #[tabs.visualizer.id]>
      <div class="mb-10 space-y-4">
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
                  <th>Priority</th>
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
                  <td><input type="number" min="1" max="10" required v-model="process[2]"></td>
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
import TabSwitcher from '@/components/TabSwitcher.vue';
import { tabs } from '@/state/tabState';
import Figure from '@/components/general/Figure.vue';
import { ref, reactive, computed } from 'vue';
import GanttChart from '@/components/algorithms/cpu-scheduling/GanttChart.vue';
import ProcessDetails from '@/components/algorithms/cpu-scheduling/ProcessDetails.vue';
import EmptySpace from '@/components/general/EmptySpace.vue';
import Alert from '@/components/general/Alert.vue';
import { useScheduler } from '../../../composables/use-scheduler';
import TrashButton from '@/components/general/TrashButton.vue';

// Reactive variables and constants
const form = ref(null);
const processData = reactive([
  [0, 4, 1],
  [0, 6, 2],
  [0, 4, 3],
  [0, 5, 4]
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
  const sortFn = (a, b) => a[3] - b[3];

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
  resetAlgorithmResults();
  // Add new row
  const lastItem = processData[processData.length - 1];
  const newPriority = lastItem[2] + 1 <= 10 ? lastItem[2] + 1 : lastItem[2];
  const newItem = [lastItem[0] + 1, Math.round(Math.random() * 10), newPriority];
  processData.push(newItem);
}

const removeRow = (rowIndex) => {
  resetAlgorithmResults();
  processData.splice(rowIndex, 1);
}

const zeroOutArrivalTimes = () => {
  processData.forEach(process => {
    process[0] = 0;
  });
}
</script>