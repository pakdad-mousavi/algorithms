<template>
  <div
    class="border rounded-md border-zinc-700 h-80 bg-[image:repeating-radial-gradient(var(--color-zinc-800)_0,var(--color-zinc-800)_1px,_transparent_1px,_transparent_100%)] bg-[size:20px_20px] bg-fixed">
    <div class="relative flex flex-col items-center justify-center w-full h-full">
      <Icon class="text-zinc-700 text-9xl" tag="span">
        <CogSharp></CogSharp>
      </Icon>
      <div class="z-10 space-y-2 text-center">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CogSharp } from '@vicons/ionicons5';
import { Icon } from '@vicons/utils';
</script>