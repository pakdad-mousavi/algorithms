<template>
  <div>
    <h1 class="mb-4 text-2xl font-semibold">
      First Come First Serve Algorithm (FCFS)
    </h1>
    <hr class="mb-4 border-neutral-800">
    <div class="mb-10 space-y-4">
      <p>
        The <span class="text-main">first come first serve</span> is one of the simplest CPU scheduling algorithms,
        providing a straightforward way for the CPU to handle incoming processes.
      </p>
      <p>
        As the name suggests, processes that arrive and enter the ready queue first, will be processed first.
        However, unlike the <span class="text-main">round robin algorithm</span>, the CPU will be allocated entirely
        to that process until it is fully executed and completed. Only then will the CPU move on to the next process
        in the ready queue. FCFS is generally suitable for systems where the processes are short and arrive at
        regular intervals.
      </p>
      <p>
        However, although this is a much simpler algorithm to implement and also to understand, it may lead to
        longer wait times for shorter processes if a longer one arrives first. This is commonly known as the
        <span class="text-main">Convoy Effect</span>, and it may lead to poor processing times in terms of average
        <span class="text-main">waiting times</span>.
      </p>
      <p>
        Here's a simple analogy: the queue in front of the cashier. Customers with a basket containing a few items
        will be forced to wait a long time, until the customer with a trolley worth of groceries in front of them
        finishes scanning all their items at the cashier.
      </p>
      <p>
        Regardless of the shortcomings of the FCFS algorithm, it is still one of the most well known methods and can
        provide a base for comparision against other algorithms.
      </p>
      <Figure src="/algorithms/cpu-scheduling/fcfs/customer-analogy.svg" caption="FCFS Customer Queue Analogy">
      </Figure>
      <h1 class="mb-4 text-xl font-semibold">
        Understanding the Process
      </h1>
      <hr class="mb-4 border-neutral-800">
      <ol class="grid grid-cols-1 space-y-4 gap-x-4">
        <li class="p-4 border rounded-md border-zinc-700">
          <span class="font-medium text-main">
            Step 1: Gather process info
          </span>
          <p>
            Each process is given an arrival time (when it enters the queue) and a burst time (how long it needs the
            CPU). The algorithm will be charged with running these processes one by one.
          </p>
        </li>
        <li class="p-4 border rounded-md border-zinc-700">
          <span class="font-medium text-main">
            Step 2: Sort by arrival time
          </span>
          <p>
            The processes are sorted in the order they arrive. FCFS is all about who comes first, no jumping the
            line and no interruptions. By sorting the processes, it is clear in which order to run the processes.
          </p>
        </li>
        <li class="p-4 border rounded-md border-zinc-700">
          <span class="font-medium text-main">
            Step 3: Execute each process one by one
          </span>
          <p>
            The CPU starts at time 0. The first process in the sorted list gets the CPU right away, and the rest of
            the processes must wait until the process in the CPU is entirely executed. Once the process is
            completed, the next process leaves the queue and enters the process.
          </p>
        </li>
        <li class="p-4 border rounded-md border-zinc-700">
          <span class="font-medium text-main">
            Step 4: Calculate start and finish times
          </span>
          <p>
            For each process, record when it started and when it finished based on the burst times and the current
            time. These are important for later calculating the waiting time and turnaround times of the processes.
          </p>
        </li>
        <li class="p-4 border rounded-md border-zinc-700">
          <span class="font-medium text-main">
            Step 5: Compute turnaround and waiting times
          </span>
          <p>
            Turnaround time = Finish time - Arrival time.
          </p>
          <p>
            Waiting time = Turnaround time - Burst time.
          </p>
          <p>
            These help evaluate how efficient the scheduling was.
          </p>
        </li>
      </ol>
      <Figure src="/algorithms/cpu-scheduling/fcfs/fcfs-scheduling-algorithm.svg" caption="FCFS Scheduling Algorithm">
      </Figure>
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
            <button class="btn" type="button" @click.prevent="addRow" :disabled="processData.length === processLimit"
              :class="{ 'disabled': processData.length === processLimit }">
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
                <td class="flex items-center">
                  <span>
                    P{{ index + 1 }}
                  </span>
                </td>
                <td><input type="number" min="0" max="10" required v-model="process[0]"></td>
                <td><input type="number" min="1" max="20" required v-model="process[1]"></td>
                <td class="w-20 mx-auto text-center">
                  <div v-if="processData.length > 1"
                    class="flex items-center justify-center duration-100 border border-transparent rounded-md cursor-pointer bg-zinc-700 aspect-square w-7 group hover:border-rose-600 active:translate-y-1"
                    @click="removeRow(index)">
                    <Icon class="text-rose-500" tag="span" size="20px">
                      <Trash></Trash>
                    </Icon>
                  </div>
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
  </div>
</template>

<script setup>
import Figure from '@/components/general/Figure.vue';
import { Trash } from '@vicons/tabler';
import { Icon } from '@vicons/utils';
import { ref, reactive, computed } from 'vue';
import GanttChart from '@/components/algorithms/cpu-scheduling/GanttChart.vue';
import ProcessDetails from '@/components/algorithms/cpu-scheduling/ProcessDetails.vue';
import EmptySpace from '@/components/general/EmptySpace.vue';
import { useScheduler } from '../../../composables/useScheduler';

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