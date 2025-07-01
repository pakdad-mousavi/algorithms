<template>
  <div>
    <Legend>
      <div class="space-y-2">
        <div class="font-medium">
          Queue
        </div>
        <div class="flex rounded-md [&>div]:first:rounded-l-md [&>div]:last:rounded-r-md">
          <div class="!w-min-max queue-item">-</div>
          <div class="!w-min-max queue-item">-</div>
          <div class="!w-min-max queue-item">-</div>
          <div class="!w-min-max queue-item">-</div>
          <div class="!w-min-max queue-item">-</div>
          <div class="!w-min-max queue-item">-</div>
        </div>
      </div>
      <div class="space-y-2">
        <div class="font-medium">
          Finished Segment
        </div>
        <div
          class="border border-gray-600 h-7 bg-[image:repeating-linear-gradient(315deg,var(--color-gray-600)_0,var(--color-gray-600)_1px,_transparent_1px,_transparent_50%)] bg-[size:10px_10px] rounded-md">
        </div>
      </div>
      <div class="space-y-2">
        <div class="font-medium">
          Processing Segment
        </div>
        <div
          class="border border-gray-400 h-7 bg-[image:repeating-linear-gradient(315deg,var(--color-gray-400)_0,var(--color-gray-400)_1px,_transparent_1px,_transparent_50%)] bg-[size:10px_10px] rounded-md">
        </div>
      </div>
      <div class="space-y-2">
        <div class="font-medium">
          Incomplete Segment
        </div>
        <div class="bg-gray-400 rounded-md h-7"></div>
      </div>
    </Legend>
    <div class="gantt-chart-container">
      <div class="gantt-chart" :style="chartWidth" ref="chart">
        <div v-for="index in totalTime" class="lines" :style="calcLeft(index)"></div>
        <Timeline :totalTime="totalTime + 1" :class="{ 'border-y-2': isTimelineFixed }"
          :style="`margin-top: ${horizontalScroll}px;`">
        </Timeline>
        <div class="interval" v-for="(queueGroup, currentTime) in queueLog" :key="currentTime">
          <Queue :queue-group="queueGroup"></Queue>
          <Process :current-aligned-process="alignedProcessLog[currentTime]" :quantum="quantum"></Process>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, provide, ref } from 'vue';
import Process from './Process.vue';
import Queue from './Queue.vue';
import Timeline from './Timeline.vue';
import Legend from './Legend.vue';

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

const chart = ref(null);
const isTimelineFixed = ref(false);
const horizontalScroll = ref(0);

const widthFactor = 24;

// Compute the totalTime
const totalTime = computed(() => {
  const lastQueue = props.queueLog[props.queueLog.length - 1];
  return lastQueue && lastQueue[0] && lastQueue[0][0] !== undefined
    ? lastQueue[0][0] + 1
    : 0;
});

// Compute the chartWidth
const chartWidth = computed(() =>
  `width: calc(var(--spacing) * ${widthFactor} * ${totalTime.value + 1})`
);

// Computes a formatted version of the process log, aligning each process entry to its corresponding time slot in the queue log
const alignedProcessLog = computed(() => {
  const result = [];
  // Extract the start times of each process from the process log
  const processTimes = props.processLog.map((p) => p[0]);
  // Iterate over each time slot in the queue log
  for (let i = 0; i < totalTime.value; i++) {
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

const handleScroll = () => {
  const container = chart.value;
  const topPos = container.getBoundingClientRect().top;

  // Get the correct navbar height
  const mediaQuery = window.matchMedia('(min-width: 1024px)');
  const singleNavbarWidth = 52; // 3.25 rem for each bar in the sticky header
  const navbarHeight = mediaQuery.matches ? singleNavbarWidth : singleNavbarWidth * 2;

  if (topPos - navbarHeight <= 0) {
    horizontalScroll.value = Math.abs(topPos - navbarHeight) - 4;
    isTimelineFixed.value = true;
  } else {
    horizontalScroll.value = 0;
    isTimelineFixed.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// Provide utility function to inner components
provide("calcTranslate", calcTranslate);
</script>