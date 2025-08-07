<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          The <span class="text-main">first come first serve</span> is one of the simplest CPU scheduling
          algorithms, providing a straightforward way for the CPU to handle incoming processes.
        </p>
        <p>
          As the name suggests, processes that arrive and enter the ready <span class="text-main">queue</span> first,
          will be processed first. To learn more about how a queue works, see the <span class="cursor-pointer text-main"
            @click="$router.push('/cpu-scheduling/round-robin')">round robin</span> algorithm.
        </p>
        <p>
          However, unlike the round robin algorithm, the CPU will be allocated entirely to that process until it is
          fully executed and completed. Only then will the CPU move on to the next process in the ready queue.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          How the Algorithm Works
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Like the round robin algorithm, FCFS relies on a queue to keep track of which processes to process first. The
          only difference is that FCFS does not have a <span class="text-main">time slice/quantum</span>, so it lets the
          process execute as long as it needs to.
        </p>
        <p>
          Consider the following processes:
        </p>
        <table>
          <thead>
            <tr>
              <th>Process ID:</th>
              <th>Arrival Time:</th>
              <th>Burst Time:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>P1</td>
              <td>0</td>
              <td>4</td>
            </tr>
            <tr>
              <td>P2</td>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr>
              <td>P3</td>
              <td>2</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
        <p>
          The <span class="text-main">arrival time</span> column tells us at what time a process enters the queue. The
          <span class="text-main">burst time</span> tells us the total time that process needs to be in the CPU before
          it is completed.
        </p>
        <p>
          To run the FCFS algorithm, a queue and CPU are needed:
        </p>
        <Figure src="/algorithms/cpu-scheduling/fcfs/queue-and-cpu.svg" class="max-w-xl"
          caption="An Example Empty Queue With 3 Slots, and an Empty CPU"></Figure>
        <p>
          Our clock starts at 0ms. At 0ms, process 1 (P1) arrives and enters the queue. Since the CPU is idle, the
          algorithm will pick P1 for processing:
        </p>
        <Figure src="/algorithms/cpu-scheduling/fcfs/0ms-example-state.svg" class="max-w-xl"
          caption="P1 Arrives and Enters Queue, Leaves the Queue, and Enters CPU for Processing"></Figure>
        <p>
          FCFS is <span class="text-main">non-preemptive</span>, so the CPU will not be interrupted until it has
          completed executing the process for the total duration of its burst time.
        </p>
        <p>
          At 1ms, P2 arrives and enters the queue:
        </p>
        <Figure src="/algorithms/cpu-scheduling/fcfs/1ms-example-state.svg" class="max-w-xl"
          caption="P2 Arrives and Enters Queue"></Figure>
        <p>
          At 2ms, P3 arrives and enters the queue (P1 is still being processed in the CPU):
        </p>
        <Figure src="/algorithms/cpu-scheduling/fcfs/2ms-example-state.svg" class="max-w-xl"
          caption="P3 Arrives and Enters Queue"></Figure>
        <p>
          At 3ms, no process arrives and the CPU is still processing P1 (P1 has a burst time of 4ms, so there is still
          1ms remaining), therefore no changes occur in the queue or CPU.
        </p>
        <p>
          At 4ms, P1 finishes processing and has been fully executed, therefore it no longer needs to go to the back of
          the queue. Once the CPU is idle, the next process is picked from the queue by the algorithm for processing:
        </p>
        <Figure src="/algorithms/cpu-scheduling/fcfs/4ms-example-state.svg" class="max-w-xl"
          caption="P1 Finishes Processing, and P2 Begins to Run"></Figure>
        <p>
          The algorithm continues to operate like this until there are no more processes remaining in the queue.
          Calculating additional metrics such as the <span class="text-main">turnaround time</span> and <span
            class="text-main">waiting time</span> use the same calculation stated in the round robin algorithm:
        </p>
        <p class="italic">
          Turnaround Time = Completion Time - Arrival Time
        </p>
        <p class="italic">
          Waiting Time = Turnaround Time - Burst Time
        </p>
      </div>
    </template>

    <template #[tabs.visualizer.id]>
      <div class="space-y-4">
        <h1 class="mb-4 text-xl font-semibold">
          Step by Step Illustration
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
import TabSwitcher from '@/components/TabSwitcher.vue';
import { tabs } from '@/state/tabState';
import Figure from '@/components/general/Figure.vue';
import { ref, reactive, computed } from 'vue';
import GanttChart from '@/components/algorithms/cpu-scheduling/GanttChart.vue';
import ProcessDetails from '@/components/algorithms/cpu-scheduling/ProcessDetails.vue';
import EmptySpace from '@/components/general/EmptySpace.vue';
import { useScheduler } from '../../../composables/use-scheduler';
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
  return {
    runtimeProcesses,
    form,
    hasAlgorithmBeenRan,
    sortFn: null,
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