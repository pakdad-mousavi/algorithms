<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          The <span class="text-main">Round Robin Algorithm</span> is a widely used CPU scheduling method,
          particularly effective in time-sharing systems. Its main objective is to allocate CPU time fairly among
          all running processes, ensuring that each one receives regular access to the processor.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          How a Queue Works
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Before learning about how the round robin algorithm operates, basic knowledge about a <span
            class="text-main">queue</span> is needed.
        </p>
        <p>
          A queue is a data structure used to maintain a <span class="text-main">first come first serve</span> order
          among its items, similar to how an actual queue works, for example, at a cashier in a grocer. Customers who
          enter the queue first will scan their items first.
        </p>
        <p>
          To illustrate this, consider the following queue with with 4 empty slots:
        </p>
        <Figure src="/algorithms/cpu-scheduling/round-robin/empty-queue.svg" class="max-w-xs" caption="An Empty Queue">
        </Figure>
        <p>
          When an item enters the queue, it goes in from the entry point and tries to get as close as it can to the exit
          point:
        </p>
        <Figure src="/algorithms/cpu-scheduling/round-robin/adding-items-to-queue.svg" class="max-w-xs"
          caption="Process 1 (P1) and 2 (P2) Entering the Queue"></Figure>
        <p>
          When an item is needed from the queue, it leaves from the exit point:
        </p>
        <Figure src="/algorithms/cpu-scheduling/round-robin/item-leaving-queue.svg" class="max-w-xl"
          caption="Process 1 (P1) Leaving the Queue"></Figure>
        <h2 class="mt-10 text-xl font-semibold">
          How the Algorithm Works
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          The round robin algorithm uses a queue internally to keep track of which processes arrived first, and thus
          need to be processed first. As processes arrive (based on their <span class="text-main">arrival time</span>),
          they enter the queue and wait to be processed.
        </p>
        <p>
          When a process enters the CPU for processing, it can only be processed for a certain amount of time (known as
          <span class="text-main">time slice</span> or <span class="text-main">time quantum</span>) before it has to
          leave and go to the back of the queue. This ensures that a large processes do not dominate the CPU.
        </p>
        <p>
          Lets look at a real example with a time slice of 2:
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
          Consider the following queue and CPU:
        </p>
        <Figure src="/algorithms/cpu-scheduling/round-robin/queue-and-cpu.svg" class="max-w-xl"
          caption="An Example Empty Queue With 3 Slots, and an Empty CPU"></Figure>
        <p>
          Our clock starts at 0ms. At 0ms, process 1 (P1) arrives and enters the queue. Since the CPU is currently empty
          and idle, P1 then leaves the queue and enters the CPU to be processed for a maximum of 2ms (the time slice):
        </p>
        <Figure src="/algorithms/cpu-scheduling/round-robin/0ms-example-state.svg" class="max-w-lg"
          caption="P1 Enters the Queue, Leaves the Queue, and Enters the CPU"></Figure>
        <p>
          At 1ms, the time remaining in the time slice is 1ms, so the process in the CPU can still be processed for 1ms
          longer and thus, nothing changes besides the remaining burst time of the process (since it has been processed
          for 1ms):
        </p>
        <table>
          <thead>
            <tr>
              <th>Process ID:</th>
              <th>Burst Time:</th>
              <th>Remaining Burst Time:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>P1</td>
              <td>4</td>
              <td>4ms - 1ms = 3ms</td>
            </tr>
          </tbody>
        </table>
        <p>
          However, at 1ms, P2 arrives and must enter the queue, therefore the queue is updated and P2 goes in:
        </p>
        <Figure src="/algorithms/cpu-scheduling/round-robin/1ms-example-state.svg" class="max-w-lg"
          caption="P2 Enters the Queue"></Figure>
        <p>
          At 2ms, multiple things happen. Firstly, P3 arrives at 3ms, and must enter the queue. Then, since the time
          remaining in the time slice is now 0ms, it needs to be restarted back to 2ms and P1 must leave the CPU to free
          it for the next process.
        </p>
        <p>
          Finally, P2 needs to leave the queue and enter the CPU for processing, since the CPU is now idle.
        </p>
        <Figure src="/algorithms/cpu-scheduling/round-robin/2ms-example-state.svg" class="max-w-lg"
          caption="P3 Enters the Queue, P1 Goes to the Back of the Queue, and P2 Enters the CPU"></Figure>
        <p>
          Since P1 was processed for 1ms longer, its remaining burst time is updated again:
        </p>
        <table>
          <thead>
            <tr>
              <th>Process ID:</th>
              <th>Burst Time:</th>
              <th>Remaining Burst Time:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>P1</td>
              <td>4</td>
              <td>3ms - 1ms = 2ms</td>
            </tr>
          </tbody>
        </table>
        <p>
          This goes on until all processes have a remaining burst time of 0, and there are no more processes in the
          queue. Once this occurs, the algorithm will simply wait until more processes arrive and enter the queue.
        </p>
        <Alert alertStyle="note">
          <div class="space-y-4">
            <p>
              This implementation of the round robin algorithm is biased towards arriving processes rather than
              completed processes. This means that if a process arrives and another process finishes during the same
              millisecond, the process which has arrived will enter the queue first.
            </p>
            <p>
              Only after the arriving process(es) are added to the queue, will the finished process leave the CPU
              and go to the back of the queue.
            </p>
          </div>
        </Alert>
        <h2 class="mt-10 text-xl font-semibold">
          How To Calculate Additional Metrics
        </h2>
        <hr class="mb-4 border-neutral-800">
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
        <p class="italic">
          Turnaround Time = Completion Time - Arrival Time
        </p>
        <p class="italic">
          Waiting Time = Turnaround Time - Burst Time
        </p>
      </div>
    </template>

    <template #[tabs.visualizer.id]>
      <div>
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
    </template>
  </TabSwitcher>
</template>

<script setup>
import TabSwitcher from '@/components/TabSwitcher.vue';
import { tabs } from '@/state/tabState';
import { ref, reactive, computed, watch } from 'vue';
import GanttChart from '@/components/algorithms/cpu-scheduling/GanttChart.vue';
import ProcessDetails from '@/components/algorithms/cpu-scheduling/ProcessDetails.vue';
import EmptySpace from '@/components/general/EmptySpace.vue';
import Alert from '@/components/general/Alert.vue';
import Figure from '@/components/general/Figure.vue';
import TrashButton from '@/components/general/TrashButton.vue';

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