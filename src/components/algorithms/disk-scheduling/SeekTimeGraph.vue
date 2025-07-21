<template>
  <svg viewBox="0 0 800 552" class="w-full h-full mb-4" xmlns="http://www.w3.org/2000/svg">
    <!-- Y-axis label -->
    <text x="45" y="60" class="fill-white">0</text>
    <text x="735" y="60" class="fill-white">199</text>

    <!-- Background Rectangle (Canvas) -->
    <defs>
      <pattern id="diagonalLines" patternUnits="userSpaceOnUse" width="10" height="10" class="-translate-x-[1px]">
        <circle r="0.5" cx="1" cy="1" stroke-width="1" class="fill-zinc-600" />
      </pattern>
    </defs>

    <rect :x="GRAPH_GAP" :y="AXIS_HEIGHT" :width="GRAPH_WIDTH" :height="GRAPH_HEIGHT" class="stroke-2 stroke-zinc-700"
      fill="url(#diagonalLines)" />

    <!-- X-Axis -->
    <g class="stroke-[1.5px] stroke-white">
      <!-- Horizontal line -->
      <line :x1="GRAPH_GAP" :y1="AXIS_HEIGHT" :x2="GRAPH_GAP + GRAPH_WIDTH - 1" :y2="AXIS_HEIGHT" />

      <!-- Y-axis tick (start) -->
      <line :x1="GRAPH_GAP" y1="70" :x2="GRAPH_GAP" y2="130" />

      <!-- Point indicators -->
      <line :x1="x" y1="90" :x2="x" y2="110" class="duration-300 opacity-0" :class="{ 'opacity-100': animatePoints }"
        :style="getAnimationDelayValueFromIndex(index, true)" v-for="({ x }, index) in requestPoints">
      </line>

      <!-- Y-axis tick (end) -->
      <line :x1="GRAPH_WIDTH + GRAPH_GAP" y1="70" :x2="GRAPH_WIDTH + GRAPH_GAP" y2="130" />
    </g>

    <!-- Divider lines -->
    <g stroke="gray" stroke-opacity="0.5">
      <line :x1="getDividerLineXCoord(index)" y1="101" :x2="getDividerLineXCoord(index)" y2="549"
        class="stroke-[1px] stroke-neutral-700" v-for="index in DIVIDERS" />
    </g>

    <!-- Connector Lines -->
    <g>
      <line :x1="x" :y1="y" class="duration-300 opacity-0 stroke-1 stroke-white"
        :class="{ '!opacity-100': animatePoints }" :style="getAnimationDelayValueFromIndex(index, true)"
        v-for="({ x, y }, index) in requestPoints.slice(0, requestPoints.length - 1)">
        <animate attributeName="x2" :values="`${x};${requestPoints[index + 1].x}`" dur="300ms"
          :begin="`${getAnimationDelayValueFromIndex(index)}ms`" fill="freeze"></animate>
        <animate attributeName="y2" :values="`${y};${requestPoints[index + 1].y}`" dur="300ms"
          :begin="`${getAnimationDelayValueFromIndex(index)}ms`" fill="freeze"></animate>
      </line>
    </g>

    <!-- Points and Labels -->
    <g>
      <g v-for="({ x, y }, index) in requestPoints" class="duration-300 opacity-0"
        :class="{ '!opacity-100': animatePoints }" :style="getAnimationDelayValueFromIndex(index, true)">
        <!-- Label -->
        <text :x="getLabelCoordsFromPoint(index).x" :y="getLabelCoordsFromPoint(index).y" class="text-xs fill-white">
          {{ orderedRequests[index] }}
        </text>
        <!-- Cross -->
        <g v-if="index === 0">
          <line :x1="x - 5" :x2="x + 5" :y1="y + 5" :y2="y - 5" class="stroke-2 stroke-rose-600" stroke-linecap="round">
          </line>
          <line :x1="x + 5" :x2="x - 5" :y1="y + 5" :y2="y - 5" class="stroke-2 stroke-rose-600" stroke-linecap="round">
          </line>
        </g>
        <!-- Point -->
        <circle v-else r="3" :cx="x" :cy="y" class="stroke-1 fill-rose-500 stroke-rose-600 animate-breathe"
          :style="`transform-origin: ${x}px ${y}px`">
        </circle>
      </g>
    </g>
  </svg>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  orderedRequests: {
    type: Array,
    required: true,
  },
  totalSeekTime: {
    type: Number,
    required: true,
  }
});

const GRAPH_WIDTH = 700;
const GRAPH_HEIGHT = 450;
const GRAPH_GAP = 50;
const AXIS_HEIGHT = 100;
const DIVIDERS = 9;
const TRACKS = 200;
const VERTICAL_REQUEST_GAP = GRAPH_HEIGHT / (props.orderedRequests.length + 1);
const LABEL_OFFSET = 30;
const INITIAL_DELAY = 200;
const POINT_ANIMATION_DELAY = 400;

const animatePoints = ref(false);

const requestPoints = computed(() => {
  const points = [];
  let currentIdx = 1;
  for (const request of props.orderedRequests) {
    const point = {
      x: ((request / TRACKS) * GRAPH_WIDTH) + GRAPH_GAP,
      y: currentIdx * VERTICAL_REQUEST_GAP + AXIS_HEIGHT,
    };
    points.push(point);
    currentIdx++;
  }
  return points;
});

const getLabelCoordsFromPoint = (index) => {
  const OFFSET = {
    top: 10,
    right: 6,
    left: 20,
  };

  const currentPoint = requestPoints.value[index];
  const nextPoint = requestPoints.value[index + 1];

  const graphMin = GRAPH_GAP + LABEL_OFFSET;
  const graphMax = GRAPH_WIDTH + GRAPH_GAP - LABEL_OFFSET;

  // Default label position to the right and above the point
  let x = currentPoint.x + OFFSET.right;
  let y = currentPoint.y - OFFSET.top;

  // If too far right, or next point moves further right, place label to the left
  const exceedsGraphMin = currentPoint.x > graphMin;
  const exceedsGraphMax = currentPoint.x > graphMax;
  const isNextPointRightOfCurrent = nextPoint && nextPoint.x > currentPoint.x;
  const shouldFlipLabel = exceedsGraphMin && (exceedsGraphMax || isNextPointRightOfCurrent);

  if (shouldFlipLabel) {
    x = currentPoint.x - OFFSET.left;
  }
  return { x, y };
};


const getDividerLineXCoord = (index) => {
  const denominator = DIVIDERS + 1;
  const factor = index / denominator;
  return (factor * GRAPH_WIDTH) + GRAPH_GAP;
};

const getAnimationDelayValueFromIndex = (index, includeStyle = false) => {
  if (includeStyle) {
    return `transition-delay: ${(POINT_ANIMATION_DELAY * (index)) + INITIAL_DELAY}ms;`;
  }
  return (POINT_ANIMATION_DELAY * (index)) + INITIAL_DELAY;
};

onMounted(() => {
  animatePoints.value = true;
});
onUnmounted(() => {
  animatePoints.value = false;
});
</script>