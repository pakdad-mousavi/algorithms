<template>
  <div>
    <h1 class="mb-4 text-2xl font-semibold">
      Priority Scheduling (Non-Preemptive)
    </h1>
    <hr class="mb-4 border-neutral-800">
    <div class="mb-10 space-y-4">
      <p>
        <span class="text-main">Priority Scheduling</span> is a CPU scheduling technique in which every process is
        assigned a priority value, and the CPU always executes the highest-priority process available at any given
        time.
      </p>
      <Alert :alert-style="'warning'">
        <p>
          This is a non-preemptive version of this algorithm, meaning that processes are not interrupted until they
          are completed, similar to how the first come first serve (FCFS) algorithm works.
        </p>
      </Alert>
      <p>
        Unlike algorithms like <span class="text-main">FCFS</span> or <span class="text-main">Round Robin</span>
        that rely on arrival time or time slicing for fair process distrbution, Priority Scheduling adds a layer of
        control, where processes in the queue are sorted based on which one is more important, allowing the system
        to control which processes run first.
      </p>
      <p>
        In most implementations, the priorities are given to processes in ascending order, meaning that a process
        with a priority of 1 is more important than a process with a priority of 3.
      </p>
      <!-- <Figure src="/algorithms/cpu-scheduling/fcfs/customer-analogy.svg" caption="FCFS Customer Queue Analogy">
          </Figure> -->
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
            Each process needs to have an arrival time (when the process enters the ready queue), a burst time (how
            long the process needs), and an assigned priority (how important the process is).
          </p>
        </li>
        <li class="p-4 border rounded-md border-zinc-700">
          <span class="font-medium text-main">
            Step 2: Track the current time
          </span>
          <p>
            Initialize the system clock (usually starting at 0). This value will increase in small steps, or 1ms for
            our case, to simulate real-time execution of the processes.
          </p>
        </li>
        <li class="p-4 border rounded-md border-zinc-700">
          <span class="font-medium text-main">
            Step 3: Check for new arrivals
          </span>
          <p>
            At each time step, check if any new processes have arrived (i.e., their arrival time matches the current
            time). Add those to the ready queue.
          </p>
        </li>
        <li class="p-4 border rounded-md border-zinc-700">
          <span class="font-medium text-main">
            Step 4: Pick the highest priority process
          </span>
          <p>
            If the CPU is idle and there are processes in the ready queue, select the one with the highest priority
            (lowest number). Note that if multiple processes have the same priority, then the one that arrived first
            will be chosen by the CPU.
          </p>
        </li>
        <li class="p-4 border rounded-md border-zinc-700">
          <span class="font-medium text-main">
            Step 5: Run the process for 1ms (or 1 unit)
          </span>
          <p>
            Run the process for 1ms, then repeat step 3 to add any processes that may have arrived to the ready
            queue. This is to ensure that the queue is up to date.
          </p>
        </li>
        <li class="p-4 border rounded-md border-zinc-700">
          <span class="font-medium text-main">
            Step 6: Run the process until completed
          </span>
          <p>
            Repeat step 5 until the entire process is completed. This is the non-preemptive version of the
            algorithm, so there will be no interrupts; the process is fully executed.
          </p>
        </li>
        <li class="p-4 border rounded-md border-zinc-700">
          <span class="font-medium text-main">
            Step 7: Repeat step 3 to step 7 until all processes are finished
          </span>
          <p>
            Repeat all the steps stated for each process until the CPU is idle, and the ready queue is empty. For
            additional metrics, such as the waiting time and turnaround time, make sure to record the finish time of
            each process.
          </p>
        </li>
      </ol>
      <Figure src="/algorithms/cpu-scheduling/priority/priority-scheduling.svg" caption="Priority Scheduling Algorithm">
      </Figure>
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
                <th>Priority</th>
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
                <td><input type="number" min="1" max="10" required v-model="process[2]"></td>
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
import Alert from '@/components/general/Alert.vue';
import { useScheduler } from '../../../composables/useScheduler';

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