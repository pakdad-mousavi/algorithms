<template>
  <div class="max-w-2xl mx-auto space-y-24">
    <div class="w-full" v-for="(pass, passIndex) in log">
      <h2 class="mb-4 text-xl font-medium text-center">Pass #{{ passIndex + 1 }}</h2>
      <div class="flex mb-4 overflow-hidden border rounded-md border-zinc-700">
        <div class="flex items-center justify-center w-1/5 py-2 border-r last:border-r-0 border-zinc-700"
          v-for="(value, index) in pass.oldState" :class="getStateValueColor(pass, index, passIndex)">
          {{ value }}
        </div>
      </div>

      <div class="relative h-5 mb-4" v-if="pass.pos > -1">
        <div class="absolute w-0 h-5 border-l" :style="`left: ${getLineOffset(passIndex)[0]}%`"></div>
        <div class="absolute w-0 h-5 border-l" :style="`left: ${getLineOffset(passIndex)[1]}%`"></div>
        <div class="absolute bottom-0 border-b" :style="getConnectorStyle(passIndex)"></div>
      </div>

      <p class="mb-16 font-medium text-center" v-if="pass.pos > -1">
        Range of numbers that {{ pass.currentNum }} is {{ isAscending ? 'less' : 'greater' }} than
      </p>
      <p class="mb-16 font-medium text-center" v-else>
        {{ pass.currentNum }} is not {{ isAscending ? 'less' : 'greater' }} than any number to the left, so no
        changes are made
      </p>

      <div class="flex overflow-hidden border rounded-md border-zinc-700" v-if="pass.pos > -1">
        <div class="flex items-center justify-center w-1/5 py-2 border-r last:border-r-0 border-zinc-700"
          v-for="(value, index) in pass.intermediateState"
          :class="{ 'bg-zinc-800': index > pass.pos && index <= passIndex + 1 }">
          {{ value }}
        </div>
      </div>

      <p class="mb-16 font-medium text-center" v-if="pass.pos > -1">Shift the range to the right</p>

      <div class="flex overflow-hidden border rounded-md border-zinc-700">
        <div class="flex items-center justify-center w-1/5 py-2 border-r last:border-r-0 border-zinc-700"
          v-for="(value, index) in pass.newState" :class="{ 'bg-zinc-800': index === pass.pos }">
          {{ value }}
        </div>
      </div>

      <p class="font-medium text-center" v-if="pass.pos > -1">Insert {{ pass.currentNum }} in the empty slot</p>

    </div>
  </div>

</template>

<script setup>
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

const numberOfItems = computed(() => props.log[0].oldState.length);
const fullUnit = computed(() => 100 / numberOfItems.value);

const getStateValueColor = (pass, valueIndex, passIndex) => {
  return {
    'bg-blue-700': pass.pos > -1 && valueIndex <= passIndex && valueIndex >= pass.pos,
    'bg-emerald-600': pass.oldState[valueIndex] === pass.currentNum
  }
}

const getConnectorPos = (passIndex) => {
  const pass = props.log[passIndex];
  const rangeStart = pass.pos;
  const rangeStop = passIndex;
  const range = pass.oldState.slice(rangeStart, rangeStop + 1);
  const width = fullUnit.value * range.length;
  const leftOffset = fullUnit.value * rangeStart;

  return { width, leftOffset };
};

const getConnectorStyle = (passIndex) => {
  return `left: ${getConnectorPos(passIndex).leftOffset}%; width: ${getConnectorPos(passIndex).width}%`;
};

const getLineOffset = (passIndex) => {
  const pass = props.log[passIndex];
  const rangeStart = pass.pos;
  const rangeStop = passIndex;
  const range = pass.oldState.slice(rangeStart, rangeStop + 1);
  const width = fullUnit.value * range.length;
  const offsetOne = fullUnit.value * rangeStart;
  const offsetTwo = fullUnit.value * (rangeStart + range.length);

  return [offsetOne, offsetTwo];
};

</script>