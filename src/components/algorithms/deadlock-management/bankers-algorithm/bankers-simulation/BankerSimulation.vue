<template>
  <div>
    <p class="mb-2 font-medium">Step by step solution:</p>
    <hr class="mb-4 border-neutral-800">
    <div v-for="(log, logIndex) in processLog" class="p-4 rounded-md">
      <!-- Process Components -->
      <Tags :process-id="log.processId" :run-count="log.runCount"></Tags>
      <ProcessBar :finished-processes="log.finished" :number-of-processes="numberOfProcesses"
        :process-id="log.processId"></ProcessBar>
      <RunStepPanel :cur-need="log.need" :cur-available="log.available" :cur-allocation="log.allocation"
        :can-run="log.canRun" :process-id="log.processId"></RunStepPanel>
      <!-- Arrow Divider -->
      <div class="flex mt-10 justify-evenly" v-if="!isLastLog(logIndex)">
        <Icon class="text-6xl text-zinc-700">
          <ArrowDown></ArrowDown>
        </Icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowDown } from '@vicons/tabler';
import { Icon } from '@vicons/utils';
import Tags from './Tags.vue';
import ProcessBar from './ProcessBar.vue';
import RunStepPanel from './RunStepPanel.vue';

const props = defineProps({
  processLog: {
    type: Array,
    default: () => [],
  },
  numberOfProcesses: {
    type: Number,
    required: true,
  },
});

const isLastLog = (logIndex) => logIndex === props.processLog.length - 1;
</script>