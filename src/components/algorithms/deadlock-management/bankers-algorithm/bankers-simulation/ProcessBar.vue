<template>
  <div class="flex mx-auto mb-2 sm:w-4/5 justify-evenly">
    <div v-for="processNumber in numberOfProcesses"
      class="flex items-center justify-center border rounded-md border-zinc-700 w-10 sm:w-15 aspect-square bg-[size:10px_10px] font-medium"
      :class="{
        '!border-cyan-600 bg-[image:repeating-linear-gradient(315deg,var(--color-cyan-600)_0,var(--color-cyan-600)_1px,_transparent_1px,_transparent_50%)]': processNumber - 1 === processId,
        '!border-emerald-600': finishedProcesses.includes(processNumber - 1) && processNumber - 1 !== processId,
      }">
      P{{ processNumber }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  numberOfProcesses: {
    type: Number,
    required: true,
  },
  processId: {
    type: Number,
    required: true,
  },
  finishedProcesses: {
    type: Array,
    default: () => [],
  },
});
</script>