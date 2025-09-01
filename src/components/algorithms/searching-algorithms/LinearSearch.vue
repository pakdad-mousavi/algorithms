<template>
  <div class="space-y-20">
    <div v-for="(match, logIndex) in log" class="space-y-4">
      <h4 class="text-lg font-medium text-center">
        Check If <span class="underline">{{ numbers[logIndex] }}</span> is a Match
      </h4>
      <div class="flex mx-auto overflow-hidden border rounded-md max-w-max border-zinc-700">
        <div
          class="flex items-center justify-center w-12 text-sm border-r aspect-square last:border-r-0 border-zinc-700 sm:text-base"
          v-for="(num, index) in numbers"
          :class="{ 'bg-zinc-800': index === logIndex, 'text-zinc-600': index < logIndex, '!bg-emerald-700': index === logIndex && match }">
          {{ num }}
        </div>
      </div>
      <div class="flex items-center justify-center gap-x-2">
        <div class="flex items-center justify-center w-12 text-sm border rounded-md aspect-square sm:text-base"
          :class="match ? 'border-emerald-600' : 'border-rose-500'">
          {{ numbers[logIndex] }}
        </div>
        <span class="text-lg font-medium -translate-y-0.5">{{ match ? '=' : '≠' }}</span>
        <div class="flex items-center justify-center w-12 text-sm border rounded-md aspect-square sm:text-base"
          :class="match ? 'border-emerald-600' : 'border-rose-500'">
          {{ target }}
        </div>
      </div>
      <p class="font-medium text-center" :class="match ? 'text-emerald-600' : 'text-rose-500'">
        {{ getMessage(match) }}
      </p>
    </div>
  </div>

  <div>
    <div class="max-w-md p-2 mx-auto mt-20 text-center border rounded-md border-zinc-700">
      <div v-if="position === -1">
        <h4 class="mb-2 text-lg font-medium underline text-rose-500">No Match Found</h4>
        <p>The target number is not in the list of numbers above.</p>
      </div>
      <div v-else>
        <h4 class="mb-2 text-lg font-medium underline text-emerald-500">Match Found</h4>
        <p>
          The target number is in the list of numbers above at <span class="font-medium">position {{ position + 1
          }}</span>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  numbers: {
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

const getMessage = (match) => {
  return match ? `Successful match at position ${props.position + 1}! Stop searching.` : 'Not a match.';
};

</script>