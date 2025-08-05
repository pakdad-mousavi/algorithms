<template>
  <div class="absolute flex flex-col w-full h-full px-4 pb-4 overflow-auto bg-neutral-900">
    <div v-for="[groupName, hits] in formattedResults" class="first:[&>div]:first:mt-4">
      <HitGroup :groupName="groupName"></HitGroup>
      <div class="flex flex-col gap-y-4">
        <Hit v-for="hit in hits" :hit="hit"></Hit>
      </div>
    </div>
  </div>
</template>

<script setup>
import HitGroup from './HitGroup.vue';
import Hit from './Hit.vue';

defineProps({
  formattedResults: {
    type: Array,
    required: true,
  }
});
</script>