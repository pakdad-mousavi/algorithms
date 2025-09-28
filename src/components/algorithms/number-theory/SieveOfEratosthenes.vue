<template>
  <div class="space-y-10">
    <div>
      <h3 class="mb-2 text-lg font-medium text-center">List of Numbers:</h3>
      <div class="grid max-w-2xl grid-cols-10 mx-auto text-center rounded-md">
        <div class="flex items-center justify-center p-4 border border-zinc-700" v-for="num in total"
          :class="{ '!border-l-transparent': num % 10 !== 1, 'border-b-transparent': num < total - 9, 'bg-zinc-800 text-zinc-600': num === 1 }">
          {{ num }}
        </div>
      </div>
    </div>

    <div v-for="[p, currentPrimes] in log">
      <h3 class="mb-2 text-lg font-medium text-center">Cross Out All Multiples of {{ p }}:</h3>
      <div class="grid max-w-2xl grid-cols-10 mx-auto text-center rounded-md">
        <div class="flex items-center justify-center p-4 border border-zinc-700" v-for="num in total"
          :class="{ '!border-l-transparent': num % 10 !== 1, 'border-b-transparent': num < total - 9, 'bg-zinc-800 text-zinc-600': !currentPrimes.includes(num) }">
          {{ num }}
        </div>
      </div>
    </div>

    <h3 class="mb-2 text-lg font-medium text-center">Collect All Remaining Primes:</h3>
    <div class="grid max-w-2xl grid-cols-10 mx-auto mb-20 text-center rounded-md">
      <div class="flex items-center justify-center p-4 border border-zinc-700" v-for="num, idx in primes"
        :class="{ '!border-l-transparent': idx % 10 }">
        {{ num }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  total: {
    type: Number,
    required: true,
  },
  primes: {
    type: Array,
    required: true,
  },
  log: {
    type: Array,
    required: true,
  }
});

</script>