<template>
  <main class="p-4 space-y-4 text-neutral-300">
    <section class="p-4 rounded-xl bg-zinc-900">
      <div class="mx-auto sm:w-11/12">
        <h1 class="mb-4 text-2xl font-semibold">
          Shortest Job First Scheduling
        </h1>
        <hr class="mb-4 border-neutral-800">
        <div class="mb-10 space-y-4">
          <p>
            <span class="text-main">Shortest Job First (SJF) Scheduling</span> is an algorithm used by systems to
            schedule the order by which processes are ran by the CPU. As the name suggests, the processes which require
            the shortest amount of time to complete (lowest burst time) are the ones which will be ran first.
          </p>
          <Alert alert-style="warning">
            <p>
              This is a non-preemptive version of this algorithm, meaning that processes are not interrupted until they
              are completed, similar to how the first come first serve (FCFS) algorithm works. The latter is known as
              <span class="text-main">Shortest Remaining Time First (SRTF)</span> where a running process can be
              interrupted if a shorter one arrives.
            </p>
          </Alert>
          <p>
            This algorithm is considered to be one of the best in terms of waiting time, however it requires knowledge
            of each process's burst time in advanced; this isn't always possible in real-world systems. This algorithm
            may also cause <span class="text-main">starvation:</span> longer processes may never get picked if shorter
            ones keep arriving.
          </p>
          <p>
            Regardless of the drawbacks, this algorithm reduces the average waiting time better than the <span
              class="text-main">First Come First Serve (FCFS)</span> algorithm in many cases, making it a simple and
            useful way of scheduling processes in a system.
          </p>
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
                long the process needs). No additional information, such as a priority, is needed.
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
                Step 4: Choose the shortest job from the queue
              </span>
              <p>
                If the CPU is idle and there are processes in the ready queue, select the one with the lowest burst time
                and begin processing it. If there are multiple processes with the same burst time, then the one which
                arrives first will be picked.
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
                Repeat step 5 until the entire process is completed. Once completed, the CPU is idle once again, ready
                for its next process.
              </p>
            </li>
            <li class="p-4 border rounded-md border-zinc-700">
              <span class="font-medium text-main">
                Step 7: Record completion time and update logs
              </span>
              <div>
                After a process finishes, record its completion time. From this, you can calculate:
                <ul class="list-disc list-inside">
                  <li>Turnaround Time = Completion Time - Arrival Time</li>
                  <li>Waiting Time = Turnaround Time - Burst Time</li>
                </ul>
              </div>
            </li>
            <li class="p-4 border rounded-md border-zinc-700">
              <span class="font-medium text-main">
                Step 8: Repeat step 3 to step 8 until all processes are finished
              </span>
              <p>
                Repeat all the steps stated for each process until the CPU is idle, and the ready queue is empty. For
                additional metrics, such as the waiting time and turnaround time, make sure to record the finish time of
                each process.
              </p>
            </li>
          </ol>
          <Figure src="/algorithms/cpu-scheduling/sjf/shortest-job-first.svg"
            caption="Shortest Job First Scheduling Algorithm">
          </Figure>
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
                <button class="btn" type="button" @click.prevent="addRow"
                  :disabled="processData.length === processLimit"
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
          <ProcessDetails v-if="hasAlgorithmBeenRan" :process-data="processData"
            :finished-processes="finishedProcesses"></ProcessDetails>
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
    </section>
  </main>
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