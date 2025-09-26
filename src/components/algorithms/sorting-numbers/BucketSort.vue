<template>
  <h3 class="mb-4 text-lg font-medium text-center">Create {{ k }} Empty Buckets:</h3>
  <div class="grid gap-4 mb-14 max-sm:!grid-cols-1" :style="`grid-template-columns: repeat(${k}, minmax(0, 1fr));`">
    <div class="flex items-center justify-center h-40 p-2 border-2 border-dashed rounded-lg border-zinc-700"
      v-for="bucketNum in k">
      <div class="text-center">
        <h3 class="mb-2 text-lg font-medium">Bucket #{{ bucketNum }}</h3>
        <h5 class="text-sm text-gray-600">
          ({{ getLowerBound(bucketNum) }} - {{ getUpperBound(bucketNum) }})
        </h5>
      </div>
    </div>
  </div>

  <h3 class="mb-4 text-lg font-medium text-center">Fill Up Buckets With Values:</h3>
  <div class="grid gap-4 mb-14 max-sm:!grid-cols-1" :style="`grid-template-columns: repeat(${k}, minmax(0, 1fr));`">
    <div class="p-4 space-y-2 border-2 border-dashed rounded-lg sm:p-2 border-zinc-700"
      v-for="unsortedBucket, index in unsortedBuckets">
      <h3 class="mb-4 text-lg font-medium text-center">Bucket #{{ index + 1 }}</h3>
      <div class="p-2 text-sm text-center rounded-md bg-zinc-800" v-for="value in unsortedBucket">
        {{ value }}
      </div>
    </div>
  </div>

  <h3 class="mb-4 text-lg font-medium text-center">Sort Each Bucket Individually:</h3>
  <div class="grid gap-4 mb-14 max-sm:!grid-cols-1" :style="`grid-template-columns: repeat(${k}, minmax(0, 1fr));`">
    <div class="p-4 space-y-2 border-2 border-dashed rounded-lg sm:p-2 border-zinc-700"
      v-for="sortedBucket, index in sortedBuckets">
      <h3 class="mb-4 text-lg font-medium text-center">Bucket #{{ index + 1 }}</h3>
      <div class="p-2 text-sm text-center rounded-md bg-zinc-800" v-for="value in sortedBucket">
        {{ value }}
      </div>
    </div>
  </div>

  <h3 class="mb-4 text-lg font-medium text-center">Join Sorted Buckets Together:</h3>
  <div class="flex flex-col mx-auto border rounded-lg sm:flex-row border-zinc-700 max-w-max">
    <div
      class="flex items-center justify-center border-b sm:border-b-0 sm:border-r size-14 last:border-0 border-zinc-700"
      v-for="num in sortedNums">
      {{ num }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  k: {
    type: Number,
    required: true,
  },
  unsortedBuckets: {
    type: Array,
    required: true,
  },
  sortedBuckets: {
    type: Array,
    required: true,
  },
  sortedNums: {
    type: Array,
    required: true,
  }
});

const getLowerBound = (bucketNum) => Math.round(((bucketNum - 1) / props.k * 1) * 100) / 100;
const getUpperBound = (bucketNum) => (Math.round((bucketNum / props.k * 1) * 100) / 100) - 0.01;
</script>