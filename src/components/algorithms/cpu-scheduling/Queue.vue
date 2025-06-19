<template>
  <div class="queue" :style="calcTranslate(time)" v-for="([time, queue], index) in queueGroup" :key="index">
    <div class="queue-item" v-for="item in queue">
      {{ item }}
    </div>
  </div>

</template>

<script setup>
import { inject } from 'vue';

const props = defineProps({
  queueGroup: {
    type: Array,
    default: () => [],
  }
});

const calcTranslate = inject('calcTranslate');

</script>