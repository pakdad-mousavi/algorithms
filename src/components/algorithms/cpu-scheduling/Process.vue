<template>
  <div class="process" v-if="currentAlignedProcess" :style="calculateProcessBarPosition(currentAlignedProcess)">
    <div class="processing" v-for="i in getVisibleProcessingSteps(currentAlignedProcess)" :key="i"
      :class="getCompositeProcessClass(currentAlignedProcess, i)" v-if="currentAlignedProcess && currentAlignedProcess[1]">
      <span v-if="i === 1">P{{ currentAlignedProcess[1][0] }}</span>
    </div>
    <div :class="getProcessClass(currentAlignedProcess, 'incomplete')" v-if="currentAlignedProcess && currentAlignedProcess[1]"
      v-for="i in Math.max(0, currentAlignedProcess[1][3] - quantum)">
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';

const props = defineProps({
  currentAlignedProcess: {
    type: Array,
    default: () => [],
  },
  quantum: {
    type: Number,
    required: true,
  }
});

const calcTranslate = inject('calcTranslate');

const completeProcessColor = 'bg-[image:repeating-linear-gradient(315deg,var(--color-gray-600)_0,var(--color-gray-600)_1px,_transparent_1px,_transparent_50%)] border-gray-600';

const processColors = [
  {
    processing: "bg-[image:repeating-linear-gradient(315deg,var(--color-cyan-600)_0,var(--color-cyan-600)_1px,_transparent_1px,_transparent_50%)] border-cyan-600",
    incomplete: 'bg-cyan-600'
  },
  {
    processing: "bg-[image:repeating-linear-gradient(315deg,var(--color-emerald-600)_0,var(--color-emerald-600)_1px,_transparent_1px,_transparent_50%)] border-emerald-600",
    incomplete: 'bg-emerald-600'
  },
  {
    processing: "bg-[image:repeating-linear-gradient(315deg,var(--color-yellow-500)_0,var(--color-yellow-500)_1px,_transparent_1px,_transparent_50%)] border-yellow-500",
    incomplete: 'bg-yellow-500'
  },
  {
    processing: "bg-[image:repeating-linear-gradient(315deg,var(--color-rose-600)_0,var(--color-rose-600)_1px,_transparent_1px,_transparent_50%)] border-rose-600",
    incomplete: 'bg-rose-600'
  },
  {
    processing: "bg-[image:repeating-linear-gradient(315deg,var(--color-amber-600)_0,var(--color-amber-600)_1px,_transparent_1px,_transparent_50%)] border-amber-600",
    incomplete: 'bg-amber-600'
  },
  {
    processing: "bg-[image:repeating-linear-gradient(315deg,var(--color-violet-600)_0,var(--color-violet-600)_1px,_transparent_1px,_transparent_50%)] border-violet-600",
    incomplete: 'bg-violet-600'
  },
];

// Extracts process info from a process log entry
const extractProcessInfo = (entry) => {
  const [pid, , start, remaining] = entry?.[1] || [];
  return { pid, start, remaining };
};

// Returns the CSS class for a process bar based on its state ('processing' or 'incomplete')
const getProcessClass = (entry, state) => {
  const { pid } = extractProcessInfo(entry);
  if (!pid || pid < 1 || pid > processColors.length) return '';
  return processColors[pid - 1][state];
};

// Returns the CSS class for a process bar segment, distinguishing completed and processing parts
const getCompositeProcessClass = (entry, pos) => {
  const { start, remaining } = extractProcessInfo(entry);
  // If the segment is completed, use the completeProcessColor, else use processing color
  return pos <= (start - remaining)
    ? completeProcessColor
    : getProcessClass(entry, 'processing');
};

// Calculates the position of the process bar based on its index and timing
const calculateProcessBarPosition = (currentAlignedProcess) => {
  const { start, remaining } = extractProcessInfo(currentAlignedProcess);
  const currentTime = currentAlignedProcess?.[0];
  const multiplier = currentTime - (start - remaining);
  return calcTranslate(multiplier);
}

// Returns the total number processing steps (processed + processing this cycle) in the current quantum
const getVisibleProcessingSteps = (entry) => {
  if (!entry || !entry[1]) return 0;
  const { start, remaining } = extractProcessInfo(entry);

  const processed = start - remaining;
  const processingThisCycle = Math.min(remaining, props.quantum);

  return processed + processingThisCycle;
};

</script>