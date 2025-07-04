<template>
  <Transition>
    <div :key="tab">
      <!-- How it works -->
      <div v-if="tab === 'How It Works'" class="mb-10 space-y-4">
        <p>
          The <span class="text-main">Round Robin Algorithm</span> is a widely used CPU scheduling method,
          particularly effective in time-sharing systems. Its main objective is to allocate CPU time fairly among
          all
          running processes, ensuring that each one receives regular access to the processor.
        </p>
        <p>
          This method ensures that all processes are treated equally, preventing any single process from dominating
          the CPU. As a result, Round Robin is particularly suitable for systems that require good response times,
          such as interactive or multi-user environments.
        </p>
        <p>
          In this approach, each process is assigned a fixed unit of time, known as a <span class="text-main">time
            quantum</span> or <span class="text-main">time slice</span>. The CPU
          scheduler maintains a queue of ready processes and allows each one to execute for a duration equal to the
          time quantum. If a process finishes within this time, it releases the CPU. If it requires more time, it is
          paused after the quantum expires and placed at the end of the queue to wait for another turn.
        </p>

        <Figure src="/algorithms/cpu-scheduling/round-robin/round-robin.svg"
          caption="Round Robin CPU Scheduling Algorithm">
        </Figure>

        <Alert alertStyle="warning">
          <template v-slot>
            <div class="space-y-4">
              <p>
                This implementation of the round robin algorithm is biased towards arriving processes rather than
                completed processes. This means that if a process arrives and finishes at the same time, the process
                which has arrived will enter the queue first.
              </p>
              <p>
                Only after the arriving process(es) are added to the queue, will the finished process leave the CPU
                and
                go to the back of the queue.
              </p>
            </div>
          </template>
        </Alert>

        <p>
          Additional details may also be needed to measure the performance of each process in the operating
          system, such as <span class="text-main">waiting time</span> and <span class="text-main">turnaround
            time</span>.
        </p>
        <p>
          Waiting time is the total time that a process spends in the queue, and turnaround time is the total time
          taken from when a process arrives to when it completes execution. The following formulae are used to
          calculate each value respectively:
        </p>
        <div>
          <p class="inline-block px-4 py-1.5 border rounded-md bg-zinc-800 border-zinc-700">
            Turnaround Time = Completion Time - Arrival Time
          </p>
        </div>
        <div>
          <p class="inline-block px-4 py-1.5 border rounded-md bg-zinc-800 border-zinc-700">
            Waiting Time = Turnaround Time - Burst Time
          </p>
        </div>
      </div>

      <!-- Algorithm visualizer -->
      <div v-if="tab === 'Algorithm Visualizer'">
        <h1 class="mb-4 text-xl font-semibold">
          Step By Step Illustration
        </h1>
        <hr class="mb-4 border-neutral-800">
        <form ref="form" class="w-full space-y-4 gap-x-4">
          <div class="flex flex-wrap items-end gap-4">
            <div class="flex flex-col flex-1 gap-2">
              <label class="font-medium">Time Slice:</label>
              <input type="number" class="w-full field sm:w-60" v-model="timeSlice" min="1" max="20" required>
            </div>
            <div class="flex gap-2">
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
          <button @click.prevent="runAlgorithm" class="btn" type="submit">
            Run Algorithm
          </button>
        </form>
        <div class="mt-16">
          <h3 class="mb-2 text-lg font-medium">Results:</h3>
          <GanttChart v-if="hasAlgorithmBeenRan" :queueLog="groupedQueueLog" :processLog="processLog"
            :quantum="Number(timeSlice)"></GanttChart>
          <ProcessDetails v-if="hasAlgorithmBeenRan" :processData="processData" :finished-processes="finishedProcesses">
          </ProcessDetails>
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
    </div>
  </Transition>
</template>

<script setup>
import { Trash } from '@vicons/tabler';
import { Icon } from '@vicons/utils';
import { ref, reactive, computed, watch } from 'vue';
import GanttChart from '@/components/algorithms/cpu-scheduling/GanttChart.vue';
import ProcessDetails from '@/components/algorithms/cpu-scheduling/ProcessDetails.vue';
import EmptySpace from '@/components/general/EmptySpace.vue';
import Alert from '@/components/general/Alert.vue';
import Figure from '@/components/general/Figure.vue';

defineProps({
  tab: {
    type: String,
    required: true
  }
});

// Reactive variables and constants
const form = ref(null);
const timeSlice = ref(2);
const processData = reactive([
  [0, 4],
  [1, 6],
  [2, 4],
  [3, 5]
]);
const hasAlgorithmBeenRan = ref(false);
const queueLog = reactive([]);
const processLog = reactive([]);
const finishedProcesses = reactive([]);
const processLimit = 6;

// Reset algorithm results if the time slice is edited
watch(timeSlice, () => {
  resetAlgorithmResults();
});

// Group the queuelog based on the time of each log
const groupedQueueLog = computed(() => {
  const grouped = Object.groupBy(queueLog, (log) => log[0]);
  return Object.values(grouped);
});

// Get rid of old algorithm results
const resetAlgorithmResults = () => {
  hasAlgorithmBeenRan.value = false;
  queueLog.length = 0;
  processLog.length = 0;
  finishedProcesses.length = 0;
}

const addRow = () => {
  // Reset algorithm
  resetAlgorithmResults();
  // Add new row
  const lastItem = processData[processData.length - 1];
  const newItem = [lastItem[0] + 1, Math.round(Math.random() * 10)];
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

let lastQueueSnapshot = null;
let lastSnapshotTime = -1;

const updateQueueLog = (currentTime, queue) => {
  const queueProcessIds = queue.map((x) => `P${x[0]}`);
  while (queueProcessIds.length < 6) {
    queueProcessIds.push('-');
  }

  const snapshot = queueProcessIds.join(',');

  // Only skip if snapshot is same AND time hasn't moved (e.g., multiple calls in the same ms)
  if (snapshot !== lastQueueSnapshot || currentTime !== lastSnapshotTime) {
    queueLog.push([currentTime, queueProcessIds]);
    lastQueueSnapshot = snapshot;
    lastSnapshotTime = currentTime;
  }
};

const updateProcessLog = (currentProcess, currentTime) => {
  const processCopy = currentProcess.slice();
  processLog.push([currentTime, processCopy]);
}

const runAlgorithm = () => {
  const isFormValid = form.value.checkValidity();
  if (!isFormValid) return form.value.reportValidity();

  resetAlgorithmResults();
  hasAlgorithmBeenRan.value = true;


  const quantum = Number(timeSlice.value);

  let id = 1;
  const processes = processData.map(p => [id++, p[0], p[1], p[1]]);

  const queue = [];

  let currentTime = 0;
  let currentProcess = null;
  let timeLeftInSlice = 0;

  const arrived = new Set();

  while (true) {
    updateQueueLog(currentTime, queue);

    // Enqueue new arrivals first
    processes.forEach(p => {
      const [pid, arrivalTime] = p;
      if (arrivalTime === currentTime && !arrived.has(pid)) {
        queue.push(p);
        updateQueueLog(currentTime, queue);
        arrived.add(pid);
      }
    });

    // If there's no current process, get one from the queue
    if (!currentProcess && queue.length > 0) {
      currentProcess = queue.shift();
      updateQueueLog(currentTime, queue);
      updateProcessLog(currentProcess, currentTime);
      timeLeftInSlice = Math.min(quantum, currentProcess[3]);
    }

    // Run current process for 1 unit
    if (currentProcess) {
      currentProcess[3] -= 1;
      timeLeftInSlice -= 1;
    }

    currentTime++;

    // Handle process completion or time slice expiry
    if (currentProcess) {
      const justFinished = currentProcess;

      if (justFinished[3] === 0) {
        finishedProcesses.push([justFinished[0], currentTime]);
        currentProcess = null;
      } else if (timeLeftInSlice === 0) {
        currentProcess = null;

        // Now add any newly arrived processes before re-adding this one
        processes.forEach(p => {
          const [pid, arrivalTime] = p;
          if (arrivalTime === currentTime && !arrived.has(pid)) {
            queue.push(p);
            updateQueueLog(currentTime, queue);
            arrived.add(pid);
          }
        });

        queue.push(justFinished); // Re-queue after arrivals
        updateQueueLog(currentTime, queue);
      }
    }

    const allDone = processes.every(p => p[3] === 0);
    if (!currentProcess && queue.length === 0 && allDone) break;
  }
}
</script>