<template>
  <div
    class="w-60 bg-zinc-800 px-2 py-1.5 rounded-md border border-zinc-700 border-dashed flex items-center cursor-pointer hover:bg-zinc-900 text-gray-400 duration-100"
    @click="toggleSearch">
    <span class="flex-1">Search...</span>
    <Icon size="16px">
      <Search></Search>
    </Icon>
  </div>
</template>

<script setup>
import { Search } from '@vicons/tabler';
import { Icon } from '@vicons/utils';

console.log(import.meta.env);

const emit = defineEmits(['toggle-search']);

const toggleSearch = () => {
  emit('toggle-search');
};
</script>