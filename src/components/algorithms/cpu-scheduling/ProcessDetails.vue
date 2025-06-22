<template>
  <div class="overflow-x-scroll">
    <table class="my-10">
      <thead>
        <tr>
          <th>Process</th>
          <th>Waiting Time</th>
          <th>Turnaround Time</th>
        </tr>
      </thead>
      <tbody class="highlight-first-column">
        <tr v-for="([waitingTime, turnaroundTime], index) in waitingAndTurnaroundTimes" :key="index">
          <td>P{{ index + 1 }}</td>
          <td>{{ waitingTime }} ms</td>
          <td>{{ turnaroundTime }} ms</td>
        </tr>
        <tr>
          <td>Average Per Process:</td>
          <td class="font-medium">{{ averageWaitingTime }} ms</td>
          <td class="font-medium">{{ averageTurnaroundTime }} ms</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  processData: {
    type: Array,
    default: () => [],
  },
  finishedProcesses: {
    type: Array,
    default: () => [],
  }
});

const waitingAndTurnaroundTimes = computed(() => {
  const result = [];
  // Sort finished processes based on process id
  const sortedFinishedProcesses = props.finishedProcesses.sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < props.processData.length; i++) {
    // Extract data
    const process = props.processData?.[i];
    const [arrivalTime, burstTime] = process;
    const finishTime = sortedFinishedProcesses[i][1];
    []
    // Calculate values and update result
    const waitingTime = finishTime - arrivalTime - burstTime;
    const turnaroundTime = finishTime - arrivalTime;

    result.push([waitingTime, turnaroundTime]);
  }

  return result;
});

const averageWaitingTime = computed(() => {
  const total = waitingAndTurnaroundTimes.value.reduce((acc, process) => acc + process[0], 0)
  const average = (total / waitingAndTurnaroundTimes.value.length).toFixed(2);
  return average;
});
const averageTurnaroundTime = computed(() => {
  const total = waitingAndTurnaroundTimes.value.reduce((acc, process) => acc + process[1], 0)
  const average = (total / waitingAndTurnaroundTimes.value.length).toFixed(2);
  return average;
});
</script>