<template>
  <h4 class="mb-4 text-lg font-medium text-center underline">Sorted Numbers</h4>
  <div class="flex mx-auto mb-20 overflow-hidden border rounded-md border-zinc-700 max-w-max">
    <div v-for="(num) in sortedArr"
      class="flex items-center justify-center w-12 text-sm border-r aspect-square last:border-r-0 border-zinc-700 sm:text-base">
      {{ num }}
    </div>
  </div>

  <h4 class="mb-4 text-lg font-medium text-center underline" v-if="log.length">Interpolation Search</h4>
  <div class="space-y-28">
    <div v-for="(entry, entryIndex) in log">
      <!-- Stats -->
      <div class="flex justify-center mb-4 text-sm text-center gap-x-2">
        <div class="px-4 py-0.5 bg-zinc-800 rounded-md border-zinc-700 border">
          Iteration: <span class="font-bold">{{ entryIndex + 1 }}</span>
        </div>
        <div class="px-4 py-0.5 bg-zinc-800 rounded-md border-zinc-700 border">
          Low: <span class="font-bold">{{ entry.low }}</span>
        </div>
        <div class="px-4 py-0.5 bg-zinc-800 rounded-md border-zinc-700 border">
          High: <span class="font-bold">{{ entry.high }}</span>
        </div>
      </div>
      <!-- Formula -->
      <div class="mx-auto my-10 space-y-4 max-w-max">
        <div class="flex items-center text-lg italic gap-x-2">
          <span>pos = {{ entry.low }} + </span>
          <div class="flex flex-col items-center gap-y-1">
            <div class="flex items-center gap-x-2">
              <span>({{ target }} - {{ sortedArr[entry.low] }})</span>
              <Icon>
                <X></X>
              </Icon>
              <span>({{ entry.high }} - {{ entry.low }})</span>
            </div>
            <hr class="w-full">
            <span>{{ sortedArr[entry.high] }} - {{ sortedArr[entry.low] }}</span>
          </div>
        </div>

        <div class="flex items-center text-lg italic gap-x-2">
          <span>pos = {{ entry.low }} + </span>
          <div class="flex flex-col items-center gap-y-1">
            <div class="flex items-center gap-x-2">
              <span>({{ target - sortedArr[entry.low] }})</span>
              <Icon>
                <X></X>
              </Icon>
              <span>({{ entry.high - entry.low }})</span>
            </div>
            <hr class="w-full">
            <span>{{ sortedArr[entry.high] - sortedArr[entry.low] }}</span>
          </div>
        </div>

        <div class="flex items-center text-lg italic gap-x-2">
          <span>pos = {{ entry.low }} + </span>
          <div class="flex flex-col items-center gap-y-1">
            <span>{{ (target - sortedArr[entry.low]) * (entry.high - entry.low) }}</span>
            <hr class="w-full">
            <span>{{ sortedArr[entry.high] - sortedArr[entry.low] }}</span>
          </div>
        </div>

        <div class="flex items-center text-lg italic gap-x-2">
          <span>pos ≈ {{ entry.pos }}</span>
        </div>
      </div>

      <!-- State -->
      <div>
        <div class="mx-auto overflow-hidden rounded-md max-w-max text-zinc-600">
          <div class="flex">
            <div class="w-12 text-center" v-for="(_, index) in sortedArr.length">
              <div v-if="index === entry.low">
                Low
              </div>
              <div v-if="index === entry.high">
                High
              </div>
            </div>
          </div>
          <div class="flex">
            <div v-for="(_, index) in sortedArr.length"
              class="flex items-center justify-center w-12 text-sm sm:text-base">
              {{ index }}
            </div>
          </div>
        </div>
        <div class="flex mx-auto overflow-hidden bg-transparent border rounded-md border-zinc-700 max-w-max">
          <div v-for="(num, index) in sortedArr"
            :class="{ 'text-zinc-800': index > entry.high || index < entry.low, 'bg-zinc-800': index === entry.pos }"
            class="flex items-center justify-center w-12 text-sm border-r aspect-square last:border-r-0 border-zinc-700 sm:text-base">
            {{ num }}
          </div>
        </div>
      </div>

      <!-- Checks -->
      <div class="mt-4 space-y-4">
        <!-- Check for match -->
        <div class="flex flex-col items-center mx-auto gap-y-2 gap-x-10 sm:flex-row sm:max-w-xs">
          <div class="flex items-center justify-center gap-x-4 sm:mr-auto">
            <div
              class="flex items-center justify-center w-10 text-sm border rounded-md sm:text-base sm:w-12 aspect-square"
              :class="sortedArr[entry.pos] === target ? 'border-emerald-600' : 'border-rose-700'">
              {{ target }}
            </div>
            <span class="font-bold text-lg -translate-y-0.5">{{ sortedArr[entry.pos] === target ? '=' : '≠' }}</span>
            <div
              class="flex items-center justify-center w-10 text-sm border rounded-md sm:text-base sm:w-12 aspect-square"
              :class="sortedArr[entry.pos] === target ? 'border-emerald-600' : 'border-rose-700'">
              {{ sortedArr[entry.pos] }}
            </div>
          </div>
          <p :class="sortedArr[entry.pos] === target ? 'text-emerald-600' : 'text-rose-700'">
            {{ sortedArr[entry.pos] === target ? 'Found a Match' : 'Not a match' }}
          </p>
        </div>
        <!-- Check for higher range -->
        <div class="flex flex-col items-center mx-auto gap-y-2 gap-x-10 sm:flex-row sm:max-w-xs"
          v-if="sortedArr[entry.pos] !== target">
          <div class="flex items-center justify-center gap-x-4 sm:mr-auto">
            <div
              class="flex items-center justify-center w-10 text-sm border rounded-md sm:text-base sm:w-12 aspect-square"
              :class="sortedArr[entry.pos] < target ? 'border-emerald-600' : 'border-rose-700'">
              {{ target }}
            </div>
            <span class="font-bold text-lg -translate-y-0.5">{{ sortedArr[entry.pos] < target ? '>' : '≯' }}</span>
                <div
                  class="flex items-center justify-center w-10 text-sm border rounded-md sm:text-base sm:w-12 aspect-square"
                  :class="sortedArr[entry.pos] < target ? 'border-emerald-600' : 'border-rose-700'">
                  {{ sortedArr[entry.pos] }}
                </div>
          </div>
          <p :class="sortedArr[entry.pos] < target ? 'text-emerald-600' : 'text-rose-700'">
            {{ sortedArr[entry.pos] < target ? `Update low to ${log[entryIndex + 1].low}` : 'Not a match' }} </p>
        </div>
        <!-- Check for lower range -->
        <div class="flex flex-col items-center mx-auto gap-y-2 gap-x-10 sm:flex-row sm:max-w-xs"
          v-if="sortedArr[entry.pos] !== target && sortedArr[entry.pos] > target">
          <div class="flex items-center justify-center gap-x-4 sm:mr-auto">
            <div
              class="flex items-center justify-center w-10 text-sm border rounded-md sm:text-base sm:w-12 aspect-square"
              :class="sortedArr[entry.pos] > target ? 'border-emerald-600' : 'border-rose-700'">
              {{ target }}
            </div>
            <span class="font-bold text-lg -translate-y-0.5">{{ sortedArr[entry.pos] > target ? '<' : '≮' }}</span>
                <div
                  class="flex items-center justify-center w-10 text-sm border rounded-md sm:text-base sm:w-12 aspect-square"
                  :class="sortedArr[entry.pos] > target ? 'border-emerald-600' : 'border-rose-700'">
                  {{ sortedArr[entry.pos] }}
                </div>
          </div>
          <p :class="sortedArr[entry.pos] > target ? 'text-emerald-600' : 'text-rose-700'">
            {{ sortedArr[entry.pos] > target ? `Update high to ${log[entryIndex + 1].high}` : 'Not a match' }}
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-md p-2 mx-auto mt-20 text-center border rounded-md border-zinc-700">
      <div v-if="position === -1">
        <h4 class="mb-2 text-lg font-medium underline text-rose-500">No Match Found</h4>
        <p>The target number is not in the list of numbers above.</p>
      </div>
      <div v-else>
        <h4 class="mb-2 text-lg font-medium underline text-emerald-500">Match Found</h4>
        <p>
          The target number is in the list of numbers above at <span class="font-medium">position {{ position }}</span>.
        </p>
      </div>
      <div class="px-4 py-0.5 bg-zinc-800 rounded-md border-zinc-700 border mt-2 max-w-max mx-auto text-sm">
        Total Iterations Needed: <span class="font-bold">{{ log.length }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { X } from '@vicons/tabler';
import { Icon } from '@vicons/utils';

const props = defineProps({
  numbers: {
    type: Array,
    required: true,
  },
  sortedArr: {
    type: Array,
    required: true,
  },
  target: {
    type: Number,
    required: true,
  },
  log: {
    type: Array,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  }
});

</script>