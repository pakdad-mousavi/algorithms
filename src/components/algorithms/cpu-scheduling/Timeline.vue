<template>
  <div class="timeline">
    <div v-for="ms in totalTime">{{ ms - 1 }}ms</div>
  </div>
</template>

<script setup>
const props = defineProps({
  totalTime: {
    type: Number,
    required: true,
  }
});
</script>