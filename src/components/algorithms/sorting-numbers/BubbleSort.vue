<template>
  <!-- Summary -->
  <div>
    <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <h4 class="flex border rounded-md gap-x-2 bg-zinc-800 border-zinc-700 px-4 py-0.5 text-sm">
        <span class="font-medium">Number of Passes:</span>
        <span>{{ log.length }}</span>
      </h4>
      <h4 class="flex border rounded-md gap-x-2 bg-zinc-800 border-zinc-700 px-4 py-0.5 text-sm">
        <span class="font-medium">Number of Swaps:</span>
        <span>{{ numberOfSwaps }}</span>
      </h4>
    </div>
    <h2 class="mt-8 mb-2 font-medium text-center">Final Order:</h2>
    <div class="grid grid-flow-col text-center border border-white rounded-md">
      <div v-for="value in finalOrder" class="py-2 border-r last:border-r-0">
        {{ value }}
      </div>
    </div>
    <div class="flex items-center justify-center mt-4">
      <hr class="w-4/5 translate-x-3 border-2 rounded-full border-zinc-700 sm:w-3/5 md:w-2/5">
      <Icon class="text-4xl -translate-x-2.5 text-zinc-700">
        <ChevronRight></ChevronRight>
      </Icon>
    </div>
  </div>
  <!-- Detailed Process section -->
  <div class="mt-24" v-for="(pass, index) in log" v-if="log.length > 1">
    <h1 class="text-lg font-medium text-center">Pass #{{ index + 1 }}</h1>
    <div v-for="entry in pass" class="last:mt-16">
      <div class="flex flex-col items-end gap-4 sm:flex-row" v-if="entry.pairStart !== null">
        <div class="flex flex-col items-center justify-center w-full mt-10 mb-4 sm:w-1/6 sm:my-0">
          <h2 class="mb-2 text-center">
            {{ entry.state[entry.pairStart] }} is {{ getComparisonWord(entry.swapped) }} than {{
              entry.state[entry.pairStart + 1] }}:
          </h2>
          <div class="px-4 text-sm text-center border rounded-full text-nowrap sm:text-base border-zinc-600"
            :class="{ '!border-emerald-600': entry.swapped }">
            <span v-if="entry.swapped">Swap</span>
            <span v-else>No Swap</span>
          </div>
        </div>
        <div class="w-[calc(83.33%-16px)] pb-8 ml-auto hidden sm:block">
          <div class="border-t border-white"
            :style="`width: calc(${getPositionPercentage(entry.pairStart)[1]}% + 1px)`">
          </div>
          <div class="relative">
            <div class="absolute h-4 border-r border-white"
              :style="`left: ${getPositionPercentage(entry.pairStart)[0]}%`">
            </div>
            <div class="absolute h-4 border-r border-white"
              :style="`left: ${getPositionPercentage(entry.pairStart)[1]}%`"></div>
          </div>
        </div>
      </div>
      <div class="flex">
        <div
          class="grid w-full sm:w-[calc(83.33%-16px)] ml-auto grid-flow-col border-1 border-white rounded-md overflow-hidden">
          <div class="flex items-center justify-center py-2 border-white border-r-1 last:border-r-0"
            :class="{ 'bg-transparent': entry.pairStart === null, 'bg-emerald-600': (valueIndex === entry.pairStart || valueIndex === entry.pairStart + 1) && entry.swapped, 'bg-neutral-700': (valueIndex === entry.pairStart || valueIndex === entry.pairStart + 1) && !entry.swapped }"
            v-for="(value, valueIndex) in entry.state">
            {{ value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronRight } from '@vicons/tabler';
import { Icon } from '@vicons/utils';
import { computed } from 'vue';

console.log();
const props = defineProps({
  log: {
    type: Array,
    required: true,
  },
  isAscending: {
    type: Boolean,
    required: true,
  }
});

const numberOfSwaps = computed(() => {
  let swaps = 0;
  for (const pass of props.log) {
    for (const entry of pass) {
      if (entry.swapped) {
        swaps++;
      }
    }
  }
  return swaps;
});

const finalOrder = computed(() => {
  return props.log[props.log.length - 1][props.log[props.log.length - 1].length - 1].state;
});

const getPositionPercentage = (pairStart) => {
  const numbersLength = props.log?.[0]?.[0]?.state?.length;
  const halfUnit = (1 / (numbersLength * 2)) * 100;
  const fullUnit = halfUnit * 2;
  return [halfUnit + (fullUnit * pairStart), halfUnit + (fullUnit * (pairStart + 1))];
};

const getComparisonWord = (swapped) => {
  if (props.isAscending) {
    return swapped ? 'greater' : 'less';
  } else {
    return swapped ? 'less' : 'greater';
  }
}
</script>