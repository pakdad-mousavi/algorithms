<template>
  <div
    class="aspect-square sm:aspect-auto sm:w-60 bg-zinc-800 px-2 py-1.5 rounded-md border border-zinc-700 border-dashed flex items-center cursor-pointer hover:bg-zinc-900 text-gray-400 duration-100"
    @click="toggleSearch">
    <Search class="sm:mr-2 size-4"></Search>
    <div class="hidden w-full sm:flex">
      <span class="flex-1">Search...</span>
      <div class="flex px-1 text-xs border rounded-md gap-x-0.5 border-zinc-700 items-center">
        <Icon size="14" v-if="isMacOs">
          <Command></Command>
        </Icon>
        <span v-else>ctrl</span>
        <span>K</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Command, Search } from '@vicons/tabler';
import { Icon } from '@vicons/utils';
import { onMounted, onUnmounted } from 'vue';

const isMacOs = navigator.userAgent.includes("Mac");
const emit = defineEmits(['toggle-search']);

const toggleSearch = () => {
  emit('toggle-search');
};

const handleCtrlKShortcut = (e) => {
  const isModifierActive = e.ctrlKey || e.metaKey;
  if (isModifierActive && e.key === 'k') {
    e.preventDefault();
    toggleSearch();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleCtrlKShortcut);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleCtrlKShortcut);
});
</script>