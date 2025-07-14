<template>
  <div class="flex flex-col w-full pb-2 space-y-4 overflow-x-scroll">
    <div class="flex flex-wrap justify-center gap-4 sm:justify-normal">
      <div class="sm:flex-1">
        <p class="px-2 py-1 border rounded-md bg-zinc-800 border-zinc-700 max-w-max">
          <span class="py-0.5 px-2 text-sm bg-rose-800 rounded-md">PF</span>
          <span>: Page Fault</span>
        </p>
        <p></p>
      </div>
      <div class="px-2 py-1 border rounded-md bg-zinc-800 border-zinc-700 max-w-max">
        <p>Total Page Faults: <span class="font-medium">{{ totalPageFaults }}</span></p>
        <p></p>
      </div>
    </div>

    <div class="hidden sm:block min-w-xl">
      <div class="flex items-center mb-4">
        <h4 class="w-1/6 font-medium">Pages:</h4>
        <ul class="grid w-5/6 text-center border rounded-md border-zinc-700"
          :style="`grid-template-columns: repeat(${referenceStr.length}, minmax(0, 1fr));`">
          <li v-for="pageId in referenceStr" class="py-2 font-bold border-r border-zinc-700 last:border-0">
            {{ pageId }}
          </li>
        </ul>
      </div>
      <div class="flex mb-2">
        <div class="w-1/6 border-transparent border-y">
          <div v-for="frame in frameCount" class="py-2 space-y-2 font-medium border-b border-transparent">
            <h4 class="px-2 rounded-md max-w-max" :class="frameColors[frame - 1]">
              Frame {{ String.fromCharCode(frame + 64) }}:
            </h4>
          </div>
        </div>
        <div class="w-5/6">
          <div class="grid mb-4 overflow-hidden text-center border rounded-md border-zinc-700"
            :style="`grid-template-columns: repeat(${referenceStr.length}, minmax(0, 1fr));`">
            <div v-for="{ frames, victimPageFrameIdx } in log" class="border-r border-zinc-700 last:border-0">
              <div v-for="(frame, index) in frames"
                :class="{ 'h-10.75': !frame, 'bg-rose-900/50': index === victimPageFrameIdx }"
                class="py-2 border-b last:border-b-0 border-zinc-700">
                {{ frame }}
              </div>
            </div>
          </div>
          <div class="grid overflow-hidden"
            :style="`grid-template-columns: repeat(${referenceStr.length}, minmax(0, 1fr));`">
            <div v-for="{ isPageFault, victimPageFrameIdx } in log" class="mx-auto">
              <div v-if="isPageFault" class="flex flex-col items-center font-medium">
                <span class="py-0.5 px-2 text-sm bg-rose-800 rounded-md">
                  PF
                </span>
                <span class="px-2 mt-2 rotate-180 rounded-md" style="writing-mode: vertical-rl;"
                  v-if="victimPageFrameIdx + 1" :class="frameColors[victimPageFrameIdx]">
                  Frame {{ String.fromCharCode(victimPageFrameIdx + 65) }} evicted
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center w-full gap-x-4 sm:hidden">
      <div class="flex flex-col items-center mb-4">
        <h4 class="h-24 font-medium" style="writing-mode: vertical-rl;">Pages:</h4>
        <ul class="text-center border rounded-md border-zinc-700">
          <li v-for="pageId in referenceStr"
            class="flex items-center justify-center w-10 font-bold border-b aspect-square border-zinc-700 last:border-0">
            {{ pageId }}
          </li>
        </ul>
      </div>
      <div class="flex flex-col items-center mb-4">
        <div class="flex flex-col mb-2">
          <div class="flex justify-around w-full h-24">
            <div v-for="frame in frameCount" class="font-medium" style="writing-mode: vertical-rl;">
              <h4 class="px-2 rounded-md max-h-max" :class="frameColors[frame - 1]">
                Frame {{ String.fromCharCode(frame + 64) }}:
              </h4>
            </div>
          </div>
          <div class="flex">
            <div class="mb-4 overflow-hidden text-center border rounded-md border-zinc-700">
              <div v-for="{ frames, victimPageFrameIdx } in log" class="flex border-b border-zinc-700 last:border-0"
                :style="`aspect-ratio: ${frameCount}/1`">
                <div v-for="(frame, index) in frames" :class="{ 'bg-rose-900/50': index === victimPageFrameIdx }"
                  class="flex items-center justify-center w-10 border-r aspect-square last:border-0 border-zinc-700">
                  {{ frame }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col mt-24">
        <div v-for="{ isPageFault } in log" class="flex items-center h-10 font-medium">
          <span class="py-0.5 px-2 text-sm bg-rose-800 rounded-md" v-if="isPageFault">PF</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  frameCount: {
    type: Number,
    required: true,
  },
  totalPageFaults: {
    type: Number,
    required: true,
  },
  referenceStr: {
    type: Array,
    required: true,
  },
  log: {
    type: Array,
    required: true,
  },
});

const frameColors = ['bg-yellow-600 text-zinc-900', 'bg-emerald-700', 'bg-blue-900', 'bg-amber-700', 'bg-purple-700'];
</script>
