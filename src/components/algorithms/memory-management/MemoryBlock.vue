<template>
  <div class="flex items-center justify-center h-full border-x bg-[size:10px_10px] last:border-r-0"
    :class="getBlockStyling(memoryBlock)" :style="`width: ${(memoryBlock.size / totalMemory) * 100}%`">
    <p class="text-center">
      <span v-if="memoryBlock.status === 'allocated'">
        P{{ memoryBlock.pid }}: <span class="font-medium">{{ memoryBlock.size }}KB</span>
      </span>
      <span v-else class="font-medium">
        {{ memoryBlock.status[0].toUpperCase() + memoryBlock.status.slice(1) }}: {{ memoryBlock.size }}KB
      </span>
    </p>
  </div>
</template>

<script setup>
defineProps({
  memoryBlock: {
    type: Object,
    required: true,
  },
  totalMemory: {
    type: Number,
    required: true,
  }
})

const getBlockStyling = (memoryBlock) => {
  // Allocated block
  if (memoryBlock.status === 'allocated') {
    return blockColors[memoryBlock.pid - 1];
  } else {
    return 'border-zinc-700';
  }
};

const blockColors = [
  "bg-[image:repeating-linear-gradient(315deg,var(--color-cyan-600)_0,var(--color-cyan-600)_1px,_transparent_1px,_transparent_50%)] border-cyan-600 border",
  "bg-[image:repeating-linear-gradient(315deg,var(--color-emerald-600)_0,var(--color-emerald-600)_1px,_transparent_1px,_transparent_50%)] border-emerald-600 border",
  "bg-[image:repeating-linear-gradient(315deg,var(--color-yellow-500)_0,var(--color-yellow-500)_1px,_transparent_1px,_transparent_50%)] border-yellow-500 border",
  "bg-[image:repeating-linear-gradient(315deg,var(--color-rose-600)_0,var(--color-rose-600)_1px,_transparent_1px,_transparent_50%)] border-rose-600 border",
  "bg-[image:repeating-linear-gradient(315deg,var(--color-amber-600)_0,var(--color-amber-600)_1px,_transparent_1px,_transparent_50%)] border-amber-600 border",
  "bg-[image:repeating-linear-gradient(315deg,var(--color-violet-600)_0,var(--color-violet-600)_1px,_transparent_1px,_transparent_50%)] border-violet-600 border",
];
</script>