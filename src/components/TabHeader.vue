<template>
  <div class="flex flex-col mb-4 sm:flex-row gap-y-4 items-center gap-x-2">
    <h1 class="flex-1 text-2xl font-semibold text-center sm:text-left">
      {{ route.meta.name }}
    </h1>
    <div class="relative group sm:max-w-max w-full max-w-sm">
      <ul
        class="flex flex-col sm:flex-row overflow-hidden text-sm font-medium duration-75 border rounded-md border-neutral-700 hover:border-main">
        <li class="px-4 py-1.5 sm:py-1 duration-75 cursor-pointer text-center" v-for="tab in tabs" @click="emit('on-tab-change', tab);"
          :class="{ 'bg-main text-neutral-700': activeTab === tab }">
          {{ tab }}
        </li>
      </ul>
      <div class="absolute inset-0 duration-300 rounded-md bg-main/20 group-hover:bg-main/30 -z-10 blur-2xl"></div>
    </div>
  </div>
  <hr class="mb-4 border-neutral-800">
</template>

<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

defineProps({
  activeTab: {
    type: String,
    required: true,
  }
});

const route = useRoute();
const emit = defineEmits(['on-tab-change']);
const tabs = reactive(['How It Works', 'Algorithm Visualizer']);

</script>