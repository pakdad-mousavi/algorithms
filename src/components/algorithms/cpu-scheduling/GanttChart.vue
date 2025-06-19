<template>
  <div>
    <div class="gantt-chart-container">
      <div v-for="index in queueLog.length" class="lines" :style="calcLeft(index)"></div>
      <div class="gantt-chart">
        <Timeline :totalTime="queueLog.length + 1"></Timeline>
        <div class="interval" v-for="(queueGroup, currentTime) in queueLog" :key="currentTime">
          <Queue :queue-group="queueGroup"></Queue>
          <Process :current-aligned-process="alignedProcessLog[currentTime]" :quantum="quantum"></Process>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, provide } from 'vue';
import Process from './Process.vue';
import Queue from './Queue.vue';
import Timeline from './Timeline.vue';


const props = defineProps({
  queueLog: {
    type: Array,
    default: () => [],
  },
  processLog: {
    type: Array,
    default: () => [],
  },
  quantum: {
    type: Number,
    required: true,
  },
});

const widthFactor = 24;

// Computes a formatted version of the process log, aligning each process entry to its corresponding time slot in the queue log
const alignedProcessLog = computed(() => {
  const result = [];
  // Extract the start times of each process from the process log
  const processTimes = props.processLog.map((p) => p[0]);
  // Iterate over each time slot in the queue log
  for (let i = 0; i < props.queueLog.length; i++) {
    // Find the index of the process that starts at this time slot
    const pos = processTimes.findIndex((p) => p === i);
    if (pos < 0) {
      // If no process starts at this time, push null
      result.push(null);
    } else {
      // Otherwise, push the corresponding process log entry
      result.push(props.processLog[pos]);
    }
  }
  return result;
});

// Helper functions
// Calculates the CSS translateX style for horizontal positioning
const calcTranslate = (value) => `transform: translateX(calc(var(--spacing) * ${widthFactor} * ${value}));`;

// Calculates the CSS left style for absolute positioning
const calcLeft = (value) => `left: calc(var(--spacing) * ${widthFactor} * ${value});`;

// Provide utility function to inner components
provide("calcTranslate", calcTranslate);
</script>