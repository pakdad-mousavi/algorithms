<template>
  <div
    class="flex items-center justify-center duration-100 border border-transparent rounded-md cursor-pointer bg-zinc-700 aspect-square w-7 group hover:border-rose-600 active:translate-y-1">
    <Icon class="text-rose-500" tag="span" size="20px">
      <Trash></Trash>
    </Icon>
  </div>
</template>

<script setup>
import { Trash } from '@vicons/tabler';
import { Icon } from '@vicons/utils';
</script>