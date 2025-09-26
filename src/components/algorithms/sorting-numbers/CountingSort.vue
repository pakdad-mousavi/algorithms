<template>
  <div class="space-y-14">
    <div>
      <h3 class="mb-4 sm:text-lg font-medium text-center">Unsorted Numbers:</h3>
      <div class="flex mx-auto border rounded-lg border-neutral-700 max-w-max">
        <div v-for="number in unsortedNumbers"
          class="flex items-center justify-center text-sm border-r size-10 sm:text-base sm:size-14 border-neutral-700 last:border-0">
          {{ number }}
        </div>
      </div>
    </div>

    <div>
      <h3 class="mb-4 sm:text-lg font-medium text-center">Counting Array:</h3>
      <div class="flex mx-auto max-w-max gap-x-4">
        <div class="hidden sm:block">
          <div class="flex items-center h-14">
            <h4>Values:</h4>
          </div>
          <div class="flex items-center h-14">
            <h4>Counts:</h4>
          </div>
        </div>
        <div>
          <div
            class="flex mx-auto text-sm border border-b-0 rounded-lg rounded-b-none sm:text-base border-neutral-700 max-w-max">
            <div v-for="i in range"
              class="flex items-center justify-center border-r size-10 sm:size-14 border-neutral-700 last:border-0">
              {{ i }}
            </div>
          </div>
          <div class="flex mx-auto text-sm border rounded-lg rounded-t-none sm:text-base border-neutral-700 max-w-max">
            <div v-for="count in counts"
              class="flex items-center justify-center border-r size-10 sm:size-14 border-neutral-700 last:border-0">
              {{ count }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h3 class="mb-4 sm:text-lg font-medium text-center">Sorting Array:</h3>
      <div class="space-y-4">
        <div class="flex mx-auto text-sm border rounded-lg sm:text-base border-neutral-700 max-w-max"
          v-for="reconstructedArray in reconstructedArrays">
          <div v-for="value in reconstructedArray"
            class="flex items-center justify-center border-r size-10 sm:size-14 border-neutral-700 last:border-0">
            {{ value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  unsortedNumbers: {
    type: Array,
    required: true,
  },
  range: {
    type: Number,
    required: true,
  },
  counts: {
    type: Array,
    required: true,
  },
  reconstructedArrays: {
    type: Array,
    required: true,
  },
});
</script>