<template>
  <div class="overflow-x-scroll" v-if="hasAlgorithmBeenRan">
    <div class="flex flex-col gap-y-0.5 overflow-hidden border rounded-md min-w-xl border-zinc-700">
      <!-- Each memory snapshot -->
      <div v-for="(memory, index) in algResult.memoryLog" :key="index"
        class="border-y border-zinc-700 first:border-t-0 last:border-b-0 flex items-center justify-center w-full h-12 gap-x-0.5">
        <ActionCode :current-action="actions[index]"></ActionCode>
        <MemoryBlock v-for="(memBlock, index) in memory" :key="index" :memory-block="memBlock"
          :total-memory="totalMemory"></MemoryBlock>
      </div>
    </div>
  </div>
  <!-- Error message if any -->
  <Alert alert-style="error" v-if="hasAlgorithmBeenRan && !algResult.isSuccessful">
    <p>
      {{ errorMessage }}
    </p>
  </Alert>
</template>

<script setup>
import Alert from '@/components/general/Alert.vue';
import { computed } from 'vue';
import MemoryBlock from './MemoryBlock.vue';
import ActionCode from './ActionCode.vue';

const props = defineProps({
  hasAlgorithmBeenRan: {
    type: Boolean,
    required: true,
  },
  totalMemory: {
    type: Number,
    required: true,
  },
  algResult: {
    type: Object,
    required: true,
  },
  actions: {
    type: Array,
    default: () => [],
  },
});

const errorMessage = computed(() => {
  const lastAction = props.actions[props.algResult.memoryLog.length];
  if (lastAction?.isAllocation) {
    return `Failed to allocate memory to process P${lastAction?.pid}, not enough memory or memory has already been allocated to this process. Try increasing the total memory, requesting for less memory, or allocating memory to the process once.`
  } else {
    return `Failed to deallocate memory from process P${lastAction?.pid}, process could not be found in memory. Make sure that P${lastAction?.pid} has been allocated before trying to deallocate it.`
  }
});

</script>