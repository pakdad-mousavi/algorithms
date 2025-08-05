<template>
  <div class="p-2 duration-75 border rounded-md cursor-pointer border-neutral-700 hover:bg-neutral-800">
    <div class="flex flex-col mb-2 text-center sm:flex-row sm:items-center gap-x-2 sm:text-left">
      <h2 class="font-medium text-neutral-200" v-html="hit.title"></h2>
      <Icon size=20 class="!hidden text-neutral-500 sm:!block">
        <ChevronRight24Filled></ChevronRight24Filled>
      </Icon>
      <h3 class="text-sm text-neutral-500">{{ hit.section.title }}</h3>
    </div>
    <p v-html="hit.section.content" class="text-sm text-center sm:text-left text-neutral-200 line-clamp-2"></p>
  </div>
</template>

<script setup>
import { Icon } from '@vicons/utils';
import { ChevronRight24Filled } from '@vicons/fluent';

defineProps({
  hit: {
    type: Object,
    required: true,
  }
});
</script>