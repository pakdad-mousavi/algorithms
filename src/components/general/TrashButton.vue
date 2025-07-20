<template>
  <div
    class="flex items-center justify-center w-7 h-7 duration-100 border border-transparent rounded-md cursor-pointer bg-zinc-700 group hover:border-rose-600 active:bg-zinc-800">
    <Icon class="text-rose-500" tag="span" size="20px">
      <Trash></Trash>
    </Icon>
  </div>
</template>

<script setup>
import { Trash } from '@vicons/tabler';
import { Icon } from '@vicons/utils';
</script>