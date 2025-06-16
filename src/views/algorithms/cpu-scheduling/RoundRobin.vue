<template>
  <main class="p-4 space-y-4 text-neutral-300">
    <section class="p-4 rounded-xl bg-zinc-900">
      <div class="w-11/12 mx-auto">
        <h1 class="mb-4 text-2xl font-semibold leading-relaxed">
          Round Robin Algorithm
        </h1>
        <hr class="mb-4 border-neutral-800">
        <div class="mb-10 space-y-4 leading-relaxed">
          <p>
            The <span class="text-main">Round Robin Algorithm</span> is a widely used CPU scheduling method,
            particularly effective in time-sharing systems. Its main objective is to allocate CPU time fairly among all
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
        </div>
        <figure class="my-20">
          <img src="/algorithms/cpu-scheduling/round-robin.svg" alt="Round Robin CPU Scheduling Algorithm">
          <figcaption class="mt-2 text-sm italic text-center text-zinc-400">Round Robin CPU Scheduling Algorithm
          </figcaption>
        </figure>

        <h1 class="mb-4 text-xl font-semibold leading-relaxed">
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
              <button class="btn" @click.prevent="zeroOutArrivalTimes">Set All Arrival Times to Zero</button>
              <button class="btn" @click.prevent="addRow">Add Row</button>
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
                        <X></X>
                      </Icon>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button @click.prevent="runAlgorithm" class="btn">
            Run Algorithm
          </button>
        </form>
      </div>
    </section>
  </main>
</template>

<script setup>
import { X } from '@vicons/tabler';
import { Icon } from '@vicons/utils';
import { ref, reactive } from 'vue';

const form = ref(null);
const timeSlice = ref(2);
const processData = reactive([
  [0, 4],
  [1, 6],
  [2, 4],
  [3, 5]
]);

const addRow = () => {
  const lastItem = processData[processData.length - 1];
  const newItem = [lastItem[0] + 1, Math.round(Math.random() * 10)];
  processData.push(newItem);
}

const removeRow = (rowIndex) => {
  processData.splice(rowIndex, 1);
}

const zeroOutArrivalTimes = () => {
  processData.forEach(process => {
    process[0] = 0;
  });
}

const runAlgorithm = () => {
  const isFormValid = form.value.checkValidity();
  if (!isFormValid) return form.value.reportValidity();

  const quantum = Number(timeSlice.value);

  let id = 1;
  const processes = processData.map(p => [id++, p[0], p[1], p[1]]);
  const processMap = new Map(processes.map(p => [p[0], p]));

  const queue = [];
  const ganttChart = [];
  const timeChart = [];
  const finishedProcesses = [];

  let currentTime = 0;
  let currentProcess = null;
  let timeLeftInSlice = 0;

  const arrived = new Set();

  while (true) {
    // Enqueue new arrivals first
    processes.forEach(p => {
      const [pid, arrivalTime] = p;
      if (arrivalTime === currentTime && !arrived.has(pid)) {
        queue.push(p);
        arrived.add(pid);
      }
    });

    // If there's no current process, get one from the queue
    if (!currentProcess && queue.length > 0) {
      currentProcess = queue.shift();
      const pid = currentProcess[0];
      timeLeftInSlice = Math.min(quantum, currentProcess[3]);

      // Add to Gantt chart
      ganttChart.push(pid);
      timeChart.push(`${currentTime} --> ${currentTime + timeLeftInSlice}`);
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
            arrived.add(pid);
          }
        });

        queue.push(justFinished); // Re-queue after arrivals
      }
    }

    const allDone = processes.every(p => p[3] === 0);
    if (!currentProcess && queue.length === 0 && allDone) break;
  }

  // Output
  console.log("Gantt Chart:", ganttChart);
  console.log("Time Chart:", timeChart);
  console.log("Finished Processes:", finishedProcesses);
}
</script>