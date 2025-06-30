<template>
  <div class="ml-3">
    <div
      class="flex items-center hover:bg-neutral-800 py-1.5 duration-100 px-1 rounded-md border-neutral-700 cursor-pointer"
      @click="isMinimized = !isMinimized" :class="{ 'is-minimized': isMinimized }">
      <div class="flex flex-1 font-medium">
        <Icon v-if="group.icon" tag="div" size="20" class="mr-1">
          <component :is="icons[group.icon]"></component>
        </Icon>
        <div>{{ group.name }}</div>
      </div>
      <Icon tag="span" size="16" class="duration-300 rotate-90 chevron">
        <ChevronRight24Filled />
      </Icon>
    </div>

    <ul class="ml-3 border-l-[1px] border-neutral-700 space-y-1">
      <li v-for="(algorithm, index) in group.algorithms" :key="index"
        :class="{ 'mb-6': !isMinimized & index === group.algorithms.length - 1 }"
        class="duration-100 cursor-pointer hover:bg-neutral-800 rounded-r-md first:mt-1">
        <RouterLink :to="buildPath([...path, group.name, algorithm])" class="block w-full h-full p-2 py-2 rounded-r-md"
          @click="emit('on-change-algorithm', [...path, group.name, algorithm])">
          {{ algorithm }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { RouterLink } from 'vue-router'
import { Icon } from '@vicons/utils';
import { ChevronRight24Filled } from '@vicons/fluent';

const props = defineProps({
  group: Object,
  icons: Object,
  path: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['on-change-algorithm']);

const isMinimized = ref(false);

// Minimize if all groups need to be minimized
watch(() => props.minimizeAll, (newVal) => {
  if (newVal === true)
    isMinimized.value = newVal;
});

// Utility to construct URL-safe path
const buildPath = (segments) => {
  return '/' + segments.map(s => s.toLowerCase().replace(/ /g, "-")).join('/')
};
</script>