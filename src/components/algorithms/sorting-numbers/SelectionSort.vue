<template>
  <div class="space-y-20">
    <div v-for="(pass, passIdx) in log" class="max-w-2xl p-4 mx-auto border rounded-md border-zinc-700">
      <h2 class="mb-4 text-xl font-medium text-center">Pass #{{ passIdx + 1 }}</h2>
      <div class="grid grid-flow-col overflow-hidden text-center border border-zinc-400 rounded-xl">
        <div class="flex items-center justify-center py-2 border-r last:border-r-0 border-zinc-400"
          v-for="(value, valueIdx) in pass.oldState" :class="{ 'bg-emerald-600': pass.selectionIdx === valueIdx }">
          {{ value }}
        </div>
      </div>
      <div class="relative mt-2 mb-8 sm:mb-10">
        <div class="absolute h-4 border-r-2 sm:h-6 border-zinc-400"
          :style="`left: ${getLinePosPercentFromIdx(passIdx, lineIdx - 1)}%`"
          v-for="lineIdx in (numberOfItems - passIdx)">
        </div>
        <div class="absolute right-[calc(10%-2px)] border-b-2 border-zinc-400 top-4 sm:top-6"
          :style="`right: calc(${halfUnit}% - 2px); width: calc(${getConnectorWidthPercent(passIdx)}% + 2px)`"></div>
      </div>
      <p class="text-center">The {{ isAscending ? 'smallest' : 'largest' }} number is {{ pass.selection }}</p>
      <div class="mx-auto mt-8 text-center">
        <div class="w-1 h-8 mx-auto rounded-full sm:h-16 bg-zinc-300"></div>
        <Icon size="40" class="-translate-y-6">
          <ChevronDown></ChevronDown>
        </Icon>
      </div>
      <div class="grid grid-flow-col overflow-hidden text-center border border-zinc-400 rounded-xl">
        <div class="flex items-center justify-center py-2 border-r last:border-r-0 border-zinc-400"
          v-for="(value, valueIdx) in pass.newState" :class="{ 'bg-emerald-600': passIdx === valueIdx }">
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronDown } from '@vicons/tabler';
import { Icon } from '@vicons/utils';
import { computed } from 'vue';
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

const numberOfItems = computed(() => props.log[0]?.oldState?.length);
const halfUnit = (1 / (numberOfItems.value * 2)) * 100;
const fullUnit = halfUnit * 2;

const getLinePosPercentFromIdx = (passIndex, lineIndex) => {
  const positions = [];
  for (let i = 0; i < numberOfItems.value; i++) {
    positions.push(halfUnit + (fullUnit * i));
  }
  const slicedPositions = positions.slice(passIndex);
  return slicedPositions[lineIndex];
};

const getConnectorWidthPercent = (passIndex) => {
  return 100 - fullUnit - (fullUnit * passIndex);
};
</script>