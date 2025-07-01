<template>
  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" :class="{ 'draw-logo': animated }">
    <path d="M70.475 181.25
     L74.1875 193.75
     H0
     L47.6312 104.437
     L52.7 121.5
     L20.8312 181.25
     H70.475
     Z" class="low" fill="#46bba5" />

    <path d="M75.2312 87.625
     L103.075 181.25
     H145.744
     L131.162 132.194
     C127.518 119.936 120.202 109.091 110.2 101.123
     C100.199 93.1539 87.9933 88.4388 75.2312 87.625
     
     L58.4375 75
     H71.25
     C87.4124 74.9995 103.143 80.2201 116.097 89.8842
     C129.052 99.5483 138.539 113.139 143.144 128.631
     L162.5 193.75
     H93.75
     L58.4375 75" class="middle" fill="#e2e2e2" />

    <path d="M180.75 193.75
     L149.581 90.0125
     C143.426 69.4959 130.845 51.4979 113.692 38.6688
     C96.5391 25.8396 75.7198 18.8573 54.3 18.75
     L65.55 56.25
     H52.5
     L37.5 6.25
     H53.7938
     C77.9883 6.24994 101.538 14.0499 120.949 28.4925
     C140.36 42.9351 154.598 63.2507 161.55 86.425
     L193.75 193.75
     H180.75
     Z" class="high" fill="#46bba5" />
  </svg>
</template>

<script setup>
defineProps({
  animated: {
    type: Boolean,
    required: true,
  }
})
</script>

<style scoped>
.draw-logo path {
  fill: transparent;
  animation: drawLogoDash 3s cubic-bezier(.72, 0, .55, .99) forwards;
}

.draw-logo .low {
  stroke-dasharray: 323.6;
  stroke-dashoffset: 323.6;
  stroke: #46bba5;
  fill: #46bba5;
  fill-opacity: 0;
}

.draw-logo .middle {
  stroke-dasharray: 658.1;
  stroke-dashoffset: 658.1;
  stroke: #E2E2E2;
  fill: #E2E2E2;
  fill-opacity: 0;
}

.draw-logo .high {
  stroke-dasharray: 625.4;
  stroke-dashoffset: 625.4;
  stroke: #46bba5;
  fill: #46bba5;
  fill-opacity: 0;
}

@keyframes drawLogoDash {
  85% {
    stroke-dashoffset: 0;
  }

  90% {
    fill-opacity: 0;
    stroke-dashoffset: 0;
  }

  100% {
    fill-opacity: 1;
    stroke-dashoffset: 0;
  }
}
</style>
