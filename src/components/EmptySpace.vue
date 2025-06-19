<template>
  <div
    class="border rounded-md border-zinc-700 h-80 bg-[image:repeating-radial-gradient(var(--color-zinc-800)_0,var(--color-zinc-800)_1px,_transparent_1px,_transparent_100%)] bg-[size:20px_20px] bg-fixed">
    <div class="relative flex items-center justify-center w-full h-full">
      <Icon class="absolute -translate-x-1/2 top-1/3 -translate-y-1/3 text-zinc-700 text-9xl left-1/2 animate-bounce"
        tag="span">
        <Moon></Moon>
      </Icon>
      <div class="z-10 w-3/4 pt-4 space-y-2 text-center border-t-2 translate-y-2/3 border-zinc-700 h-1/3">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Moon } from '@vicons/tabler';
import { Icon } from '@vicons/utils';
</script>