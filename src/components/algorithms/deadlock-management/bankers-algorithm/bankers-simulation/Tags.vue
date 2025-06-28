<template>
  <div class="flex justify-center mb-4 gap-x-2">
    <div class="inline-block px-4 py-1 text-sm border rounded-md bg-zinc-800 border-zinc-700">
      Current Process: <span class="font-medium">P{{ processId + 1 }}</span>
    </div>
    <div class="inline-block px-4 py-1 text-sm border rounded-md bg-zinc-800 border-zinc-700">
      Current Run Through Processes: <span class="font-medium">{{ runCount }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  processId: {
    type: Number,
    required: true,
  },
  runCount: {
    type: Number,
    required: true,
  }
});
</script>