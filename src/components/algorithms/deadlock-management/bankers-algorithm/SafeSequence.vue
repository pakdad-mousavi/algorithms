<template>
  <div>
    <p class="mb-2 font-medium">Final Safe Sequence:</p>
    <hr class="mb-4 border-neutral-800">
    <div class="p-4 border rounded-md border-zinc-700">
      <div class="flex justify-center gap-x-4">
        <div class="flex items-center justify-center w-10 font-medium border rounded-md sm:w-15 aspect-square"
          v-for="process in formattedSafeSequence" :class="{
            'border-rose-700 text-rose-500': process === '-',
            'border-emerald-700 text-emerald-500': process !== '-'
          }">
          {{ process }}
        </div>
      </div>
      <div class="flex items-center justify-center mt-4">
        <hr class="w-4/5 translate-x-3 border-2 rounded-full border-zinc-700 sm:w-3/5 md:w-2/5">
        <Icon class="text-4xl -translate-x-2.5 text-zinc-700">
          <ChevronRight></ChevronRight>
        </Icon>
      </div>
      <p class="w-full mx-auto text-center sm:w-4/5" v-html="safeStateMessage"></p>
    </div>
  </div>
</template>

<script setup>
import { ChevronRight } from '@vicons/tabler';
import { Icon } from '@vicons/utils';

const props = defineProps({
  formattedSafeSequence: {
    type: Array,
    default: () => [],
  },
  isSystemInSafeState: {
    type: Boolean,
    required: true,
  }
});

const messages = {
  safe: 'Since there is a valid safe sequence which has been found and all processes have successfully been completed, the system <span class="text-emerald-500">is in a safe state.</span>',
  notSafe: 'No valid safe sequence could be found, which means not all processes have successfully been completed, so the system <span class="text-rose-500">is not in a safe state.</span>'
}

import { computed } from 'vue';
const safeStateMessage = computed(() => props.isSystemInSafeState ? messages.safe : messages.notSafe);
</script>
