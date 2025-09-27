<template>
  <div class="flex items-center justify-center w-full h-full max-w-xl mx-auto">
    <div class="relative w-full h-full overflow-hidden border rounded-md border-zinc-600 bg-zinc-900"
      style="aspect-ratio: var(--ratio);" :style="`--ratio: ${finalWidth} / ${finalHeight};`">
      <div v-for="(sq, i) in squares" :key="i"
        class="absolute flex items-center justify-center text-xs text-white transition-opacity duration-700 border border-zinc-600 bg-zinc-800 bg-[image:repeating-radial-gradient(var(--color-zinc-700)_0,var(--color-zinc-700)_1px,_transparent_1px,_transparent_100%)] bg-[size:20px_20px]"
        :style="{
          left: sq.x,
          top: sq.y,
          width: sq.width,
          height: sq.height,
          opacity: i < visibleCount ? 1 : 0
        }">
        {{ sq.size === 1 ? `${sq.size}` : `${sq.size} × ${sq.size}` }}
      </div>
    </div>
  </div>

  <div class="max-w-md p-2 mx-auto mt-8 font-medium text-center border rounded-md bg-neutral-800 border-zinc-700">
    GCD: {{ squares[squares.length - 1].size }}
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  numberOne: Number,
  numberTwo: Number,
});

// --- Normalize orientation so width is always >= height
const finalWidth = computed(() =>
  props.numberOne >= props.numberTwo ? props.numberOne : props.numberTwo
);
const finalHeight = computed(() =>
  props.numberOne >= props.numberTwo ? props.numberTwo : props.numberOne
);

// ---- Compute Euclidean tiling
const squares = computed(() => {
  let W = finalWidth.value;
  let H = finalHeight.value;
  let x = 0,
    y = 0;
  const steps = [];

  while (W > 0 && H > 0) {
    if (W >= H) {
      const count = Math.floor(W / H);
      for (let i = 0; i < count; i++) {
        steps.push({
          x: ((x + i * H) / finalWidth.value) * 100 + "%",
          y: (y / finalHeight.value) * 100 + "%",
          width: (H / finalWidth.value) * 100 + "%",
          height: (H / finalHeight.value) * 100 + "%",
          size: H,
        });
      }
      x += count * H;
      W = W % H;
    } else {
      const count = Math.floor(H / W);
      for (let i = 0; i < count; i++) {
        steps.push({
          x: (x / finalWidth.value) * 100 + "%",
          y: ((y + i * W) / finalHeight.value) * 100 + "%",
          width: (W / finalWidth.value) * 100 + "%",
          height: (W / finalHeight.value) * 100 + "%",
          size: W,
        });
      }
      y += count * W;
      H = H % W;
    }
  }
  return steps;
});

// ---- Animation state
const visibleCount = ref(0);

let intervalId = null;

onMounted(() => {
  intervalId = setInterval(() => {
    if (visibleCount.value < squares.value.length) {
      visibleCount.value++;
    } else {
      visibleCount.value = 0; // restart clean
    }
  }, 1500);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>
