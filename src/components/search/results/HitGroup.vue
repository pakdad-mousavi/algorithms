<template>
  <div class="flex flex-col items-center mt-8 mb-4 font-medium sm:flex-row gap-x-2">
    <Icon size="24">
      <Component :is="getGroupIcon(groupName)"></Component>
    </Icon>
    <h1>{{ groupName }}</h1>
  </div>
</template>

<script setup>
import { Icon } from '@vicons/utils';
import { getGroupIcon } from '@/router/routeGroupIcons';

defineProps({
  groupName: {
    type: String,
    required: true,
  }
});
</script>