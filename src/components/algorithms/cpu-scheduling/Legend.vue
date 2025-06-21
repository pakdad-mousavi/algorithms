<template>
  <div class="mb-4 text-sm border-2 rounded-md border-zinc-700 legend p-4">
    <div class="flex items-center mb-6 border-zinc-700 gap-x-2">
      <Icon class="text-2xl">
        <CompassOutline></CompassOutline>
      </Icon>
      <h4 class="text-base font-medium">Legend</h4>
    </div>
    <div class="grid grid-cols-2 space-y-2 md:grid-cols-4 gap-x-4">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { CompassOutline } from '@vicons/ionicons5';
import { Icon } from '@vicons/utils';
</script>