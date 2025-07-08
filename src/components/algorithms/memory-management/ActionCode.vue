<template>
  <div class="flex items-center justify-center w-12 h-full bg-zinc-800">
    <span v-if="currentAction.isAllocation">A{{ currentAction.pid }}</span>
    <span v-else>D{{ currentAction.pid }}</span>
  </div>
</template>

<script setup>
defineProps({
  currentAction: {
    type: Object,
    required: true,
  }
})
</script>