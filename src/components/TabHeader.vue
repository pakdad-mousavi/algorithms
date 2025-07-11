<template>
  <div class="flex flex-col items-center mb-4 sm:flex-row gap-y-4 gap-x-2">
    <h1 class="flex-1 text-2xl font-semibold text-center sm:text-left">
      {{ route.meta.name }}
    </h1>
    <div class="relative w-full max-w-sm group sm:max-w-max">
      <ul
        class="flex flex-col overflow-hidden text-sm font-medium duration-75 border rounded-md sm:flex-row border-neutral-700 hover:border-main">
        <li class="px-4 py-1.5 sm:py-1 duration-75 cursor-pointer text-center" v-for="tab in tabList"
          :aria-selected="activeTab === tab.id" @click="selectTab(tab.id)"
          :class="{ 'bg-main text-neutral-700': activeTab === tab.id }">
          {{ tab.label }}
        </li>
      </ul>
      <div class="absolute inset-0 duration-300 rounded-md bg-main/20 group-hover:bg-main/30 -z-10 blur-2xl"></div>
    </div>
  </div>
  <hr class="mb-4 border-neutral-800">
</template>

<script setup>
import { tabList, defaultTab } from '@/state/tabState';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const activeTab = computed(() => {
  const tabIds = tabList.map((tab) => tab.id);
  const currentHash = route.hash.replace('#', '');
  const doesTabExist = tabIds.includes(currentHash);
  return route.hash && doesTabExist ? currentHash : defaultTab;
});


const selectTab = (newTabId) => {
  const hash = `#${newTabId}`;
  if (route.hash !== hash) {
    router.push(route.path + hash);
  }
}
</script>