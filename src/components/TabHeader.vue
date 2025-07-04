<template>
  <div class="flex flex-col mb-4 sm:flex-row gap-y-4">
    <h1 class="flex-1 text-2xl font-semibold">
      {{ route.meta.name }}
    </h1>
    <div class="relative">
      <ul
        class="flex overflow-hidden text-sm font-medium duration-75 border rounded-md max-w-max border-neutral-700 hover:border-main">
        <li class="px-4 py-1 duration-75 cursor-pointer" v-for="tab in tabs" @click="emit('on-tab-change', tab);"
          :class="{ 'bg-main text-neutral-700': activeTab === tab }">
          {{ tab }}
        </li>
      </ul>
      <div class="absolute inset-0 rounded-md bg-main/20 -z-10 blur-2xl"></div>
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